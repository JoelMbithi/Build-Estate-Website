import jwt from "jsonwebtoken";
import "dotenv/config";

// Use the JWT_SECRET from the environment variable
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (req, res, next) => {
  // Log headers and cookies for debugging
  console.log('Received headers:', req.headers);
  console.log('Received cookies:', req.cookies);

  // Extract the token from either cookies or Authorization header
  const token = req.cookies?.accessToken || 
                (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  // If no token, return an error
  if (!token) {
    console.error('No token found');
    return res.status(403).json({ message: "Authentication required", success: false });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);  // Log decoded token for debugging

    // Attach the decoded token (user info) to the request object
    req.userId = decoded.userId;  

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);

    // Specific error handling if the token has expired
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Session expired, please login again", 
        success: false 
      });
    }

    // General invalid token error
    return res.status(401).json({ 
      message: "Invalid authentication", 
      success: false 
    });
  }
};
