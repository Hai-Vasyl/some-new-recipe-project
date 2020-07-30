const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const auth = require("./api/middlewares/auth.middleware")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const PORT = process.env.MAIN_PORT || 5000

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

    // app.use("/auth", require("./api/routes/users"))
    app.get("/test", async (req, res) => {
      try {
        const data = [
          {
            id: "1",
            name: "Tom",
            post: "Some post1",
          },
          {
            id: "2",
            name: "Jim",
            post: "Some post0",
          },
          {
            id: "3",
            name: "Karlo",
            post: "Some post2",
          },
        ]

        res.json(data)
      } catch (error) {
        res.status(500).json(`Data getting error: ${error.message}`)
      }
    })

    app.get("/recipes", async (req, res) => {
      try {
        const data = [
          {
            id: "1",
            name: "Jsim",
            recipe: "Recipe 1",
          },
          {
            id: "2",
            name: "Andrew",
            recipe: "Recipe 2",
          },
          {
            id: "3",
            name: "Tom",
            recipe: "Recipe 3",
          },
        ]

        res.json(data)
      } catch (error) {
        res.status(500).json(`Data getting error: ${error.message}`)
      }
    })

    app.listen(PORT, () => console.log(`Auth server started on port: ${PORT}`))
  } catch (error) {
    return console.log(`Auth server error: ${error.message}`)
  }
}

startServer()
