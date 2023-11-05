require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { mongoConnect } = require("./db/mongoose")
const tradeRouter = require("./routes/trade.routes")
const userRouter = require("./routes/user.routes")

const PORT = process.env.PORT

const app = express()

//middlwares
app.use(express.json())
app.use(cors())


//requests
app.use("/user",userRouter)
app.use("/trade", tradeRouter)


async function startServer () {
  await mongoConnect()
  app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})
}

startServer()

