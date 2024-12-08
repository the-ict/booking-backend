import mongoose from "mongoose"

const Rooms = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: [{ number: String, unDates: [Date] },]
}, {timestamps: true})

export default mongoose.model("Rooms", Rooms)