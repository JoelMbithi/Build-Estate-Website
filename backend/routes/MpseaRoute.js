const express = require("express");
const { initiateSTKPush } = require("./mpesa");
const app = express();
app.use(express.json());

// M-Pesa callback endpoint
app.post("/api/mpesa-callback", (req, res) => {
  try {
    console.log("M-Pesa callback received:", req.body);

    // Optionally, validate the callback payload or verify authenticity here

    // Handle the STK Push response logic (e.g., save to DB, update status)
    // Example:
    // const transactionStatus = req.body.StatusCode;
    // Save transaction status to your database or perform other actions.

    // Respond to M-Pesa to acknowledge receipt
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Error handling M-Pesa callback:", error);
    res.status(500).json({ error: "An error occurred while processing the callback" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Mpesa Server running on port 3000");
});
