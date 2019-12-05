const router = require("express").Router()

const Users = require("../data/user-model")

router.post('/register'. (req, res) => {
  let user = req.body

  Users.register()
})