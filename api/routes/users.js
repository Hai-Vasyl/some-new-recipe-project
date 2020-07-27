const { Router } = require("express")
const { check } = require("express-validator")
const {
  users_login,
  users_register,
  users_token,
  users_logout,
} = require("../controllers/users")
require("dotenv").config()
const router = Router()

router.post(
  "/login",
  [
    check("email", "Email is not correct").isEmail(),
    check("password", "Password is not correct!").isLength({ min: 4 }),
  ],
  users_login
)

router.post(
  "/register",
  [
    check(
      "username",
      "Username must contain at least 4 - 15 characters!"
    ).isLength({ min: 4, max: 15 }),
    check("email", "Email is not correct").isEmail(),
    check("password", "Password must contain at least 4 characters!").isLength({
      min: 4,
    }),
  ],
  users_register
)

router.post("/token", users_token)

router.post("/logout", users_logout)

module.exports = router
