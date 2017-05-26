$(document).ready( () => {
  $('.dropdown-toggle').dropdown();
  $('#stack-div').on('click', '.stack-question', function () {
    let id = $(this).data('id');
    console.log('id', id);
    $.get('/api/stack/question/'+id, (resp) => {
        $("#"+id).append(resp.items[0].body);

        console.log(resp);
    });
  });
  $('#search-submit').on('click', searchHandler);

  // Init Methods and then populate fuzzy search handler
  getMethods( (methods) => {
    // Remove argument strings from autocomplete (consider removing from search submission instead)
    const methodArray = methods.map( (el) => {
      return {
        shortName: el.name.split('(')[0] //,
      }
    });

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
    //Strip the arguments portion of name before query
    let query = encodeURIComponent($('#search-input').val().trim());
    let expressQuery = query.split('(')[0];

    //Template literal expansion using backticks instead of quote/apostrophe
    $.get(`/api/express/search/${expressQuery}`, (resp) => {
      console.log('html', resp.html);
      $('#documentation-div').empty().html(resp.html);
    });

    $.get(`/api/stack/search/${query}`, (resp) => {
        console.log('stack: ', resp.items);
        let stackQuestions = resp.items.reduce( (string, elem) => {
          let listItem = $('<li>');
          listItem
            .addClass('stack-question')
            .html(elem.body || elem.title)
            .attr('id', elem.question_id)
            .data('id', elem.question_id);
          return string.append(listItem);
        }, $('<ul>'));
        // console.log(stackQuestions.children().eq(1).data('id'));
        $('#stack-div').empty().append(stackQuestions);
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

// //Global var to hold methods for autocomplete
// let expressMethods = [];
//
// $(document).ready( () => {
//   $('#searchbox').on('click',searchHandler);
//   getMethods();
// });
//
//
//
// function searchHandler() {
//     hideImagesOnSearch();
//     let query = encodeURIComponent($('#entersearch').val().trim());
//     console.log('Trying to search on ', query);
//     //Template literal expansion using backticks instead of quote/apostrophe
//     $.ajax({
//       url: `/api/express/search/${query}`,
//       data: {query: query, tag: $() } (resp) => {
//       console.log('html', resp);
//       $('#documentation-div').append(resp.html);
//     });
// }
//
// function getMethods() {
//   $.get('/api/express/methods', (resp) => {
//     console.log('methods', resp);
//     expressMethods = resp;
//   });
// }
// //Look into a simpler .toggle
// function hideImagesOnSearch() {
//   $("#stack-div").show();
//   $("#documentation-div").show();
//   $("#stack-div").removeClass("hidden");
//   $("#documentation-div").removeClass("hidden");
//   $("#stack-div-show").addClass("hidden");
//   $("#documentation-show").addClass("hidden");
// }
