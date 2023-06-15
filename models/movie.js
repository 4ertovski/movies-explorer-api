const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'поле country должно быть заполнено']
  },
  direction: {
    type: String,
    required: [true, 'поле direction должно быть заполнено']
  },
  duration: {
    type: Number,
    required: [true, 'поле duration должно быть заполнено']
  },
  year: {
    type: String,
    required: [true, 'поле year должно быть заполнено']
  },
  description: {
    type: String,
    required: [true, 'поле description должно быть заполнено']
  },
  image: {
    type: String,
    required: [true, 'поле image должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный формат URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'поле trailerLink должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный формат URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'поле thumbnail должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'поле owner должно быть заполнено']
  },
  movieId: {
    type: Number,
    required: [true, 'поле movieId должно быть заполнено']
  },
  nameRU: {
    type: String,
    required: [true, 'поле nameRU должно быть заполнено']
  },
  nameEN: {
    type: String,
    required: [true, 'поле nameEN должно быть заполнено']
  }
});

module.exports = mongoose.model('movie', movieSchema);
