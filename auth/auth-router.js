const router = require("express").Router()

const Users = require("../data/user-model")

router.post('/register'. (req, res) => {
  let user = req.body

  Users.register()
})

router.post("/", (req, res) => {
  schema.register(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "server error", error: err})
    })
})

module.exports = router