const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const schema = require("./user-model")
const requireAuth = require("../auth/auth-required-middleware")

router.get("/users", requireAuth, (req, res) => {
  schema.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "server error", error: err})
    })
})

router.get("/logout", (req, res) => {
  // if (req.session) {
  //   req.session.reset(err => {
  //     if (err) {
  //       res.status(500).json({message: "server error", error: err})
  //     } else {
  //       res.status(200).json({message: "logged out!"})
  //     }
  //   })
  // } else {
  //   res.status(200).json({message: "you weren't logged-in in the first place"})
  // }
  req.session.reset()
  res.json({message: "logged out"})
})

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
  let {username, password} = req.body

  schema.findBy({username}) 
    .first()
    
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        
        req.session.user = user
        res.status(200).json(user)
      } else {
        res.status(401).json({message: "invalid user and pass"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "server error!", error: err})
    })
})

module.exports = router