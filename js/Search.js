class Search {
    static clickForSearch(event) {
        event.preventDefault();
        const titleInput = document.getElementById("title_book");
        const authorInput = document.getElementById("author");

        if (!titleInput.value || !authorInput.value) {
            alert("Vous devez saisir le titre et l'auteur du livre");
        } else {
            this.getBooksFromGoogle(titleInput.value, authorInput.value);
            const content = document.getElementById("content");
            if (content) {
                content.style.display = "block";
            }
        }
    }

    static async getBooksFromGoogle(title, author) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=AIzaSyB9_kmuvdfj1aK_QY8c3JwHzDAYcsWd0HU`);
            if (!response.ok) throw new Error("Erreur de traitement");

            const bookSearchResults = await response.json();
            this.displayBooks(bookSearchResults);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la recherche des livres.");
        }
    }

    static displayBooks(bookSearchResults) {
        const content = document.getElementById("content");
        if (!content) return;

        content.innerHTML = '';

        if (!bookSearchResults.items || bookSearchResults.items.length === 0) {
            content.innerHTML = "<p>Aucun livre trouvé.</p>";
            return;
        }

        const results = document.createElement("div");
        results.id = "results"; 
        content.appendChild(results);

        const pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];

        bookSearchResults.items.forEach(book => {
            const { title, authors, description, imageLinks } = book.volumeInfo;
            const image = imageLinks ? imageLinks.thumbnail : "./unavailable.png";
            const author = authors ? authors.join(", ") : "Auteur inconnu";
            const isFavorited = pochList.some(b => b.id === book.id);

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");

            bookElement.innerHTML = `
                <button class="fav-button ${isFavorited ? 'active' : ''}" data-id="${book.id}" data-title="${title}" data-author="${author}" data-image="${image}">
                    <i class="fa-solid fa-bookmark"></i>
                </button>
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Auteur :</strong> ${author}</p>
                <p>${description ? description.substring(0, 200) : "Information manquante"}</p>
            `;

            results.appendChild(bookElement);
        });

        this.addBookmarkListeners();
    }

    static addBookmarkListeners() {
        document.querySelectorAll('.fav-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const btn = event.currentTarget;
                const bookData = {
                    id: btn.dataset.id,
                    title: btn.dataset.title,
                    author: btn.dataset.author,
                    image: btn.dataset.image
                };
                Search.toggleFavorite(bookData, btn);
            });
        });
    }

    static toggleFavorite(bookData, buttonElement) {
        let pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];
        const isFavorite = pochList.some(book => book.id === bookData.id);

        if (!isFavorite) {
            pochList.push(bookData);
            buttonElement.classList.add('active');
        } else {
            pochList = pochList.filter(book => book.id !== bookData.id);
            buttonElement.classList.remove('active');
        }

        sessionStorage.setItem('pochList', JSON.stringify(pochList));
        this.updateFavoritesDisplay();
    }

    static updateFavoritesDisplay() {
        const pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];

        const pochListTitle = Array.from(document.querySelectorAll("h2")).find(h2 =>
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
            return;
        }

        const bookList = document.createElement("div");
        bookList.classList.add("poch-list-container");

        pochList.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("poch-list-item");

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <div class="poch-list-info">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                </div>
                <button class="remove-fav" data-id="${book.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            bookList.appendChild(bookElement);
        });

        pochListContainer.appendChild(bookList);

        document.querySelectorAll('.remove-fav').forEach(button => {
            button.addEventListener('click', (event) => {
                const bookId = event.currentTarget.dataset.id;
                Search.removeFavorite(bookId);
            });
        });
    }

    static removeFavorite(bookId) {
        let pochList = JSON.parse(sessionStorage.getItem('pochList')) || [];
        pochList = pochList.filter(book => book.id !== bookId);
        sessionStorage.setItem('pochList', JSON.stringify(pochList));
        this.updateFavoritesDisplay();
    }
}

export default Search;
