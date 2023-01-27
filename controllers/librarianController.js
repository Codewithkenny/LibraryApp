const Librarian = require("../models/Librarian");
const bcrypt = require("bcrypt");
const jwt = "jsonwebtoken";

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  const token = jwt.sign({ id }, "Secret token string", {
    expiresIn: maxAge,
  });
  return token;
};

//controller actions
module.exports.sign_up_get = (req, res) => {
  res.render("librariansignup");
};

module.exports.login_get = (req, res) => {
  res.render("librarianlogin");
};

module.exports.sign_up_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const librarian = await Librarian.create({
      email,
      password,
    });

    res.redirect("/librarian/login");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.add_book_post = (req, res) => {
  res.render(librariandashboard)
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  // find user by email
  const librarian = await Librarian.findOne({
    email: email,
  });
  if (librarian) {
    // check if password match
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      // create token
      const token = createToken(librarian._id);

      // send token to the front end as a cookie
      res.cookie("jwt", token, {
        httOnly: true,
        expiresIn: maxAge * 1000,
      });
      res.redirect("/librarian/dashboard");
    } else {
      res.json({
        message: "wrong password",
      });
    }
  } else {
    res.json({
      message: "no librarian with this email",
    });
  }
};


module.exports.logout_get = (req, res) => {
  console.log(librarianlogin);
}