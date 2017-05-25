$(document).ready( () => {
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
    const methodListItems = methods.reduce( (string, elem) => string += '<li>' + elem.name + '</li>', '<ul>') + '</ul>';
    $('#stack-div').append(methodListItems);
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
    let query = encodeURIComponent($('#search-input').val().split('(')[0].trim());
    //Template literal expansion using backticks instead of quote/apostrophe
    $.get(`/api/express/search/${query}`, (resp) => {
      console.log('html', resp.html);
      $('#documentation-div').empty().html(resp.html);
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
