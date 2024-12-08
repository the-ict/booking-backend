import jwt from "jsonwebtoken"
import { createError } from "./createError.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "Siz hali ro'yhatdan o'tmagansiz !"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "token no'to'gri kiritilgan !"))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Siz ro'yhatdan o'tmagansiz va siz malumotlaringizni o'chira olasiz !"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            next(createError(303, "Siz admin emassiz !"))
        }
    })
}