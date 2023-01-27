const Books = require("../models/Book");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// handle errors
// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let errors = { email: "", password: "" };

//   // duplicate email error
//   if (err.code === 11000) {
//     errors.email = "that email is already registered";
//     return errors;
//   }

//   // validation errors
//   if (err.message.includes("user validation failed")) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// };

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  const token = jwt.sign({ id }, "Secret token string", {
    expiresIn: maxAge,
  });
  return token;
};

// controllers actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  let { email, password, address, phone } = req.body;

  try {
    // encrypt password
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password, address, phone });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(201).json(user);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  // find user by email
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    // check if password match
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      // create token
      const token = createToken(user._id);

      // send token to the front end as a cookie
      res.cookie("jwt", token, {
        httOnly: true,
        expiresIn: maxAge * 1000,
      });
      // res.status(200).json(user);
      res.redirect('/')
    } else {
      res.json({
        message: "wrong password",
      });
    }
  } else {
    res.json({
      message: "no user with this email",
    });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", {
    expiresIn: 1,
  });
  res.redirect("/");
};
