$(document).ready( () => {
  $('#search-submit').on('click', searchHandler);
  // $('#search-term').on('keyup', keyHandler);

  //Init Methods and then populate fuzzy search handler
  getMethods( (methods) => {
    console.log('methods ', methods);
    //Remove argument strings from autocomplete (consider removing from search submission instead)
    const methodArray = methods.map( (el) => {
      return {
        shortName: el.name.split('(')[0] //,
        // name: el.name,
        // html: el.html
      }
    });


    // $( "#search-term" ).autocomplete({ source: availableTags });
    // console.log('availableTags :', availableTags);

    // console.log('method list', methodListItems);
    $('#search-express').fuzzyComplete(methodArray);
    $('input').on('keyup blur', () => {
      // console.log('Sensing keys');
      $(this).parent().find(".output").html($(this).parent().find("select").val());
    });

    //Print list of methods
    const methodListItems = methods.reduce( (string, elem) => string += '<li>' + elem.name + '</li>', '<ul>') + '</ul>';
    $('#methods-list').append(methodListItems);
  });



});

function getMethods(callback) {
  $.get('/api/express/methods', (data) => {
    // console.log('methods', resp);
    callback(data)
  });
}
//
// function keyHandler(e) {
//   switch (e.keyCode) {
//     case 13: //enter key, simulate a click
//       e.preventDefault();
//       $('#search-term').click();
//       break;
//     default:
//       console.log(e.key);
//       break;
//  }
// }

function searchHandler() {
    // hideImagesOnSearch();
    //Strip the arguments portion of name before query
    let query = encodeURIComponent($('#search-express').val().split('(')[0].trim());
    //Template literal expansion using backticks instead of quote/apostrophe
    $.get(`/api/express/search/${query}`, (resp) => {
      console.log('html', resp.html);
      $('#docs-div').empty().html(resp.html);
    });
}
