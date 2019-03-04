const Genre = require('../models/genre');

// display list of all genre
exports.genre_list = function (req, res, next) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genre) => {
      if (err) {
        return next(err);
      }
      // success -> render
      res.render('genre_list', { title: 'Genre Lits', genre_list: list_genre });
    });
};

// display detail page for a specific genre
exports.genre_detail = function (req, res) {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
};

// display genre create form on GET
exports.genre_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre create GET');
};

// handle genre create on POST
exports.genre_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre create POST');
};

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
