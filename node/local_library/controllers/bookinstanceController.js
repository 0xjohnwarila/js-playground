const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');

// display list of all bookinstances
exports.bookinstance_list = function (req, res, next) {
  BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
      if (err) {
        return next(err);
      }
      // success -> render
      res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: list_bookinstances,
      });
    });
};

// display detail page for a specific bookinstance
exports.bookinstance_detail = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        // no results -> throw new error for no reults
        const err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }
      // success -> render
      res.render('bookinstance_detail', { title: 'Book:', bookinstance });
    });
};

// display bookinstance create form on GET
exports.bookinstance_create_get = function (req, res, next) {
  Book.find({}, 'title').exec((err, books) => {
    if (err) return next(err);
    res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
  });
};

// handle bookinstance create on POST
exports.bookinstance_create_post = [
  // validate fields
  body('book', 'Book must be specified')
    .isLength({ min: 1 })
    .trim(),
  body('imprint', 'Imprint must be specified')
    .isLength({ min: 1 })
    .trim(),
  body('due_back', 'Invalid date')
    .optional({ checkFalsy: true })
    .isISO8601(),

  // sanitize fields
  sanitizeBody('book')
    .trim()
    .escape(),
  sanitizeBody('imprint')
    .trim()
    .escape(),
  sanitizeBody('status')
    .trim()
    .escape(),
  sanitizeBody('due_back').toDate(),

  // process request with validated data
  (req, res, next) => {
    // extract errors
    const errors = validationResult(req);

    // create bookinstance object with escaped and trimmed data
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // render with error
      Book.find({}, 'title').exec((err, books) => {
        if (err) return next(err);
        res.render('bookinstance_form', {
          title: 'Create BookInstance',
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance,
        });
      });
    } else {
      // data is valid
      bookinstance.save((err) => {
        if (err) return next(err);
        res.redirect(bookinstance.url);
      });
    }
  },
];

// display bookinstance delete form on GET
exports.bookinstance_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// handle bookinstance delete on POST
exports.bookinstance_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// display bookinstance update form on GET
exports.bookinstance_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// handle bookinstance update on POST
exports.bookinstance_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};
