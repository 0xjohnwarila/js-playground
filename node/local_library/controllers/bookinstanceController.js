const BookInstance = require('../models/bookinstance');

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
exports.bookinstance_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// handle bookinstance create on POST
exports.bookinstance_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
};

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
