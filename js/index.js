//Init
const button_search=document.getElementById("search-button");
const form_search=document.getElementById("divformsearch");
form_search.style.display='none';
BookmarkManager.loadingBooksFromBookmark();

button_search.addEventListener('click',function(event) {
   if (form_search.style.display == 'none') {
     DomManipulator.showHideSearchForm();
   } else {
     Search.clickForSearch(event);
   }
});