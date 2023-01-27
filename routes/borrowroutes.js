const { Router } = require("express");
const borrowController = require("../controllers/borrowedbookController")

const router = Router();

router.get("/borrow/:id", borrowController.borrow_book) 

module.exports = router;