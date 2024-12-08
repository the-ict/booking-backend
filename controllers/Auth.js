import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt, { hashSync } from "bcrypt"
import { createError } from "../until/createError.js"

export const register = async (req, res, next) => {
    try {
        const gen = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, gen)
        console.log(hash)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        if (!newUser) return next(createError(300, "User not created"))
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "user not found !"))
        const confirmPassword = await bcrypt.compare(req.body.password, user.password)
        if (!confirmPassword) return next(createError("Wrong username or password !"))
        const token = jwt.sign({ isAdmin: user.isAdmin, id: user._id, }, process.env.JWT)
        const { isAdmin, password, ...others } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ isAdmin, id: user._doc.id, ...others })
    } catch (error) {
        next(error)
    }
}