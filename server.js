const express = require("express")
const server = express()
const session = require("express-session")
const helmet = require("helmet")

const userRouter = require("./data/user-router")

const sessionConfig = {
  name: "bigMan",
  secret: "fuckkk",
  cookie: {
    maxAge: 1000 * 120,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
}

server.use(helmet())
server.use(session(sessionConfig))
server.use(express.json())
server.use("/api", userRouter)

module.exports = server