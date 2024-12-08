import Hotels from "../models/Hotels.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotels(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "hotel allaqchon o'chirilgan !" })
    } catch (error) {
        next(err)
    }
}

export const getHotel = async (req, res, next) => {
    console.log('null')
    try {
        const hotel = await Hotels.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotels.find()
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}