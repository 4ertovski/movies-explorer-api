const moviesRoutes = require('express')
  .Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  saveMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

moviesRoutes.get('/movies', getMovies);

moviesRoutes.post('/movies', saveMovieValidation, addMovie);

moviesRoutes.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = moviesRoutes;
