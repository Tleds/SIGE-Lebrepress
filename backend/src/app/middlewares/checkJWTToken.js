const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async function checkJWTToken(req, res, next) {
  const { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).send({ message: 'No token provided' });
  }
  const BearerToken = authentication.split(' ');
  const token = BearerToken[1];
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ auth: false, message: 'Failed to authenticate token' });
  }
};
