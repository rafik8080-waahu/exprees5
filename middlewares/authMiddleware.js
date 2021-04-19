const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("auth-token");
  !token && res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = protect;
