const { admin } = require('../db');

async function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  console.log({ username, password });
  const value = await admin.findOne({
    username,
    password,
  });
  if (value) {
    next();
  } else {
    res.status(403).json({
      msg: "user doesn't exist ",
    });
  }
}

module.exports = adminMiddleware;
