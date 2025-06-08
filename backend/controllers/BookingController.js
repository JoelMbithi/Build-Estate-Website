import db from '../utils/db.js';


export const createBooking = async (req, res) => {
    const { room_number, occupant, status, type, location ,price} = req.body;
    try {
        const query = await db.query(
            `INSERT INTO booking (room_number,occupant,status,type,location,price) VALUES ($1,$2, $3, $4, $5,$6) RETURNING *`,
            [room_number,occupant,status,type,location,price]
        )

        const newBooking = query.rows[0]
        res.status(201).json({
            status: "Success",
            message: "Booking created successfully",
                booking: newBooking
            
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        })

    }
}

/* Update booking */

export const updateBooking = async (req,res) => {
    const {id} = req.params
    const { room_number, occupant, status, type, location,price } = req.body;
    try {
        const query = await db.query(
            `UPDATE booking SET room_number = $1, occupant = $2, status =  $3, Type = $4, location = $5 ,price= $6 WHERE id = $7 RETURNING *`,
            [room_number,occupant,status,type,location, price,id]
        )

        const updatedBooking = query.rows[0]
        res.status(200).json({
            status:"Success",
            message: "Booking updated successfully",
                booking: updatedBooking
            
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        })

    }
}

/* get all Booking */
export const getSingleBooking = async (req, res) => {
    const {id} = req.params
    const { room_number, occupant, status, type, location } = req.body;
    try {
        const query = await db.query(
            `SELECT * FROM booking WHERE id = $1`,
            [id]
        )
        const booking = query.rows[0]

        if(!booking){
            return res.status(404).json({
                status: "Failed",
                message: "Booking not found"
            }) 
        }
        res.status(200).json({
            status: "Success",
            message: "Booking retrieved successfully",
                booking
              
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        })
    }
}

/* get all booking */

export const getAllBooking = async (req,res)=> {
    try {
        const booking = await db.query(`SELECT * FROM booking`);
    
        res.status(200).json({
          status: "Success",
          message: "All bookings retrieved successfully",
          data: booking,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: "Failed",
          message: "Internal server error",
        });
      }
}

/* delete a booking */

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
  
    try {
      // First check if the booking exists
      const check = await db.query(`SELECT * FROM booking WHERE id = $1`, [id]);
  
      if (check.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
  
      // If it exists, delete it
      await db.query(`DELETE FROM booking WHERE id = $1`, [id]);
  
      res.status(200).json({
        status: "success",
        message: "Booking successfully deleted",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Failed",
        message: "Internal server error",
      });
    }
  };
  