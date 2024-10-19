const { user } = require('../db');

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const value = user.findOne({
    username,
    password,
  });

  if (value) {
    next();
  } else {
    res.status.json({
      msg: "user doesn't exist ",
    });
  }
}

module.exports = userMiddleware;
