const {
  JWT_SECRET = 'JWT_SECRET',
  NODE_ENV,
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  EMAIL_REGEX =
  "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
} = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  MONGO_URL,
  EMAIL_REGEX
};
