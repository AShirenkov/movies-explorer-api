const router = require('express').Router(); // создали роутер

const {
  getMoviesByOwner,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  checkMovieId,
  checkMovie,
} = require('../middlewares/requestValidation');

router.get('', getMoviesByOwner);
router.post('', checkMovie, createMovie);
router.delete('/:movieId', checkMovieId, deleteMovieById);

module.exports = router;
