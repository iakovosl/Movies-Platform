const { verifyJwt } = require('./auth.service');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

exports.authorize = (req, res, next) => {
  try {
    const { username, id } = verifyJwt(req.get('token'));
    res.locals.username = username;
    res.locals.userId = id;

    next();
  } catch (e) {
    console.log(e);
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    };
  }
};
