import db from "../utils/db.js";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT user_id, name, email, role, country, phone, created_at FROM Reg`
        );

        res.status(200).json({
            success: true,
            data: result.rows,
            count: result.rowCount
        });
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};


// Get single user
export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            `SELECT user_id, name, email, role, country, phone,image, created_at 
             FROM Reg WHERE user_id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email,role, country, phone } = req.body;

    try {
        // Validate input
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        const result = await db.query(
            `UPDATE Reg 
             SET name = $1, email = $2 , role = $3, country = $4, phone = $5
             WHERE user_id = $6
             RETURNING user_id, name, email,role, country, phone, created_at`,
            [name, email, role, country, phone ,id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Update error:", error);
        
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update user"
        });
    }
};


export const deleteUser = async (req, res) => {
    const { password, email } = req.body;
    const { id } = req.params;

    try {
        // 1. Verify token matches requested user
        if (req.user.userId !== parseInt(id)) {
            return res.status(403).json({
                message: "You can only delete your own account!",
                success: false
            });
        }

        // 2. Get user with hashed password
        const user = await db.query(
            `SELECT user_id, email, password FROM Reg WHERE user_id=$1`,
            [id]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // 3. Verify password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // 4. Delete user
        await db.query(
            `DELETE FROM Reg WHERE user_id=$1`,
            [id]
        );

        // 5. Clear authentication tokens
        res.clearCookie('accessToken'); // If using cookies

        return res.status(200).json({
            message: "Account deleted successfully",
            success: true
        });

    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete user"
        });
    }
};