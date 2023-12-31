const userSchema = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорретный Id'));
      }
      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;

  userSchema
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(
            'Пользователь с такой почтой уже зарегистрирован',
          ),
        );
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
