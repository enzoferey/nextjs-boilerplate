function internalErrorMiddleware() {
  return (req, res, next) => {
    res.sendInternalError = message => {
      res.status(500);
      res.end(message);
    };
    next();
  };
}

module.exports = internalErrorMiddleware;
