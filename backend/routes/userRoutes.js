import express from "express"
import {  deleteUser, getUser ,getUsers, updateUser } from "../controllers/userController.js"
import { verifyToken } from "../utils/jwt.js"


const router = express.Router()
router.get("/getUsers",verifyToken, getUsers)
router.get("/getUser/:id",verifyToken,  getUser)
router.put("/updateUser/:id",verifyToken ,updateUser)
router.delete("/deleteUser/:id",verifyToken,deleteUser)


export default router