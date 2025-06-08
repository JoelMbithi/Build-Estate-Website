import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";  // ES6 import

import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/userRoutes.js";
import apartmentRouter from "./routes/ApartmentRoute.js";
import bookingRouter from "./routes/BookingRoutes.js";
import agentRouter from "./routes/AgentRoute.js"
import contactRoute from "./routes/contactAgent.js"
import testimonialsRoute from "./routes/TestimonialsRoute.js"
import { initiateSTKPush } from "./mpesa.js"

import twilio from 'twilio';

// Load environment variables
  dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Express setup
const app = express();
const PORT = 4001;
const port = 5000;

// Set up the Twilio client using environment variables
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Middleware to parse JSON request bodies
app.use(express.json());

// POST route to trigger a call
app.post('/make-call', (req, res) => {
  const { phoneNumber } = req.body; // Get phone number from request body

  client.calls.create({
    to: phoneNumber,             // Phone number to call
    from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
    url: 'http://your-server.com/twiml'    // URL for the TwiML response
  })
  .then(call => {
    res.status(200).send('Call initiated');
    console.log(call.sid);  // Log call SID for debugging
  })
  .catch(err => {
    res.status(500).send('Error initiating call');
    console.error(err);
  });
});

// TwiML endpoint that responds with instructions for the call
app.get('/twiml', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Hello! You have a new inquiry. Please hold for an agent.');
  res.type('text/xml');
  res.send(twiml.toString());
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/api/mpesa-callback", (req, res) => {
  console.log("M-Pesa callback received:", req.body);
  res.status(200).json({ message: "Callback received successfully" });
});

app.listen(3001, () => {
  console.log("Server running on port 3000");
});

// Middleware setup
app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


/* Mpesa  */
// Add this to your server.js file
app.post("/api/pay", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await initiateSTKPush(phone, amount);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error initiating STK Push:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});


// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/apartment", apartmentRouter);
app.use("/api/booking", bookingRouter)
app.use("/api/agent", agentRouter)
app.use("/api/message",contactRoute)
app.use("/api/Testimonials",testimonialsRoute)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
