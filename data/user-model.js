const db = require("./db-config")

function find() {
  return db("users")
}

function register(data) {
  return db("users").insert(data)
}


module.exports = {
  find,
  register
}