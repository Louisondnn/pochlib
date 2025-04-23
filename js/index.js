import DomConstructor from './Domconstructor.js';
import DomManipulator from './DomManipulator.js';  
import Search from './Search.js';

document.addEventListener("DOMContentLoaded", function() {
  const domConstructor = new DomConstructor();
  domConstructor.createAddBookButton();
  domConstructor.createSearchForm();

  DomManipulator.renderPochList();

  const btAdd = document.getElementById("bt_add");
  if (btAdd) {
    btAdd.addEventListener('click', () => {
      DomManipulator.showSearchElements();
    });
  }

  const btCancel = document.getElementById("bt_cancel");
  if (btCancel) {
    btCancel.addEventListener('click', () => {
      DomManipulator.hideSearchElements();
    });
  }

  const btSearch = document.getElementById("bt_search");
  if (btSearch) {
    btSearch.addEventListener('click', (event) => {
      Search.clickForSearch(event);
    });
  }

  Search.updateFavoritesDisplay();
});

