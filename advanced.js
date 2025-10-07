require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./bookModule");
const connectDB = require("./connect");

(async () => {
  try {
    // 1 Connect to MongoDB
    await connectDB();

    // 2 Find books that are both in stock and published after 2010
    console.log("\n Books in stock and published after 2010:");
    const inStockBooks = await Book.find({
      in_stock: true,
      published_year: { $gt: 2010 },
    });
    console.log(inStockBooks);

    // 3 Use projection to return only title, author, and price
    console.log("\n Only title, author, and price fields:");
    const projectionBooks = await Book.find(
      {},
      { title: 1, author: 1, price: 1, _id: 0 } // _id:0 hides the default ID
    );
    console.log(projectionBooks);

    // 4 Implement sorting by price (ascending)
    console.log("\n Books sorted by price (ascending):");
    const sortedAsc = await Book.find({}, { title: 1, price: 1, _id: 0 }).sort({
      price: 1,
    });
    console.log(sortedAsc);

    // 5 Implement sorting by price (descending)
    console.log("\n Books sorted by price (descending):");
    const sortedDesc = await Book.find({}, { title: 1, price: 1, _id: 0 }).sort({
      price: -1,
    });
    console.log(sortedDesc);

    // 6 Implement pagination (5 books per page)
    const page = 1; // you can change to 2, 3, etc.
    const limit = 5;
    const skip = (page - 1) * limit;

    console.log(`\nPage ${page} (5 books per page):`);
    const paginatedBooks = await Book.find({}, { title: 1, price: 1, _id: 0 })
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit);
    console.log(paginatedBooks);

    console.log("\n Advanced queries executed successfully!");
  } finally {
    mongoose.connection.close();
  }
})();
