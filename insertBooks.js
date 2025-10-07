require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./bookModule"); // import Book model

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log(" Connected to MongoDB");

    const books = [
      { title: "The Power of Habit", author: "Charles Duhigg", genre: "Self-help", published_year: 2012, price: 15.99, in_stock: true, pages: 371, publisher: "Random House" },
      { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 18.50, in_stock: true, pages: 320, publisher: "Avery" },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Finance", published_year: 1997, price: 12.00, in_stock: true, pages: 336, publisher: "Plata Publishing" },
      { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 10.50, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 9.99, in_stock: true, pages: 281, publisher: "J.B. Lippincott & Co." },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, price: 11.25, in_stock: true, pages: 180, publisher: "Charles Scribner's Sons" },
      { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", genre: "Self-help", published_year: 1989, price: 16.75, in_stock: true, pages: 381, publisher: "Free Press" },
      { title: "The Intelligent Investor", author: "Benjamin Graham", genre: "Finance", published_year: 1949, price: 21.99, in_stock: true, pages: 640, publisher: "HarperBusiness" },
      { title: "Becoming", author: "Michelle Obama", genre: "Biography", published_year: 2018, price: 19.99, in_stock: true, pages: 448, publisher: "Crown" },
      { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", published_year: 2011, price: 17.99, in_stock: true, pages: 443, publisher: "Harvill Secker" }
    ];

    await Book.insertMany(books);
    console.log(" Inserted  books successfully!");

    mongoose.connection.close();
  })