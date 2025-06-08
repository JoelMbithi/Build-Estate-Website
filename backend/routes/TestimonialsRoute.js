import express from "express"
import { allReviews, createReview, getReview } from "../controllers/TestimonialsController.js"
import {verifyToken} from "../utils/jwt.js"
const router = express.Router()

router.post("/create", verifyToken, createReview);
router.get("/singleReview/:id", verifyToken, getReview);

router.get("/reviews",allReviews)

export default router