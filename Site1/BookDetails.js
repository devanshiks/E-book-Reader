function openForm() {
    document.getElementById("book-form").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("book-form").style.display = "none";
  }
  
function redirect()
{
  window.location.href="BookDetails.html";
}
  //Book Class: Represents a Book
  class Book{
      constructor(title, author,category){
         this.title = title;
         this.author = author;
         this.category = category; 
      }
  }

  // UI Class : handle UI Tasks
class UI{
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach( (book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
      }
    }

    static showAlert(message, className){
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      // Vanish in 5 seconds;
      setTimeout(() => document.querySelector('.alert').remove(),5000);
    }

    static clearFields() {
      document.querySelector('#title').value = ' ';
      document.querySelector('#author').value = ' ';
      document.querySelector('#genre').value = ' ';
    }
}
  // Store Class: Handles Storage
  class Store{
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      } 
      else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    static addBook(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title){
      const books = Store.getBooks();

      books.forEach((book, index) => {
        if(book.title == title){
            books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  //Event: Display Book
  document.addEventListener('DOMContentLoaded', UI.displayBooks);

  // Event: Add a Book
    document.querySelector('#book-form').addEventListener('submit', (e) => {

  //Prevent actual submit
  e.preventDefault();

    //Get from values
     const title = document.querySelector('#title').value;
     const author = document.querySelector('#author').value;
     const category = document.querySelector('#genre').value;

     //Validate
     if(title === '' || author === '' || category === ''){
       UI.showAlert('please fill in all details', 'danger');
     }
     else{

     //instantiate book
     const book = new Book(title, author, category);

     //Add Book to UI
     UI.addBookToList(book);

     //Add Book to store
     Store.addBook(book);

     //success Message
     UI.showAlert('Book Added', 'success');
    
     // Clear fields
     UI.clearFields();
     }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    //success Message
    UI.showAlert('Book Removed', 'success');

    // Remove book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});
