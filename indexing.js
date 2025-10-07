require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./bookModule");
const connectDB = require("./connect");

(async () => {
  try {
    // 1 Connect to MongoDB
    await connectDB();

    // 2 Create an index on the title field
    await Book.collection.createIndex({ title: 1 });
    console.log(" Index created on 'title' field");

    // 3 Create a compound index on author + published_year
    await Book.collection.createIndex({ author: 1, published_year: -1 });
    console.log(" Compound index created on 'author' and 'published_year'");

    // 4 Demonstrate performance with explain()
    console.log("\n Explain query before index:");
    const noIndexExplain = await Book.find({ title: "The Power of Habit" }).explain("executionStats");
    console.log("Documents examined:", noIndexExplain.executionStats.totalDocsExamined);
    console.log("Execution time (ms):", noIndexExplain.executionStats.executionTimeMillis);

    console.log("\n Explain query using index:");
    const indexExplain = await Book.find({ title: "The Power of Habit" }).hint({ title: 1 }).explain("executionStats");
    console.log("Documents examined:", indexExplain.executionStats.totalDocsExamined);
    console.log("Execution time (ms):", indexExplain.executionStats.executionTimeMillis);

    console.log("\n Indexing test completed successfully!");
  } finally {
    mongoose.connection.close();
  }
})();
