import express from "express"
import multer from "multer";
import { allAgent, deleteAgent, registerAgent, singleAgent, UpdateAgent } from "../controllers/AgentController.js";

const router = express.Router()
const upload = multer({ dest: "uploads/" })



router.post("/register",upload.single("image"), registerAgent)
router.put("/update/:id",UpdateAgent)
router.get("/singleAgent/:id",singleAgent)
router.get("/allAgents",allAgent)
router.delete("/delete/:id",deleteAgent)
export default router