
class Book {
  constructor(googleBook) {
    this.title = googleBook.volumeInfo.title;
    this.id = googleBook.id;
    this.author = googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors[0] : "Auteur inconnu";
    this.description = DomManipulator.setDescription(googleBook.volumeInfo.description);
    this.image = googleBook.volumeInfo.imageLinks ? googleBook.volumeInfo.imageLinks.thumbnail : ''; 
  }
}

export default Book;
