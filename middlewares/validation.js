const {
  Joi,
  celebrate,
} = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const urlValidation = (url) => {
  if (validator.isUrl(url)) return url;
  throw new BadRequestError('Некорректный адрес URL');
};

module.exports.registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.saveMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailer: Joi.string().required().custom(urlValidation),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});
