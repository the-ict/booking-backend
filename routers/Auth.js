import { Router } from "express"
import { register, login } from "../controllers/Auth.js"
import { verifyAdmin, verifyToken, verifyUser } from "../until/verify.js"

const router = Router()


router.get("/checkUser/:id", verifyUser, (req, res) => {
    res.send("salom, sen allaqachon ro'yhatdan o'tgansan")
})

router.get("/checkAdmin", verifyAdmin, (req, res) => {
    res.send("Siz adminsiz")
})

router.get("/checkToken", verifyToken, (req, res) => {
    res.send("Siz ro'yhatdan o'tgansiz !")
})


// create user
router.post("/register", register)
// login
router.post("/login", login)

export default router