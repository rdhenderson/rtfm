'use strict';
let methods = {};

$(document).ready(() => {
  getExpressAPI(methods)
  .then(getJqueryAPI)
  .then( (methods) => initPage(methods) )
  .catch( (err) => console.log(err) );

});

function getJqueryAPI(methods) {
  return new Promise( (resolve, reject) => {
    return $.get('/api/jquery/methods/', (data) => {
      methods.jquery = data;
      return resolve(methods);
    });
  });
}

function getExpressAPI(methods) {
  //return a promise object that calls resolve/reject to get express methods
  return new Promise( (resolve, reject) => {
    return $.get('/api/express/methods', (data) => {
      methods.express = data;
      return resolve(methods);
    });
  });
}

function initPage(methods, jqueryMethods, expressMethods) {
  // Initialize page elements after methods have been retrieved
  // Initialize dropdown boxs
  $('.dropdown-toggle').dropdown();

  // Set click handlers
  $('#stack-div').on('click', '.stack-question', getStackAnswers);
  $('#search-submit').on('click', searchHandler);
  $('#search-clear').on('click', () => $('#search-input').val(''));
  // $("#language-select").on("click", function(){
  //   console.log($('#language-select option:selected').val());
  // })
  // $('#search-input').fuzzyComplete(methods.express.concat(methods.jquery));

  $('input').on('keyup blur', () => {
    $(this).parent().find(".output").html($(this).parent().find("select").val());
  });

  //DISCUSS: Hiding images to allow drawing method listing
  hideImages();

  //Draw express method listing on load
  const expressRows = Template.express(methods);
  $('#documentation-div').empty().html(expressRows);
  const jqueryRows = Template.jquery(methods);
  $('#jquery-div').empty().html(jqueryRows);
}

function searchHandler() {
  hideImages();
  let query = encodeURIComponent($('#search-input').val().trim());
  //Strip the arguments portion of name before query to express
  let language = $('#language-select option:selected').val();
  //Template literal expansion using backticks instead of quote/apostrophe
  let expressQuery = query.split('(')[0];
  $.get(`/api/express/search/${expressQuery}`, (data) => {
    $('#express-query-result').empty().html(data.html);
    // $('#express-method-list').collapse('toggle');
  });

  //FIXME: stack search sometimes fails to return if we don't strip out
  // parentheticals

  $.get(`/api/stack/search/${query}/${language}`, (data) => {
    const questionRows = Template.stack( {questions: data.items });
    $('#stack-div').empty().append(questionRows);
  });
}

function getMDNPage(pageURL){
  const queryObj = { url:`/api/mdn/get/`, data: {url: pageURL} };
  $.get(queryObj, (data) => {
    //FIXME: mdn div doesn't exist
    $('#mdn-div').empty().append(data.html);
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
  $("#jquery-div").removeClass('hidden').show();
  $("#stack-div").removeClass("hidden").show();
  $("#documentation-div").removeClass("hidden").show();
  $("#stack-div-show").addClass("hidden");
  $("#documentation-show").addClass("hidden");
}
