import Room from "../models/Room.js"
import Hotels from "../models/Hotels.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotels.findByIdAndUpdate(hotelId, {
                $push: {
                    rooms: savedRoom._id,
                }
            }).then(() => console.log("added room id "))
            res.status(200).json(savedRoom)
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}


export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        await Hotels.findByIdAndUpdate(hotelId, {
            $pull: {
                rooms: req.params.id
            }
        })
        res.status(200).json({ message: "Room o'chirildi !" })
    } catch (error) {
        next(error)
    }
}