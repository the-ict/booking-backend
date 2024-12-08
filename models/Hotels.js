import mongoose from "mongoose"

const hotels = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
    },
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    cheapestPrice: {
        type: String,
    },
    featured: {
        type: String,
    },
    photos: {
        type: [String],
    },
    rooms: {
        type: [String],
        default: []
    }
}, { timestamps: true })

export default mongoose.model("hotels", hotels)