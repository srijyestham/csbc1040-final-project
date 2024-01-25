

const { findTokenInCookie } = require("../services/authService.js");

const someMiddleware = async (req, res, next) => {
  console.time("Request (in middleware)");
  console.log(`METHOD: ${req.method}; URL: ${req.url}}`);

  try {
    await findTokenInCookie(req);
    next();
  } catch (err) {
    console.log("No Token");
    return res.status(501).send(err.message);
  }
  console.timeEnd("Request");
};

module.exports = someMiddleware;
