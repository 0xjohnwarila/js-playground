const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 100,
    min: 3,
  },
});

// virtual for genre's URL
GenreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`;
});

// export model
module.exports = mongoose.model('Genre', GenreSchema);
