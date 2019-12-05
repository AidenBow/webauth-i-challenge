const express = require("express")
const server = express()

const userRouter = require("./data/user-router")

server.use(express.json())
server.use("/api", userRouter)

module.exports = server