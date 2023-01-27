const mongoose = require('mongoose');
const Schema = mongoose.Schema

const borrowedBookSchema = new Schema(
  {
    book_id: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: 'Borrowed'
    },
  },

  { timestamp: true }
);

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);

module.exports = BorrowedBook;