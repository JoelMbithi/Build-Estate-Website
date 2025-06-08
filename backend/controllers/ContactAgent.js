import db from "../utils/db.js";

// Send message to agent
export const newContact = async (req, res) => {
    const { name, email, phone, message } = req.body;
    const { agentId } = req.params; // Changed from id: agentId to just agentId

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and message are required fields"
        });
    }

    try {
        // 1. Verify agent exists - with parseInt for safety
        const agentCheck = await db.query(
            `SELECT id FROM agents WHERE id = $1`,
            [parseInt(agentId)] // Ensure integer type
        );
        
        if (agentCheck.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Agent not found",
                debug: { receivedAgentId: agentId } // For troubleshooting
            });
        }

        // 2. Insert message
        const result = await db.query(
            `INSERT INTO messages (
                agent_id,
                name,
                email,
                phone,
                message,
                created_at
             ) VALUES ($1, $2, $3, $4, $5, NOW()) 
             RETURNING *`,
            [parseInt(agentId), name, email, phone, message]
        );

        // 3. Send success response
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Message submission error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                stack: error.stack,
                params: req.params
            } : undefined
        });
    }
};

// Get single message
export const getContact = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await db.query(
            `SELECT * FROM messages WHERE id = $1`,
            [id]
        );

        // Check if message exists
        if (message.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully retrieved the message",
            data: message.rows[0]
        });
    } catch (error) {
        console.error("Error getting message:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving message",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all messages
export const getAllMessage = async (req, res) => {
    try {
        const messages = await db.query(`
            SELECT m.*, a.name as agent_name 
            FROM messages m
            LEFT JOIN agents a ON m.agent_id = a.id
            ORDER BY m.created_at DESC
        `);

        res.status(200).json({
            success: true,
            message: "All messages retrieved successfully",
            data: messages.rows
        });
    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving messages",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Delete message
export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        // First check if message exists
        const checkMessage = await db.query(
            `SELECT id FROM messages WHERE id = $1`,
            [id]
        );
        
        if (checkMessage.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // Then delete
        await db.query(
            `DELETE FROM messages WHERE id = $1`,
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting message",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};