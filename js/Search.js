class Search {
    static clickForSearch(event) {
        event.preventDefault();
        if (!document.getElementById("title_book").value || !document.getElementById("author").value) {
            alert("Vous devez saisir le titre et l'auteur du livre");
        } else {
            this.getBooksFromGoogle();
            const content = document.getElementById("content");
            if (content) {
                content.style.display = "block";
            } else {
                console.error("L'élément #content n'a pas été trouvé.");
            }
        }
    }

    static async getBooksFromGoogle() {
        const tbook = document.getElementById("title_book").value;
        const author = document.getElementById("author").value;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${tbook}+inauthor:${author}&key=AIzaSyB9_kmuvdfj1aK_QY8c3JwHzDAYcsWd0HU`);
        
        if (!response.ok) {
            throw new Error(`Erreur de traitement`);
        }
        
        const bookSearchResults = await response.json();
        this.displayBooks(bookSearchResults);
    }

    static displayBooks(bookSearchResults) {
        const content = document.getElementById("content");
        if (!content) {
            console.error("L'élément #content est introuvable");
            return;
        }

        content.innerHTML = ''; 

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

            const pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];
            const isFavorited = pochList.some(b => b.id === book.id);

            bookElement.innerHTML = `
                <button class="fav-button ${isFavorited ? 'active' : ''}" data-id="${book.id}">⭐</button>
                <img src="${image}" alt="${book.volumeInfo.title}">
                <h3>${book.volumeInfo.title}</h3>
                <p><strong>Auteur :</strong> ${author}</p>
                <p>${description}</p>
            `;
            results.appendChild(bookElement);
        });

        this.addBookmarkAndDeleteListeners(bookSearchResults);
    }

    static addBookmarkAndDeleteListeners(bookSearchResults) {
        document.querySelectorAll('.fav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const bookId = event.target.dataset.id;
                Search.toggleFavorite(bookId, event.target);
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (event) => {
                event.target.parentElement.remove();
            });
        });
    }

    static toggleFavorite(bookId, buttonElement) {
        let pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];

        const isFavorite = pochList.some(book => book.id === bookId);

        if (!isFavorite) {
            const bookElement = buttonElement.parentElement;
            const title = bookElement.querySelector('h3').textContent;
            const author = bookElement.querySelector('p strong') ? bookElement.querySelector('p strong').textContent : "Auteur inconnu";
            const image = bookElement.querySelector('img').src;

            pochList.push({ id: bookId, title, author, image });
            buttonElement.classList.add('active');
        } else {
            pochList = pochList.filter(book => book.id !== bookId);
            buttonElement.classList.remove('active');
        }

        sessionStorage.setItem('pochList', JSON.stringify(pochList));
        Search.updateFavoritesDisplay(); 
    }

    static updateFavoritesDisplay() {
        const pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];

        const allH2 = document.querySelectorAll("h2");
        const pochListTitle = Array.from(allH2).find(h2 =>
            h2.textContent.trim().toLowerCase().includes("poch'liste")
        );
        
        let pochListContainer = document.getElementById("pochList");
        if (!pochListContainer) {
            pochListContainer = document.createElement("div");
            pochListContainer.id = "pochList";
        
            pochListTitle.insertAdjacentElement("afterend", pochListContainer);
        }
        
        pochListContainer.innerHTML = "";
    
        if (pochList.length === 0) {
            pochListContainer.innerHTML = "<p>Aucun livre en favoris.</p>";
        } else {
            const bookList = document.createElement("div");
            bookList.classList.add("poch-list-container");
    
            pochList.forEach(book => {
                const bookElement = document.createElement("div");
                bookElement.classList.add("poch-list-item");
    
                bookElement.innerHTML = `
                    <img src="${book.image}" alt="${book.title}">
                    <div class="poch-list-info">
                        <p><strong>${book.title}</strong></p>
                        <p>${book.author || "Auteur inconnu"}</p>
                    </div>
                    <button class="remove-fav" data-id="${book.id}">❌</button>
                `;
    
                bookList.appendChild(bookElement);
            });
    
            pochListContainer.appendChild(bookList);
        }
    
        document.querySelectorAll('.remove-fav').forEach(button => {
            button.addEventListener('click', (event) => {
                const bookId = event.target.dataset.id;
                Search.removeFavorite(bookId);
            });
        });
    }

    static removeFavorite(bookId) {
        let pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];
        pochList = pochList.filter(book => book.id !== bookId);
        sessionStorage.setItem('pochList', JSON.stringify(pochList));
        Search.updateFavoritesDisplay();
    }
}

export default Search;

// mettre deux par deux recherche + pochlist 
// Logo Poch List
// centrer recherche
// logo, croix 
