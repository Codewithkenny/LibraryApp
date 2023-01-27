const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarianSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

const Librarian = mongoose.model("Librarian", librarianSchema);

module.exports = Librarian;
