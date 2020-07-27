const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next()
    }

    const auth = req.headers.authorization
    if (!auth) {
      res.status(401).json("Access denied!")
    }
    const token = auth.split(" ")[1]
    if (!token) {
      res.status(401).json("Access denied!")
    }

    const { userId } = jwt.verify(token, process.env.ACCESS_SECRET)
    if (!userId) {
      res.status(401).json("Access denied!")
    }
    req.userId = userId
    next()
  } catch (error) {
    res.status(401).json(`Access denied, error: ${error.message}`)
  }
}
