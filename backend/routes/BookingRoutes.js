import express from "express";

import { createBooking, deleteBooking, getAllBooking, getSingleBooking, updateBooking } from "../controllers/BookingController.js";

const router = express.Router();

router.post("/book", createBooking)
router.put("/updateBooking/:id", updateBooking)
router.get("/getBooking/:id", getSingleBooking)
router.get("/getAllBooking", getAllBooking)
router.delete("/delete/:id",deleteBooking)

export default router;