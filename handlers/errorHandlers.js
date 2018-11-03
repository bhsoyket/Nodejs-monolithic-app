
exports.catchErrors = fn => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

exports.notFound = (req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json({ message: 'not found' });
};


exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack,
  };
  res.status(err.status || 500);
  res.format({
    // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
  });
};


exports.productionErrors = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    status: err.status,
  };
  res.status(err.status || 500);
  res.format({
    // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
  });
};
