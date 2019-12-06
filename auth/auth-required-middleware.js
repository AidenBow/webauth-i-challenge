// const schema = require("../data/user-model")
// const bcrypt = require("bcryptjs")

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("authorized")
    next()
  } else {
    res.status(401).json({message: "invalid credentials"})
  }
}