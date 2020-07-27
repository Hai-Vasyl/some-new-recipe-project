const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const PORT = process.env.AUTH_PORT || 4000

const startServer = async () => {
  try {
    mongoose.connect(
      process.env.ATLAS_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("MongoDB started successfully!")
    )

    app.use("/auth", require("./api/routes/users"))

    app.listen(PORT, () => console.log(`Auth server started on port: ${PORT}`))
  } catch (error) {
    return console.log(`Auth server error: ${error.message}`)
  }
}

startServer()
