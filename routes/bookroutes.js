const { Router } = require("express");
const bookController = require("../controllers/bookController");

// create a router object
const router = Router();

// to get all books
router.get("/book/allbooks", bookController.get_all_books);

// to add a new book
router.get("/book/add", bookController.addbook_get);
router.post("/book/add", bookController.addbook_post);

// to get a single book
router.get("/book/:id", bookController.single_book_get);

module.exports = router;
