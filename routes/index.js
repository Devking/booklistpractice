var express = require('express');
var router = express.Router();

let books = [];

router.get('/', function(req, res, next) {
  res.render('index', {books: books});
});

router.get('/books', function(req, res) {
  res.json({ books: books});
});

router.post('/books', function(req, res) {
  books.push(req.body.title);
  res.redirect('/');
});

module.exports = router;
