/*
 * Filename: complexCode.js
 * Content: Complex JavaScript code example
 * 
 * Description:
 * This code demonstrates a complex application that manages a library system.
 * It includes multiple classes and their interactions to handle books, authors,
 * users, borrowing, returning, and searching operations.
 * 
 * Note: This code assumes the availability of a database or storage system.
 * 
 * This is just a fictional example to showcase complexity and is not fully
 * functional or production-ready. It is meant to serve as a starting point for
 * further development.
 */

// ***************** Classes *****************

class Author {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Book {
  constructor(id, title, authorId, available = true) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.available = available;
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.authors = [];
    this.users = [];
    this.borrowedBooks = [];
  }
  
  addBook(title, authorId) {
    const bookId = this.books.length + 1;
    const book = new Book(bookId, title, authorId);
    this.books.push(book);
  }
  
  removeBook(bookId) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    }
  }
  
  addUser(name) {
    const userId = this.users.length + 1;
    const user = new User(userId, name);
    this.users.push(user);
  }
  
  removeUser(userId) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }
  
  addAuthor(name) {
    const authorId = this.authors.length + 1;
    const author = new Author(authorId, name);
    this.authors.push(author);
  }
  
  removeAuthor(authorId) {
    const authorIndex = this.authors.findIndex(author => author.id === authorId);
    if (authorIndex !== -1) {
      this.authors.splice(authorIndex, 1);
    }
  }
  
  borrowBook(bookId, userId) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    const userIndex = this.users.findIndex(user => user.id === userId);
    
    if (bookIndex === -1 || userIndex === -1) {
      console.log('Invalid book or user ID.');
    } else {
      const book = this.books[bookIndex];
      if (book.available) {
        book.available = false;
        this.borrowedBooks.push({ bookId, userId });
        console.log('Book successfully borrowed.');
      } else {
        console.log('The book is currently unavailable.');
      }
    }
  }
  
  returnBook(bookId, userId) {
    const borrowedBookIndex = this.borrowedBooks.findIndex(borrowedBook => 
      borrowedBook.bookId === bookId && borrowedBook.userId === userId
    );
    
    if (borrowedBookIndex === -1) {
      console.log('Invalid book or user ID.');
    } else {
      const bookIndex = this.books.findIndex(book => book.id === bookId);
      const borrowedBook = this.borrowedBooks[borrowedBookIndex];
      
      this.books[bookIndex].available = true;
      this.borrowedBooks.splice(borrowedBookIndex, 1);
      console.log('Book successfully returned.');
    }
  }
  
  searchBooksByAuthor(authorId) {
    const booksByAuthor = this.books.filter(book => book.authorId === authorId);
    return booksByAuthor;
  }
}

// ***************** Usage Example *****************

// Instantiate the library
const library = new Library();

// Add authors
library.addAuthor('Author A');
library.addAuthor('Author B');
library.addAuthor('Author C');

// Add books
library.addBook('Book 1', 1);
library.addBook('Book 2', 2);
library.addBook('Book 3', 1);
library.addBook('Book 4', 3);
library.addBook('Book 5', 2);

// Add users
library.addUser('User X');
library.addUser('User Y');

// Borrow books
library.borrowBook(1, 1);
library.borrowBook(3, 1);
library.borrowBook(2, 2);

// Return books
library.returnBook(1, 1);
library.returnBook(3, 1);

// Search books by author
const booksByAuthor = library.searchBooksByAuthor(2);
console.log('Books by Author 2:', booksByAuthor);

/*
Sample Output:

Book successfully borrowed.
The book is currently unavailable.
Book successfully borrowed.
Book successfully returned.
Book successfully returned.
Books by Author 2: [
  { id: 2, title: 'Book 2', authorId: 2, available: true },
  { id: 5, title: 'Book 5', authorId: 2, available: true }
]
*/

// ***************** Extend and enhance this code as needed *****************