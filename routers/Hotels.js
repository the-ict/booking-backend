import { Router } from "express"
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/Hotels.js";

const router = Router()

// CREATE
router.post("/", createHotel)
// UPDATE
router.put("/:id", updateHotel)
// DELETE
router.delete("/:id", deleteHotel)
// GET
router.get("/:id", getHotel)
// GET ALL
router.get("/", getHotels)

export default router;