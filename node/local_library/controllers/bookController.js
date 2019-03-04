const async = require('async');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

// display home page
exports.index = function (req, res) {
  async.parallel(
    {
      book_count(callback) {
        Book.countDocuments({}, callback);
      },
      book_instance_count(callback) {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count(callback) {
        BookInstance.countDocuments({ status: 'Available' }, callback);
      },
      author_count(callback) {
        Author.countDocuments({}, callback);
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render('index', { title: 'Local Library Home', error: err, data: results });
    },
  );
};

// display list of all books
exports.book_list = function (req, res, next) {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, list_books) => {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });
};

// display detail page for a specific book
exports.book_detail = function (req, res, next) {
  async.parallel(
    {
      book(callback) {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      book_instance(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.book == null) {
        // no result -> throw new error for no result
        var err = new Error('Book not found');
        err.status = 404;
        return next(err);
      }
      // success -> render
      res.render('book_detail', {
        title: 'Title',
        book: results.book,
        book_instances: results.book_instance,
      });
    },
  );
};

// display book create form on GET
exports.book_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
};

// handle book create on POST
exports.book_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create POST');
};

// display book delete form on GET
exports.book_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// handle book delete on POST
exports.book_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// display book update form on GET
exports.book_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// handle book update on POST
exports.book_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST');
};
