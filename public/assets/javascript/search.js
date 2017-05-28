'use strict';

$(document).ready(() => {
    // Initialize dropdown boxs
    $('.dropdown-toggle').dropdown();

    // Set click handlers
    $('#stack-div').on('click', '.stack-question', getStackAnswers);
    $('#search-submit').on('click', searchHandler);
    $('#search-clear').on('click', () => $('#search-input').val(''));

    // Init Methods and then populate fuzzy search handler
    getMethods()
      .then( (methods) => initPage(methods))
      .catch( (err) => console.log(err));
  });

function initPage(methods) {
  // Initialize page elements after methods have been retrieved
  $('#search-input').fuzzyComplete(methods);
  $('input').on('keyup blur', () => {
    $(this).parent().find(".output").html($(this).parent().find("select").val());
  });

  //DISCUSS: Hiding images to allow drawing method listing
  hideImages();

  //Draw express method listing on load
  const methodRows = Template.methods( {methods: methods});
  $('#documentation-div').empty().html(methodRows);
}

function getMethods() {
  //return a promise object that calls resolve/reject to get express methods
  return new Promise((resolve, reject) => {
    console.log('in promise');
    $.get('/api/express/methods', (data) => {
      resolve(data);
    });
  });
}

function getMDNPage(){
  $.get(`/api/mdn/get/`, (data) => {
    // const questionRows = Template.stack( {questions: data.items });
    console.log('MDN data', data);
    //FIXME: mdn div doesn't exist
    $('#mdn-div').empty().append(data.html);
  });
}
function searchHandler() {
  hideImages();
  let query = encodeURIComponent($('#search-input').val().trim());
  //Strip the arguments portion of name before query to express
  let expressQuery = query.split('(')[0];

  //Template literal expansion using backticks instead of quote/apostrophe
  $.get(`/api/express/search/${expressQuery}`, (data) => {
    $('#doc-query-result').empty().html(data.html);
    $('#doc-method-list').collapse('toggle');
  });

  //FIXME: stack search sometimes fails to return if we don't strip out
  // parentheticals
  $.get(`/api/stack/search/${expressQuery}`, (data) => {
    const questionRows = Template.stack( {questions: data.items });
    $('#stack-div').empty().append(questionRows);
  });
}

function getStackAnswers() {
  let id = $(this).data('id');
  $.get('/api/stack/question/' + id, (data) => {
    const answerRows = Template.stack_answers({answers: data.items, parent_id: id});
    $("#answers-" + id).html(answerRows);
  });
}

//Look into a simpler .toggle
function hideImages() {
  $("#stack-div").show();
  $("#documentation-div").show();
  $("#stack-div").removeClass("hidden");
  $("#documentation-div").removeClass("hidden");
  $("#stack-div-show").addClass("hidden");
  $("#documentation-show").addClass("hidden");
}
