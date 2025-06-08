import express from "express";
import multer from "multer";
import { create, getApartment, getSingleApartment } from "../controllers/ApartmentController.js";

const router = express.Router();

// Configure multer
const upload = multer({ dest: "uploads/" }); // save uploaded files in /uploads/

// POST route (with file upload)
router.post("/add", upload.single("image"), create);

// GET route
router.get("/get", getApartment);
router.get("/getSingleApartment/:id",getSingleApartment)
export default router;
