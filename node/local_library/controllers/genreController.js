const async = require('async');
const Genre = require('../models/genre');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// display list of all genre
exports.genre_list = function (req, res, next) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genre) => {
      if (err) {
        return next(err);
      }
      // success -> render
      res.render('genre_list', { title: 'Genre List', genre_list: list_genre });
    });
};

// display detail page for a specific genre
exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // no results -> throw new error for not found and pass to next
        var err = new Error('Genre not found');
        err.status = 404;
        return next(err);
      }
      // success -> render
      res.render('genre_detail', {
        title: 'Genre Detail',
        genre: results.genre,
        genre_books: results.genre_books,
      });
    },
  );
};

// display genre create form on GET
exports.genre_create_get = function (req, res, next) {
  res.render('genre_form', { title: 'Create Genre' });
};

// handle genre create on POST
exports.genre_create_post = [
  // validate that the name field is not empty
  body('name', 'Genre name required')
    .isLength({ min: 1 })
    .trim(),

  // sanitize the name field
  sanitizeBody('name')
    .trim()
    .escape(),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract the validation errors
    const errors = validationResult(req);

    // create a genre object with sanitized data
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // render form with error message
      res.render('genre_form', { title: 'Create Genre', genre, errors: errors.array() });
    } else {
      // data is valid, check if genre exists
      Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
        if (err) {
          return next(err);
        }
        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          genre.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

// display genre delete form on GET
exports.genre_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// handle genre delete on POST
exports.genre_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// dsiplay genre update form on GET
exports.genre_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// handle genre update on POST
exports.genre_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};
