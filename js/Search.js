// import Books from './Books';

class Search {

    static clickForSearch(event) {
        event.preventDefault();
        if ((document.getElementById("title_book").value == "") || (document.getElementById("author").value == "")) {
            alert("Vous devez saisir le titre et l'auteur du livre");
        } else {
            this.createBook();
            this.getBooksFromGoogle();
            document.getElementById("content").style.display = "block";
        }
    }
    

    static createBook(){
        const tbook = document.getElementById("title_book").value;
        const author = document.getElementById("author").value;
        const bookElement = document.createElement('div');

        const bookHTML = `
        <h3>${tbook}</h3>
        <p>Auteur: ${author}</p>
        <p>Description: test description</p>
      `;
      bookElement.innerHTML = bookHTML;
      document.body.appendChild(bookElement);


    }
    // voir si dans book c est pas mieux 
    // faire ma boucle pour les afficher 
    // favoris => creer ma poch list ou il y a les fav 
    
    static async getBooksFromGoogle() {
        const tbook = document.getElementById("title_book").value;
        const author = document.getElementById("author").value;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${tbook}+inauthor:${author}&key=AIzaSyB9_kmuvdfj1aK_QY8c3JwHzDAYcsWd0HU`);
        if (!response.ok) {
            throw new Error(`Erreur de traitement`);
        }
        const bookSearchResults = await response.json();
        console.log(bookSearchResults);
    
        this.displayBooks(bookSearchResults);
    }
    
    static displayBooks(bookSearchResults) {
        const content = document.getElementById("content");
    
        if (!bookSearchResults.items || bookSearchResults.items.length === 0) {
            content.innerHTML = "<p>Aucun livre trouvé.</p>";
            return;
        }
    
        const results = document.createElement("div");
        results.id = "results"; 
        content.appendChild(results);
    
        bookSearchResults.items.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
    
            const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./unavailable.png";
            const description = book.volumeInfo.description ? book.volumeInfo.description.substring(0, 200) : "Information manquante";
            const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Auteur inconnu";
    
            bookElement.innerHTML = `
                <img src="${image}" alt="${book.volumeInfo.title}">
                <h3>${book.volumeInfo.title}</h3>
                <p><strong>Auteur :</strong> ${author}</p>
                <p>${description}</p>
                <button class="delete" data-id="${book.id}">🗑 Supprimer</button>
            `;
            results.appendChild(bookElement);
        });
    
        this.addBookmarkAndDeleteListeners(bookSearchResults);
    }
    
}

export default Search;
