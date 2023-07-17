const router = require('express')
  .Router();

const moviesRouter = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidation, registrationValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(
    () => {
      throw new Error('Сервер сейчас упадёт');
    },
    0
  );
});

router.post('/signin', loginValidation, login);
router.post('/signup', registrationValidation, createUser);
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*',(request, response, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

module.exports = router;
