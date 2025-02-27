// DomConstructor.js
class DomConstructor {
  
  constructor() {
    this.myBooks = document.getElementById('myBooks');
    this.content = document.createElement('div');
    this.content.id = 'content';
    if (document.body) {
      document.body.appendChild(this.content);
    } else {
      console.error('L\'élément body n\'existe pas dans le DOM');
    }  
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
      const container = document.getElementById('container');
      console.log(container); // Vérifiez 
        if (container) {
        container.appendChild(searchForm);
      } else {
        console.error('Le container n\'existe pas dans le DOM');
      }
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

  document.addEventListener('DOMContentLoaded', () => {
    const content = document.createElement('div');
    content.id = 'content';
    document.body.appendChild(content);
  
    const container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  
    const domConstructor = new DomConstructor();
    domConstructor.createSearchForm();
  });