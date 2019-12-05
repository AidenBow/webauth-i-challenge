const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const schema = require("./user-model")

router.get("/", (req, res) => {
  schema.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "server error", error: err})
    })
})

router.post("/", (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash

  schema.register(user)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "server error", error: err})
    })
})

module.exports = router