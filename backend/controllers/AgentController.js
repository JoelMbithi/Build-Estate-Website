import db from "../utils/db.js"
import cloudinary from 'cloudinary';

/* Register Agent */
export const registerAgent = async (req,res) => {
    const {name, position, reviews, description,image, phone,rating,specialties,email} =req.body
    // Convert the comma-separated string to a PostgreSQL array format
let specialtiesFormatted = specialties.split(',').map(s => s.trim());
    try {
      
              let finalImage = null;
          
              // Case 1: File was uploaded directly (multer)
              if (req.file) {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                  folder: 'apartments'
                });
                finalImage = result.secure_url;
              } 
              // Case 2: Image was uploaded via Cloudinary first (frontend sends URL)
              else if (image) {
                finalImage = image;
              }
        const agent = await db.query(
            `INSERT INTO    agents  (name, position, reviews, description, image, phone,rating,specialties,email ) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9) RETURNING * `,
            [name, position, reviews, description, finalImage , phone,rating,specialtiesFormatted,email]
        )
        
        const newAgent = agent.rows[0]

        res.status(201).json({
            status:"success",
            message: "Successful Registered Agent",
            data: newAgent
        })
    } catch (error) {
        console.error("Error registering agent:", error);
      res.status(500).json({
        message: "Error registering agent",
        success: false,
      });
    }
}

export const UpdateAgent = async (req,res) => {
    const {name, position, reviews, description,image, phone,rating,specialties,email} =req.body
    const {id} = req.params
    try {
        const updateAgent = await db.query(
            `UPDATE agents SET name=$1,position =$2, description =$3, image=$4, phone=$5,rating=$6,specialties=$7 ,email,=$8  WHERE id=$9  RETURNING * `,
            [name, position,description, image, phone,rating,specialties,emailid]
        )

        const updatedAgent = updateAgent.rows[0]
                 
        const allAgents = await db.query(`SELECT * FROM agents ORDER BY id DESC`);

    res.status(200).json({
      status: "success",
      message: "Successfully updated agent",
      updatedAgent,
      allAgents: allAgents.rows,
    });
        
    } catch (error) {
        console.error("Error updating  agent:", error);
        res.status(500).json({
          message: "Error updating  agent",
          success: false,
        });
    }
}

/* get single agent */
export const singleAgent = async (req, res) => {
    const { id } = req.params;

    try {
        // Query the database for the agent by ID
        const singleAgent = await db.query(
            `SELECT * FROM agents WHERE id = $1`,
            [id]
        );

        // Check if the agent exists
        if (singleAgent.rows.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Agent not found",
            });
        }

        const agent = singleAgent.rows[0];

        // Send the agent details as the response
        res.status(200).json({
            status: "success",
            message: "Successfully retrieved agent",
            data: agent,
        });
    } catch (error) {
        console.error("Error when getting agent:", error);
        res.status(500).json({
            status: "error",
            message: "Error when getting agent",
            success: false,
        });
    }
};

/* get all agents */

export const allAgent = async (req,res) => {

    try {
        const allAgent = await db.query(
            `SELECT * FROM agents `
            
        )

        const agent = allAgent.rows

        res.status(200).json({
            status:"success",
            message:"Successful Retrived agent",
            data:agent
        })
    } catch (error) {
        console.error("Error when getting an  agent:", error);
        res.status(500).json({
          message: "Error when getting an  agent",
          success: false,
        });
    }
}

/* delete agent */

export const deleteAgent = async (req,res) => {
    const {id} = req.params
    try {
        const deleteAgent = await db.query(
            `DELETE  FROM agents  WHERE    id=$1`,
            [id]
        )

        res.status(200).json({
            status:"success",
            message : "Successful Deleted Agent",
            data:deleteAgent.rows[0]
        })
    } catch (error) {
        console.error("Error delete  agent:", error);
        res.status(500).json({
          message: "Error delete  agent",
          success: false,
        });
    }
}