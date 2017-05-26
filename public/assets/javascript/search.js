$(document).ready( () => {
  $('.dropdown-toggle').dropdown();

  //Click handler for stack questions
  $('#stack-div').on('click', '.stack-question', getStackAnswers);
  $('#search-submit').on('click', searchHandler);

  // Init Methods and then populate fuzzy search handler
  getMethods( (methods) => {
    // Remove argument strings from autocomplete (consider removing from search submission instead)
    const methodArray = methods.map( (el) => { return { shortName: el.name.split('(')[0]}});

    //initialize fuzzy search autocomplete on input box and set listener for typing input
    $('#search-input').fuzzyComplete(methodArray);
    $('input').on('keyup blur', () => {
      $(this).parent().find(".output").html($(this).parent().find("select").val());
    });

    // Print list of methods
    // const methodListItems = methods.reduce( (string, elem) => string += '<li>' + elem.name + '</li>', '<ul>') + '</ul>';
    // $('#stack-div').append(methodListItems);
  });
});

function getMethods(callback) {
  $.get('/api/express/methods', (data) => {
    callback(data)
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

    $.get(`/api/stack/search/${query}`, (resp) => {
        //Returns an html UL with LI for each question in response
        let stackQuestions = resp.items.reduce(genStackQuestionHTML, $('<ul>'));
        $('#stack-div').empty().append(stackQuestions);
    });
}

function genStackQuestionHTML (string, elem)  {
  let listItem = $('<li>');
  listItem
    .addClass('stack-question')
    .html(elem.body || elem.title)
    .attr('id', elem.question_id)
    .data('id', elem.question_id);
  return string.append(listItem);
}

function getStackAnswers () {
  let id = $(this).data('id');
  console.log('id', id);
  $.get('/api/stack/question/'+id, (resp) => {
      $("#"+id).append(resp.items[0].body);
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
