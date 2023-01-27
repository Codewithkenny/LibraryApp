const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
 
    book_title: {
      type: String,
      required: true,
      available: true,
    },
    book_author: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publication_year: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
