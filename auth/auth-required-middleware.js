const schema = require("../data/user-model")
const bcrypt = require("bcryptjs")

module.exports = (req, res, next) => {
    let {username, password} = req.headers
    schema.findBy({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log("authorized")
          next()
        } else {
          res.status(401).json({message: "invalid credentials"})
        }
      })
      .catch(err => {
        res.status(500).json({message: "server error! in auth middle", error: err})
      })
}