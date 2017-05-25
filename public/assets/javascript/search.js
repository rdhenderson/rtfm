//Global var to hold methods for autocomplete
let expressMethods = [];

$(document).ready( () => {
  $('#searchbox').on('click',searchHandler);
  getMethods();
});



function searchHandler() {
    hideImagesOnSearch();
    let query = encodeURIComponent($('#entersearch').val().trim());
    console.log('Trying to search on ', query);
    //Template literal expansion using backticks instead of quote/apostrophe
    $.get(`/api/express/search/${query}`, (resp) => {
      console.log('html', resp);
      $('#documentation-div').append(resp.html);
    });
}

function getMethods() {
  $.get('/api/express/methods', (resp) => {
    console.log('methods', resp);
    expressMethods = resp;
  });
}
//Look into a simpler .toggle
function hideImagesOnSearch() {
  $("#stack-div").show();
  $("#documentation-div").show();
  $("#stack-div").removeClass("hidden");
  $("#documentation-div").removeClass("hidden");
  $("#stack-div-show").addClass("hidden");
  $("#documentation-show").addClass("hidden");
}
