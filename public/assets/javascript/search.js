(function() {
  'use strict';
  $(document).ready(
    () => {
      // Initialize dropdown boxs
      $('.dropdown-toggle').dropdown();

      // Set click handlers
      $('#stack-div').on('click', '.stack-question', getStackAnswers);
      $('#search-submit').on('click', searchHandler);

      // Init Methods and then populate fuzzy search handler
      getMethods().then( (methods) => initPage(methods)).catch( (err) => console.log(err));
    });
})();

function initPage(methods) {
  // Initialize page elements after methods have been retrieved
  $('#search-input').fuzzyComplete(methods);
  $('input').on('keyup blur', () => {
    $(this).parent().find(".output").html($(this).parent().find("select").val());
  });

  hideImages();
  // const methodTemplateScript = $("#method-template").html();
  // const methodTemplate = Handlebars.compile($("#method-template").html());
  const methodRows = Template.methods( {methods: methods});
  $('#documentation-div').empty().html(methodRows);
}

function getMethods(callback) {
  //return a promise object that calls resolve/reject to get express methods
  return new Promise((resolve, reject) => {
    console.log('in promise');
    $.get('/api/express/methods', (data) => {
      resolve(data);
    });
  });
}

function searchHandler() {
  hideImages();
  let query = encodeURIComponent($('#search-input').val().trim());
  //Strip the arguments portion of name before query to express
  let expressQuery = query.split('(')[0];

  //Template literal expansion using backticks instead of quote/apostrophe
  $.get(`/api/express/search/${expressQuery}`, (resp) => {
    console.log('html', resp.html);
    $('#documentation-div').empty().html(resp.html);
  });


  $.get(`/api/stack/search/${expressQuery}`, (resp) => {
    console.log('question response', resp);
    const questionRows = Template.stack( {questions: resp.items });
    console.log('questionRows\n', questionRows);
    $('#stack-div').empty().append(questionRows);

    // let stackQuestions = resp;
    // let question_ids = stackQuestions.items.map( (el) => el.question_id );
  });
}

// function genStackQuestionHTML(string, elem) {
//   let listItem = $('<li>');
//   listItem
//     .addClass('stack-question')
//     .html(elem.body || elem.title)
//     .attr('id', elem.question_id)
//     .data('id', elem.question_id);
//   return string.append(listItem);
// }

function getStackAnswers() {
  let id = $(this).data('id');
  console.log('id', id);
  $.get('/api/stack/question/' + id, (resp) => {
    const answerRows = Template.stack_answers({answers: resp.items, parent_id: id});
    $("#answers-" + id).html(answerRows);
    console.log(resp);
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
