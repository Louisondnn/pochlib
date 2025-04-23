class DomManipulator {
  static showHideSearchForm() {
    const form = document.getElementById('divformsearch');
    if (form) {
      form.style.display = (form.style.display === 'none') ? 'block' : 'none';
    }
  }

  static cancelSearch() {
    const form = document.getElementById('divformsearch');
    if (form) {
      form.style.display = 'none';
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => input.value = '');
    }
  }

  static getBooksFromSession() {
    const books = sessionStorage.getItem('books');
    return books ? JSON.parse(books) : [];
  }

  static saveBookToSession(book) {
    let books = DomManipulator.getBooksFromSession();
    books.push(book);
    sessionStorage.setItem('books', JSON.stringify(books));
  }

  static showSearchElements() {
    document.getElementById('divformsearch').style.display = 'block';
    document.getElementById('bt_search').style.display = 'inline-block';
    document.getElementById('bt_cancel').style.display = 'inline-block';
    document.getElementById('bt_add').style.display = 'none';
    document.getElementById('pochList').style.display = 'block';
  }

  static hideSearchElements() {
    document.getElementById('divformsearch').style.display = 'none';
    document.getElementById('bt_search').style.display = 'none';
    document.getElementById('bt_cancel').style.display = 'none';
    document.getElementById('bt_add').style.display = 'inline-block';
    document.getElementById('pochList').style.display = 'block';

  }
  static renderPochList() {
    const books = DomManipulator.getBooksFromSession();
  
    let container = document.getElementById('pochList');
  
    if (!container) {
      container = document.createElement('div');
      container.id = 'pochList';
  
      const content = document.getElementById('content');
      if (content) {
        content.appendChild(container); // reste dans #content
      }
    }
  
    container.innerHTML = '<h3>Ma Poch\'List</h3>';
  
    const list = document.createElement('div');
    list.className = 'poch-list-container';
  
    books.forEach(book => {
      const item = document.createElement('div');
      item.className = 'poch-list-item';
  
      item.innerHTML = `
        <img src="${book.image}" alt="${book.title}" />
        <div class="poch-list-info">
          <h4>${book.title}</h4>
          <p>${book.author}</p>
        </div>
        <button class="delete-btn">🗑️</button>
      `;
  
      item.querySelector('.delete-btn').addEventListener('click', () => {
        DomManipulator.deleteBook(book.id);
      });
  
      list.appendChild(item);
    });
  
    container.appendChild(list);
  }
  
  
  static deleteBook(id) {
    let books = DomManipulator.getBooksFromSession();
    books = books.filter(book => book.id !== id);
    sessionStorage.setItem('books', JSON.stringify(books));
    document.getElementById('pochList')?.remove();
    DomManipulator.renderPochList();
  }
  
}

export default DomManipulator;
