const async = require('async');
const Author = require('../models/author');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// display list of all authors
exports.author_list = function (req, res, next) {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
      if (err) {
        return next(err);
      }
      // success -> render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
};

// display detail page for a specific author
exports.author_detail = function (req, res, next) {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }, 'title summary').exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      } // error in API usage
      if (results.author == null) {
        // no results -> throw new error for no results
        var err = new Error('Author not found');
        err.status = 404;
        return next(err);
      }
      // success -> render
      res.render('author_detail', {
        title: 'Author Detail',
        author: results.author,
        author_books: results.authors_books,
      });
    },
  );
};

// display author create form on GET
exports.author_create_get = function (req, res, next) {
  res.render('author_form', { title: 'Create Author' });
};

// handle author create on POST
exports.author_create_post = [
  // validate fields
  body('first_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601(),
  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601(),

  // sanitize fields
  sanitizeBody('first_name')
    .trim()
    .escape(),
  sanitizeBody('family_name')
    .trim()
    .escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  // process request
  (req, res, next) => {
    // extract validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // render errors
      res.render('author_form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array(),
      });
    } else {
      // create auhtor oject with valid data
      const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
      author.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(author.url);
      });
    }
  },
];

// display author delete form on GET
exports.author_delete_get = function (req, res, next) {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.author == null) res.redirect('/catalog/authors');
      res.render('author_delete', {
        title: 'Delete Author',
        author: results.author,
        author_books: results.authors_books,
      });
    },
  );
};

// handle author delete on POST
exports.author_delete_post = function (req, res, next) {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.body.authorid).exec(callback);
      },
      authors_books(callback) {
        Book.find({ author: req.body.authorid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.authors_books.length > 0) {
        // author has books, render like GET route
        res.render('author_delete', {
          title: 'Delete Author',
          author: results.author,
          author_books: results.author_books,
        });
      } else {
        // author has no books. delete and redirect
        Author.findByIdAndRemove(req.body.authorid, (err) => {
          if (err) return next(err);
          res.redirect('/catalog/authors');
        });
      }
    },
  );
};

// display author update form on GET
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// handle author update on POST
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};
