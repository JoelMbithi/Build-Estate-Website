import express from "express"
import {login, register } from "../controllers/authController.js"
import { verifyToken } from "../utils/jwt.js"
import multer from "multer"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.post("/create",upload.single("image"),register)
router.post("/login",login)


export default router