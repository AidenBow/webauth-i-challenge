const express = require('express');
const router = express.Router();

const schema = require("./user-model")

router.post("/", (req, res) => {
  schema.register(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "server error", error: err})
    })
})

router.get("/", (req, res) => {
  schema.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "server error", error: err})
    })
})

module.exports = router