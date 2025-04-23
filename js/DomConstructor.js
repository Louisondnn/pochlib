import Search from './Search.js';

class DomConstructor {

    createAddBookButton() {
        const button = document.createElement('button');
        button.id = 'bt_add';
        button.textContent = 'Ajouter un livre';
        button.style.display = 'block';
    
        const content = document.getElementById('content');
        const myBooks = document.getElementById('myBooks');
    
        if (content && myBooks) {
            myBooks.insertBefore(button, content);
        }
    
        button.addEventListener('click', () => {
            this.showSearchForm();
        });
    }
    
    createSearchForm() {
        const form = document.createElement('div');
        form.id = 'divformsearch';
        form.style.display = 'none';

        form.innerHTML = `
            <input id="title_book" type="text" placeholder="Titre du livre">
            <input id="author" type="text" placeholder="Auteur">
            <button id="bt_search">Rechercher</button>
            <button id="bt_cancel">Annuler</button>
        `;

        const content = document.getElementById('content');
        const myBooks = document.getElementById('myBooks');
        
        if (content && myBooks) {
          myBooks.insertBefore(form, content);
        }
        document.getElementById('bt_search').addEventListener('click', Search.clickForSearch);
        document.getElementById('bt_cancel').addEventListener('click', () => {
            form.style.display = 'none';
        });
    }

    showSearchForm() {
        const form = document.getElementById('divformsearch');
        if (form) {
            form.style.display = 'block';
        }
    }
}

export default DomConstructor;
