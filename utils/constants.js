module.exports.statusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  internalServerError: 500,
};

module.exports.MONGODB_DEV_CON = "mongodb://127.0.0.1:27017/bitfilmsdb3";
module.exports.SERVER_DEV_PORT = 3000;

module.exports.REGEX_URL =
  /https?:\/\/(www\.)?[\w\-@]{1,63}\.[a-z0-9]{1,63}[-a-z0-9._~:/?#[\]@!$&'()*+,;=]*#?/i;
