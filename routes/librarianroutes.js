const { Router } = require("express");
const librarianController = require("../controllers/librarianController");

const router = Router();

// create routes
router.get("/librarian/signup", librarianController.sign_up_get);
router.post("/librarian/signup", librarianController.sign_up_post);
router.post("/librarian/add-book", librarianController.add_book_post);

router.get("/librarian/dashboard", librarianController.login_get);
router.get("/librarian/login", librarianController.login_get);
router.post("/librarian/login", librarianController.login_post);


router.get("/librarian/logout" , librarianController.logout_get)
module.exports = router;
