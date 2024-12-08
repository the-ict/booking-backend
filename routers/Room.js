import { Router } from "express";
import { createRoom, updateRoom, deleteRoom } from "../controllers/Room.js"
import { verifyAdmin } from "../until/verify.js"

const router = Router()

// CREATE ROOM
router.post("/:hotelId", verifyAdmin, createRoom)
// DELETE ROOM
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)
// UPDATE ROOM
router.put("/:id", verifyAdmin, updateRoom)

export default router