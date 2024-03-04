const errorMiddleware = (error, req, res, next) => {
  const errorResponse = JSON.parse(JSON.stringify(error.message));
  const response = {
    message: errorResponse || "Something went wrong",
  };
  const status = error.status || 500;
  if (error && error.message === "Validation Failed") {
    res.status(400).send(response);
  } else {
    res.status(status).send(response);
  }
};
module.exports = errorMiddleware;
