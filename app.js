const config = require("./src/configs/config");
const express = require("express");
const bodyParser = require("body-parser");
const globalRoutes = require("./src/globalRoutes");
const errorMiddleware = require("./src/middlewares/error.middleware.js");
const connect = require("./database.js");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    config.corsHeaders.allowedOrigin
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    config.corsHeaders.allowedMethods
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    config.corsHeaders.allowedHeaders
  );
  next();
});

app.use(globalRoutes);
app.use(errorMiddleware);

app.listen(config.port, () => {
  connect();
});
