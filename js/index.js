//Init
// import DomManipulator from './DomManipulator.js';
import BookManager from './BookManager.js';
import Search from './Search.js';

// const DomManipulator = require('./DomManipulator.js');
// const domManipulator = new DomManipulator();
const DomManipulator = require('./DomManipulator.js');
const button_search=document.getElementById("search-button");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
BookManager.loadingBooksFromBookmark();

button_search.addEventListener('click',function(event) {
   if (form_search.style.display == 'none') {
     DomManipulator.showHideSearchForm();
   } else {
     Search.clickForSearch(event);
   }
});