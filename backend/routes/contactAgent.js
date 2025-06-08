import express from "express";
import {
  deleteMessage,
  getAllMessage,
  getContact,
 
  newContact
} from "../controllers/ContactAgent.js";

const router = express.Router();

// Message routes
router.post("/messages/:agentId", newContact);       // Create new message
router.get("/messages", getAllMessage);            // Get all messages (admin)
router.get("/messages/:messageId", getContact);     // Get specific message
router.delete("/messages/:messageId", deleteMessage); // Delete message

export default router;