// we can use this to handle errors globally... of course not all client errors are here, but most of the ones we should have are here
// taken from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

class ClientErrors extends Error {
  constructor(message, errCode) {
    super();
    this.message = message;
    this.errCode = errCode;
  }

  get code() {
    return this.errCode;
  }

  set code(errCode) {
    this.errCode = errCode;
  }
}

const BadRequest = (message) => new ClientErrors(message, 400);
const Unauthorized = (message) => new ClientErrors(message, 401);
const Forbidden = (message) => new ClientErrors(message, 403);
const NotFound = (message) => new ClientErrors(message, 404);
const Conflict = (message) => new ClientErrors(message, 409);
const UnprocessibleEntry = (message) => new ClientErrors(message, 422);
const TooManyRequests = (message) => new ClientErrors(message, 429);

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  UnprocessibleEntry,
  TooManyRequests,
};
