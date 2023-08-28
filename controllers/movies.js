// const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad-request-error');
const Movie = require('../models/movie');

const { statusCode } = require('../utils/constants');
const { INVALID_DATA_MOVIE } = require('../utils/errorMessageConstants');
const { checkOwnerMovie, checkObject } = require('./validation');

module.exports.getMoviesByOwner = (req, res, next) => {
  Movie.find({ owner: req.user._id })

    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user,
  })
    .then((card) => res.status(statusCode.created).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA_MOVIE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.find({ movieId: req.params.movieId, owner: req.user._id })
    .then((movie) => checkOwnerMovie(movie, req.user._id))
    .then(() => Movie.findOneAndRemove({
      movieId: req.params.movieId,
      owner: req.user._id,
    }))
    .then((movie) => checkObject(movie, res))
    .catch(next);
};

// module.exports.deleteCardById = (req, res, next) => {
//   Card.findById(req.params.cardId)
//     .then((card) => checkOwnerCard(card, req.user._id))
//     .then(() => Card.findByIdAndRemove(req.params.cardId))
//     .then((card) => checkObject(card, res))
//     .catch(next);
// };

// module.exports.likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true }
//   )
//     .then((card) => checkObject(card, res))
//     .catch(next);
// };

// module.exports.dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true }
//   )
//     .then((card) => checkObject(card, res))
//     .catch(next);
// };
