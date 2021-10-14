require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authorized = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("You must be logged in to access this page");
  }

  const token = authorization.split(" ")[1];

  const {id} = jwt.verify(token, process.env.JWT_SECRET);

  if(!id){
      return res.status(401).json("You are not authorized to access this route")
  }
  req.user = id
  next();
};
