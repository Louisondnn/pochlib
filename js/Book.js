class Book {
    constructor(googleBook) {
      this.title = googleBook.volumeInfo.title;
      this.id = googleBook.id;
      this.author = googleBook.volumeInfo.authors[0];
      this.description = DomManipulator.setDescription(googleBook.volumeInfo.description);
      this.image = googleBook.volumeInfo.imageLinks != null ? googleBook.volumeInfo.imageLinks.thumbnail : "./unavailable.png";
    }
  
    displayBook() {
      const bookHTML = `
        <div class="book">
          <h3>${this.title}</h3>
          <p>Auteur: ${this.author}</p>
          <img src="${this.image}" alt="${this.title}">
          <p>Description: ${this.description}</p>
        </div>
      `;
      document.getElementById("content").innerHTML += bookHTML;
    }
  }