import User from "../models/User.js"
import { verifyAdmin, verifyUser } from "../until/verify.js"
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/User.js"
import { Router } from "express"

const router = Router()

// UPDATE USER
router.put("/:id", verifyUser, updateUser)
// DELETE USER
router.delete("/:id", verifyUser, deleteUser)
// GET ONE USER
router.get("/:id", verifyUser, getUser)
// GET ALL USER
router.get("/", verifyAdmin, getUsers)

export default router