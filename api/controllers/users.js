const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const getTokens = (userId) => {
  const { REFRESH_SECRET, ACCESS_SECRET } = process.env
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "1m" })
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET)
  const { iat } = jwt.verify(accessToken, ACCESS_SECRET)
  return { accessToken, refreshToken, iat }
}

exports.users_login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        errors: [
          { param: "email", msg: "User with this email is not exists!" },
        ],
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({
        errors: [{ param: "password", msg: "Password is not correct!" }],
      })
    }

    const { accessToken, refreshToken, iat } = getTokens(user._id)
    await User.updateOne({ _id: user._id }, { refresh_token: refreshToken })

    res.json({ accessToken, refreshToken, iat, user })
  } catch (error) {
    res.status(500).json(`Login error: ${error.message}`)
  }
}

exports.users_register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const { username, email, password, typeUser } = req.body

    const userByUsername = await User.findOne({ username })
    const userByEmail = await User.findOne({ email })
    if (userByUsername && userByEmail) {
      return res.status(400).json({
        errors: [
          { param: "username", msg: "Username must be unique!" },
          { param: "email", msg: "Email must be unique!" },
        ],
      })
    } else if (userByUsername || userByEmail) {
      if (userByUsername) {
        return res.status(400).json({
          errors: [
            {
              param: "username",
              msg: "User with this username is already exists!",
            },
          ],
        })
      } else {
        return res.status(400).json({
          errors: [
            {
              param: "email",
              msg: "User with this email is already exists!",
            },
          ],
        })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      typeUser,
      date: new Date(),
    })
    const user = await newUser.save()

    const { accessToken, refreshToken, iat } = getTokens(user._id)
    await User.updateOne({ _id: user._id }, { refresh_token: refreshToken })

    res.json({ accessToken, refreshToken, iat, user })
  } catch (error) {
    res.status(500).json(`Login error: ${error.message}`)
  }
}

exports.users_token = async (req, res) => {
  try {
    const { refreshToken, userId } = req.body

    const userRefreshToken = await User.find({
      _id: userId,
      refresh_token: refreshToken,
    })
    if (!userRefreshToken) {
      return res.status(401).json("Access denied!")
    }

    const { REFRESH_SECRET, ACCESS_SECRET } = process.env
    const user_id = jwt.verify(refreshToken, REFRESH_SECRET)
    if (!user_id) {
      return res.status(401).json("Access denied!")
    }

    const accessToken = jwt.sign({ userId: user_id }, ACCESS_SECRET, {
      expiresIn: "1m",
    })
    const { iat } = jwt.verify(accessToken, ACCESS_SECRET)

    res.json({ accessToken, iat })
  } catch (error) {
    res.status(500).json(`Refresh access token error: ${error.message}`)
  }
}

exports.users_logout = async (req, res) => {
  try {
    const { refreshToken, userId } = req.body
    await User.updateOne(
      { _id: userId, refresh_token: refreshToken },
      { refresh_token: "" }
    )

    res.status(203).json("User logout successfully!")
  } catch (error) {
    res.status(500).json(`Logout error: ${error.message}`)
  }
}
