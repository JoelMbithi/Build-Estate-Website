import db from "../utils/db.js";
import cloudinary from 'cloudinary';

export const create = async (req, res) => {
    const { name, location, price, description, type, imageUrl } = req.body; // Now checks for `imageUrl`
    
    try {
      let finalImageUrl = null;
  
      // Case 1: File was uploaded directly (multer)
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'apartments'
        });
        finalImageUrl = result.secure_url;
      } 
      // Case 2: Image was uploaded via Cloudinary first (frontend sends URL)
      else if (imageUrl) {
        finalImageUrl = imageUrl;
      }
  
      const query = await db.query(
        `INSERT INTO apartments (name, location, price, type, description, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, location, price, type, description, finalImageUrl]
      );
  
      res.status(201).json({
        message: "Apartment created successfully",
        success: true,
        apartment: query.rows[0],
      });
    } catch (error) {
      console.error("Error creating apartment:", error);
      res.status(500).json({
        message: "Error creating apartment",
        success: false,
      });
    }
  };


export const getApartment = async (req, res) => {
    try {
        const query = await db.query(
            `SELECT * FROM apartments`
        )
        const apartments = query.rows;
    
        res.status(200).json({
            message: "Apartments fetched successfully",
            success: true,
            apartments: apartments,
        });
    } catch (error) {
        console.error("Error fetching apartments:", error);
        res.status(500).json({
            message: "Error fetching apartments",
            success: false,
        });
    }
}

export const getSingleApartment = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await db.query(
      `SELECT * FROM apartments WHERE apartments_id=$1`,
      [id]
    );

    if (query.rows.length === 0) {
      return res.status(404).json({
        message: "Apartment not found",
        success: false,
      });
    }

    res.status(200).json({
      apartment: query.rows[0],
      success: true,
    });
  } catch (error) {
    console.error("Error fetching apartment:", error);
    res.status(500).json({
      message: "Error fetching apartment",
      success: false,
    });
  }
};
