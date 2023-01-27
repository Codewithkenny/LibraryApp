const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authroutes");
const librarianRoutes = require("./routes/librarianroutes");
const bookRoutes = require("./routes/bookroutes");
const borrowRoutes = require("./routes/borrowroutes")


// creat an express app
const app = express();

// middleware
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  
// register the view engine
app.set("view engine", "ejs");

// connect to database and start up server
const dbURI = "mongodb://127.0.0.1:27017/librarydb";
const port = 3007;

mongoose
  .connect(dbURI, { useNewURLParser: true })
  .then((result) => {
    console.log("Connected to Database");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.get("/", (req, res) => 
res.render("index"));
app.get("/login", (req, res) => res.render("login"));
// app.get("/book/allbooks", (req, res) => res.render("allbooks"))
app.use(authRoutes);
app.use(librarianRoutes);
app.use(bookRoutes);
app.use(borrowRoutes)
