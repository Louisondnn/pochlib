// DomConstructor.js
class DomConstructor {
    constructor() {
        this.myBooks = document.getElementById('myBooks');
        this.content = document.getElementById('content');
      }
    
      createSearchButton() {
        const searchButton = document.createElement('button');
        searchButton.textContent = 'Rechercher';
        searchButton.id = 'bt_search';
        this.content.appendChild(searchButton);
      }
    
      addSearchButtonEventListener() {
        const searchButton = document.getElementById('bt_search');
        searchButton.addEventListener('click', function(event) {
          Search.clickForSearch(event);
        });
      }
    createSearchForm() {
      const searchForm = document.createElement('form');
      const titleInput = document.createElement('input');
      const authorInput = document.createElement('input');
      titleInput.id = 'title_book';
      authorInput.id = 'author';
      titleInput.placeholder = 'Titre du livre';
      authorInput.placeholder = 'Auteur du livre';
      searchForm.appendChild(titleInput);
      searchForm.appendChild(authorInput);
      this.content.appendChild(searchForm);
    }
  }
  
  // Appelez la méthode createSearchForm
  const domConstructor = new DomConstructor();
  domConstructor.createSearchForm();