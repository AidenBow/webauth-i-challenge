const express = require("express")
const server = express()
const session = require("client-sessions")
const helmet = require("helmet")
const morgan = require("morgan")

const userRouter = require("./data/user-router")

const sessionConfig = {
  cookieName: "session",
  secret: "fuckkkWOW",
  duration: 24 * 60 * 60 * 1000,
  cookie: {
    //path: "/api",
    secure: false,
    httpOnly: true,
    ephemeral: false,

  }
}

server.use(helmet())
server.use(morgan("short"))
server.use(session(sessionConfig))
// server.use(function(req, res, next) {
//   if (req.mySession.seenyou) {
//     res.setHeader('X-Seen-You', 'true');
//   } else {
//     // setting a property will automatically cause a Set-Cookie response
//     // to be sent
//     req.mySession.seenyou = true;
//     res.setHeader('X-Seen-You', 'false');
//   }
// })
server.use(express.json())
server.use("/api", userRouter)

module.exports = server