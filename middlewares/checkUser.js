require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const librarian = require("../models/librarian");

const tokenKey = process.env.TOKEN_KEY;

const verifyToken = (req) => {
    const token = req.cookies.jwt;

    // verify token
    jwt.verify(token, tokenKey, (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            //redirect to login
            res.redirect("/login")
        } else {
            return decodedToken;
        }
    })
}

