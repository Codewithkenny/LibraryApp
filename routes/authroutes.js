const { Router } = require("express");
const authController = require("../controllers/authController");

// create a router object
const router = Router();

// create routes

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);


// router.get("/logout", authcontroller.logout_get);

module.exports = router;
