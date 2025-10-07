require('dotenv').config();
const mongoose = require('mongoose');
const Book = require("./bookModule");

//connect to mongodb using our string 
mongoose.connect(process.env.MONGO_URI).then(
    async ()=>{
        console.log("connected to mongodb");

        //create a sample book 
        const sampleBook = new Book ({
            title: "The Power of Habit",
            author: "Charles Duhigg",
            genre: "Self-help",
            published_year: 2012,
            price: 15.99,
            in_stock: true,
            pages: 371,
            publisher: "Random House"
        })

        //save it to mongodb 
        await sampleBook.save()
        console.log("Book inserted successfully!")

        // close connection 
        mongoose.connection.close()
    }
)
