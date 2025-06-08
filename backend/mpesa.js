// mpesa.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAccessToken = async () => {
  const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString("base64");

  const res = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` },
  });

  return res.data.access_token;
};

export const initiateSTKPush = async (phone, amount) => {
    const access_token = await getAccessToken();
  
    // ✅ Format phone number
    const formatPhoneNumber = (phone) => {
      if (phone.startsWith("0")) {
        return "254" + phone.substring(1);
      } else if (phone.startsWith("+")) {
        return phone.replace("+", "");
      } else if (phone.startsWith("7")) {
        return "254" + phone;
      }
      return phone; // assume already formatted
    };
  
    const formattedPhone = formatPhoneNumber(phone);
  
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const password = Buffer.from(`${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString("base64");
  
    const payload = {
      BusinessShortCode: process.env.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: process.env.SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: "Build Estate ",
      TransactionDesc: "Payment for Order 123",
    };
  
    const res = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
  
    return res.data;
  };
  