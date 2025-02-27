class DomManipulator {
    static cellsConstruction(books) {
      document.getElementById("container").innerHTML = '';
      for (let i = 0; i < books.allBooks.length; i++) {
        var div = DomManipulator.cellConstruction('search', books.allBooks[i]);
        document.getElementById("container").appendChild(div);
      }
    }
    static cellConstruction(searchOrBookmark, book) {
        var divParent = document.createElement("div");
        divParent.classList.add("divparent");
        if (searchOrBookmark == 'search') {
          var span = this.iconCreation(divParent, 'search');
        } else {
          divParent.id = book.id;
          var span = this.iconCreation(divParent, 'bookmark');
        }
        this.createBookElement(divParent, book);
        span.addEventListener('click', function() {
          BookmarkManager.clickOnIcon(span, book);
        });
        return divParent;
      }
    static addSearchButton() {
        const searchButton = document.createElement('button');
        searchButton.textContent = 'Rechercher des livres';
        searchButton.id = 'search-button';
        document.getElementById('myBooks').appendChild(searchButton);
      }
    
      static addCancelButton() {
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Annuler la recherche';
        cancelButton.id = 'cancel-button';
        document.getElementById('myBooks').appendChild(cancelButton);
      }
    
      static addBookmarkButton() {
        const bookmarkButton = document.createElement('button');
        bookmarkButton.textContent = 'Marquer comme favori';
        bookmarkButton.id = 'bookmark-button';
        document.getElementById('myBooks').appendChild(bookmarkButton);
      }
  
    static cellConstruction(searchOrBookmark, book) {
      var divParent = document.createElement("div");
      divParent.classList.add("divparent");
      if (searchOrBookmark == 'search') {
        var span = this.iconCreation(divParent, 'search');
      } else {
        divParent.id = book.id;
        var span = this.iconCreation(divParent, 'bookmark');
      }
      this.createBookElement(divParent, book);
      span.addEventListener('click', function() {
        BookmarkManager.clickOnIcon(span, book);
      });
      return divParent;
    }
  
    static createBookElement(parent, book) {
      parent.appendChild(this.componentCreation('h3', 'Titre', book.title));
      parent.appendChild(this.componentCreation('i', 'Id', book.id));
      parent.appendChild(this.componentCreation('p', 'Auteur', book.author));
      parent.appendChild(this.componentCreation('p', 'Description', book.description));
      parent.appendChild(this.componentCreation('img', '', book.image));
    }
  
    static componentCreation(typeOfTag, entitled, elementbook) {
      var creationTag = document.createElement(typeOfTag);
      if (typeOfTag == 'img') {
        creationTag.src = elementbook;
        creationTag.setAttribute('class', 'image');
      } else {
        creationTag.textContent = entitled + " : " + elementbook;
      }
      return creationTag;
    }
  
    static iconCreation(parent, searchOrBookmark) {
      var span = document.createElement('span');
      if (searchOrBookmark == 'search') {
        span.setAttribute('class', 'fa fa-bookmark fa-2x iconstyle');
      } else {
        span.setAttribute('class', 'fa fa-trash fa-2x iconstyle');
      }
      parent.appendChild(span);
      return span;
    }
  
    static showHideSearchForm() {
      if (form_search.style.display == 'none') {
        form_search.style.display = "";
      } else {
        form_search.style.display = "none";
      }
    }
  
    static deleteEnteredData() {
      document.getElementById("title_book").value = "";
      document.getElementById("author").value = "";
    }
  
    static setDescription(googleDescription) {
      if (googleDescription != null) {
        if (googleDescription.length <= 200) {
          return googleDescription;
        } else {
          return googleDescription.substring(0, 200) + '...';
        }
      } else {
        return 'Information manquante';
      }
    }
  }
  
  export default DomManipulator;