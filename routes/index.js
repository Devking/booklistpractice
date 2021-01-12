var express = require('express');
var router = express.Router();

let books = [];

router.get('/', function(req, res, next) {
  // This doesn't actually make use of the GET endpoint
  res.render('index', { books: books });
});

router.get('/books', function(req, res) {
  res.json({ books: books});
});

router.get('/books/:id', function(req, res) {
  const id = req.params.id;
  if (id < 0 || id > books.length) {
    res.json({ message: "invalid book id" });
  } else {
    const book = books[id];
    res.json({ book: book });
  }
});

router.delete('/books/:id', function(req, res) {
  const id = req.params.id;
  if (id < 0 || id > books.length) {
    res.json({ message: "invalid book id" });
  } else {
    const book = books.splice(id, 1);
    res.json({ book: book });
  }
});

router.put('/books/:id', function(req, res) {
  const id = req.params.id;
  if (id < 0 || id > books.length) {
    res.json({ message: "invalid book id" });
  } else {
    books[id].title = req.body.title;
    res.json({ book: books[id] });
  }
});

router.post('/books', function(req, res) {
  const new_id = books.length;
  books.push({
    id: new_id,
    title: req.body.title,
  });
  res.redirect('/');
});

module.exports = router;
