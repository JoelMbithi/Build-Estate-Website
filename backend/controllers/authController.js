// controllers/authController.js
import db from "../utils/db.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

// REGISTER USER
export const register = async (req, res) => {
  const { name, email, password, confirmPassword, role, country, phone, imageUrl } = req.body;
  let finalImageUrl = null;

  try {
    
    // Check if user already exists
    const user = await db.query(`SELECT * FROM Reg WHERE email = $1`, [email]);

    if (user.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Password validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set default role to 'user' if not provided
    const userRole = role === 'admin' ? 'admin' : 'user';  // Admin role if passed, else 'user'

    // Handle image upload logic
    if (req.file) {
      // If image is uploaded directly through multer
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'apartments',
      });
      finalImageUrl = result.secure_url;
    } else if (imageUrl) {
      // If the image URL is sent from the frontend (Cloudinary image URL)
      finalImageUrl = imageUrl;
    }

    // Insert new user into the database
    const result = await db.query(
      `INSERT INTO Reg (name, email, password, role, country, phone, image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, email, hashedPassword, userRole, country, phone, finalImageUrl]
    );

    const newUser = result.rows[0];
    const token = generateToken({ userId: newUser.user_id });

    res.status(201).json({
      message: "User successfully created",
      user: {
        id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        country: newUser.country,
        phone: newUser.phone,
        image: newUser.image,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Error registering user",
      success: false,
    });
  }
};


// LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await db.query(`SELECT * FROM Reg WHERE email = $1`, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const loginUser = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      return res.status(403).json({
        message: "Invalid password",
        success: false,
      });
    }

    // Generate token
    const token = generateToken({ userId: loginUser.user_id });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: loginUser.user_id,
        name: loginUser.name,
        email: loginUser.email,
        role: loginUser.role,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "Error logging in",
      success: false,
    });
  }
};


