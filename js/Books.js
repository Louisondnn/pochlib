class Books {
  constructor(googleBooks) {
    this.allBooks = [];
    for (let i = 0; i < googleBooks.length; i++) {
      this.allBooks.push(new Book(googleBooks[i]));
    }
  }
  addBookToBookmark(book) {
    BookManager.clickOnIcon(span, book);
  }

  displayBooks() {
    for (let i = 0; i < this.allBooks.length; i++) {
      var div = DomManipulator.cellConstruction('search', this.allBooks[i]);
      document.getElementById("container").appendChild(div);
    } 
  }
}