var express = require('express');
var _ = require('underscore');
var router = express.Router();

let books = [];
let latestid = 0;

router.get('/', function(req, res, next) {
  // This doesn't actually make use of the GET endpoint
  res.render('index', { books: books });
});

router.get('/books', function(req, res) {
  res.json({ books: books});
});

router.get('/books/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const book = _.findWhere(books, {id: id});
  if (book) {
    res.json({ book: book });
  } else {
    res.status(500).json({ message: "invalid book id" });
  }
});

router.delete('/books/:id', function(req, res) {
  const id = parseInt(req.params.id);
  let books_id = -1;

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      books_id = i;
    }
  }

  if (books_id === -1) {
    res.status(500).json({ message: "invalid book id" });
  } else {
    const book = books.splice(books_id, 1);
    res.json({ book: book });
  }
});

router.put('/books/:id', function(req, res) {
  const id = parseInt(req.params.id);

  const book = _.findWhere(books, {id: id});
  if (book) {
    book.title = req.body.title;
  } else {
    res.status(500).json({ message: "invalid book id" });
  }
});

router.post('/books', function(req, res) {
  // a better way to do this is to assign a uuid
  const new_id = latestid++;
  books.push({
    id: new_id,
    title: req.body.title,
  });
  res.redirect('/');
});

module.exports = router;
