const Book = require('../models/Book');
const User = require('../models/User');




// To borrow a book
module.exports.borrow_book = async (req, res) => {
  try {
    // Find the book in the database
    const book = await Book.findById(req.params.id);
  

      res.status(200).render('singlebook', {book})
    }  catch (err) {
        res.status(404).json({
          message: "Book not found",
        });
    }
  }
  

      
 
      
  

