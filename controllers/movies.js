// const mongoose = require('mongoose');
const BadRequestError = require("../errors/bad-request-error");
const Movie = require("../models/movie");

const { statusCode } = require("../utils/constants");
const { checkOwnerMovie, checkObject } = require("./validation");

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
  Card.create({
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
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Некорректные данные при создании карточки фильма"
          )
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById({ movieId: req.params.movieId })
    .then((movie) => checkOwnerMovie(movie, req.user._id))
    .then(() => Card.findOneAndRemove({ movieId: req.params.movieId }))
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
