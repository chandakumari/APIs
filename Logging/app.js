const express = require("express");
const app = express();
const User = require("./user");
const logger = require("./logger");

app.get("/", (req, res) => {
  logger.info("query", { query: req.query });

  logger.info("Finding user", { q: req.query});
  const foundUser = User.findUser(req.query);
  logger.info("User found", { foundUser });

  const msg = {
    username: foundUser && foundUser.username,
    foundUser: !!foundUser
  };
  logger.info("response", msg);
  res.json(msg);
});

module.exports = app;