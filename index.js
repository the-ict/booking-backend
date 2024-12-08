import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import hotelsRoute from "./routers/Hotels.js"
import authRoute from "./routers/Auth.js"
import roomRoute from "./routers/Room.js"
import userRoute from "./routers/User.js"

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("connected")
})

mongoose.set('autoIndex', true)


// middlewares
app.use(express.json())
app.use(cookieParser())
// routers
app.use("/api/hotels", hotelsRoute)
app.use("/api/auth", authRoute)
app.use("/api/room", roomRoute)
app.use("/api/user", userRoute)


app.use((err, req, res, next) => {
    return res.status(err.status).json({
        status: err.status || 500,
        message: err.message || "Server error",
    })
})

app.listen(5000, () => {
    connect()
    console.log("connected to backend")
})