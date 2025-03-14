import DomConstructor from './Domconstructor.js';
import DomManipulator from './DomManipulator.js';  
import Search from './Search.js';
// import BookmarkManager from './BookmarkManager.js';  // Si tu as une classe pour gérer les bookmarks

document.addEventListener("DOMContentLoaded", function() {
  const domConstructor = new DomConstructor();
  domConstructor.init();
  
  const button_addbook = document.getElementById("bt_add");
  const button_search = document.getElementById("bt_search");
  const button_cancelSearch = document.getElementById("bt_cancel");
  const form_search = document.getElementById("divformsearch");

  if (form_search) {
      form_search.style.display = 'none';
  }

  button_addbook.addEventListener('click', function() {
      DomManipulator.showHideSearchForm();
  });

  button_search.addEventListener('click', function(event) {
      Search.clickForSearch(event);
  });

  button_cancelSearch.addEventListener('click', function() {
      DomManipulator.cancelSearch();
  });
  
});
