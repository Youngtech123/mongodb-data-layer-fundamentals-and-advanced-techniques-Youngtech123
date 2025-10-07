require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./bookModule");
const connectDB = require("./connect");

(async () => {
  try {
    // 1 Connect to MongoDB
    await connectDB();

    // 2 Average price of books by genre
    console.log("\n Average price of books by genre:");
    const avgPriceByGenre = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          averagePrice: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
      { $sort: { averagePrice: -1 } },
    ]);
    console.log(avgPriceByGenre);

    // 3 Find the author with the most books
    console.log("\n Author with the most books:");
    const topAuthor = await Book.aggregate([
      {
        $group: {
          _id: "$author",
          totalBooks: { $sum: 1 },
        },
      },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 },
    ]);
    console.log(topAuthor);

    // 4 Group books by publication decade
    console.log("\n Books grouped by publication decade:");
    const booksByDecade = await Book.aggregate([
      {
        $addFields: {
          decade: {
            $concat: [
              { $toString: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] } },
              "0s",
            ],
          },
        },
      },
      {
        $group: {
          _id: "$decade",
          totalBooks: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(booksByDecade);

    console.log("\n Aggregation pipeline executed successfully!");
  } finally {
    mongoose.connection.close();
  }
})();
