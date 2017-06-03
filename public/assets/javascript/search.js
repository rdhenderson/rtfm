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

function initPage(methods) {
  // Initialize page elements after methods have been retrieved
  // Initialize dropdown boxs

  // Set click handlers
  $('#stack-div').on('click', '.stack-question', getStackAnswers);
  $('#language-select').on('change', languageSelectHandler);
  $('#search-submit').on('click', searchHandler);
  $('#search-clear').on('click', () => $('#search-input').val(''));
  $("#documentation-div").on('click', '.detail-link', toggleDetails);
  $("#documentation-div").on('click', '.example-link', toggleExamples);

  // $('#search-input').fuzzyComplete(methods.express);

  $('input').on('keyup blur', () => {
    $(this).parent().find(".output").html($(this).parent().find("select").val());
  });

  //DISCUSS: Hiding images to allow drawing method listing
  //  hideImages();
}

function toggleDetails() {
  const id = $(this).data('id');
  console.log('ID', id);
  $.get(`/api/jquery/detail/${id}`, (data) => {
    $(`#detail-${id}`).html(data.detail);
    $(`#detail-${id}`).toggle();
  });
}

function toggleExamples() {
  const id = $(this).data('id');
  console.log('ID', id);
  $.get(`/api/jquery/detail/${id}`, (data) => {
    const exampleHTML = Template.jquery_example({examples: data.examples});
    $(`#examples-${id}`).html(exampleHTML);
    $(`#examples-${id}`).toggle();
  });
}

function languageSelectHandler(){
  const language = $("#language-select option:selected").val();
  console.log('selecting language: ', language)
  switch(language) {
    case 'express':
      const expressRows = Template.express(methods);
      $('#documentation-div').empty().html(expressRows);
      break;
    case 'jquery' :
      const jqueryRows = Template.jquery(methods);
      $('#documentation-div').empty().html(jqueryRows);
      break;
    case 'default' :
      $('#documentation-div').empty().html("<h2> Please Select A Language </h2>");
  }
}

function searchHandler() {
  // hideImages();
  let query = encodeURIComponent($('#search-input').val().trim());
  //Strip the arguments portion of name before query to express
  let language = $('#language-select option:selected').val();
  //Template literal expansion using backticks instead of quote/apostrophe

  $.get(`/api/${language}/search/${query}`, (data) => {
     $('#doc-query-result').empty().html(data.html || data.detail);
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
  // $("#stack-div").removeClass("hidden").show();
  // $("#documentation-div").removeClass("hidden").show();
  // $("#stack-div-show").addClass("hidden");
  // $("#documentation-show").addClass("hidden");
}
