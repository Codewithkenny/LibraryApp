const Book = require("../models/Book");

module.exports.addbook_post = async (req, res) => {
  const { book_title, book_author, publisher, publication_year } = req.body;

  try {
    const book = await Book.create({
      book_title,
      book_author,
      publisher,
      publication_year,
    });

    // res.json(book);
    res.redirect("/");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.addbook_get = async (req, res) => {
  res.render("addbook");
};

module.exports.single_book_get = async (req, res) => {
  // Fetch a specific book by ID
  try {
    const book = await Book.findById(req.params.id);
    res.render("singlebook", {book});
  } catch (err) {
    res.json(err);
  }
};

module.exports.get_all_books = async (req, res) => {
  // Fetch all books from the database
  
    const books = await Book.find();
    console.log(books);
    res.render("allbooks", {books});
};
