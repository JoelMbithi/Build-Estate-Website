
import db from "../utils/db.js"


/* create a review */

export const createReview = async (req, res) => {
  const { rating, review, name, email } = req.body;
  const user_id = req.userId;

  console.log("Inside createReview - userId from token:", user_id); // ✅ Log this

  if (!name || !email || !rating || !review) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const reviews = await db.query(
      `INSERT INTO testimonials (user_id, name, email, rating, review) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, name, email, rating, review]
    );

    const newReview = reviews.rows[0];
    res.status(201).json({
      success: true,
      message: "Successfully created a review",
      data: newReview
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




/* get a single review */
export const getReview = async (req, res) => {
  const user_id = req.userId; // ✅ get from token

  try {
      const review = await db.query(
          `SELECT id, rating, review, created_at
           FROM testimonials 
           WHERE user_id = $1`,
          [user_id]
      );

      if (review.rows.length === 0) {
          return res.status(404).json({
              status: "error",
              message: "No reviews found for this user"
          });
      }

      res.status(200).json({
          status: "success",
          message: "Review(s) retrieved successfully",
          data: {
              reviews: review.rows
          }
      });

  } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({
          status: "error",
          message: "Server error"
      });
  }
};

   



/* get all reviews */
export const allReviews = async (req, res) => {
    try {
        const reviews = await db.query(
            `SELECT t.id, t.rating, t.review, t.created_at,
                    r.user_id, r.name, r.email, r.country, r.phone , r.image
             FROM testimonials t
             JOIN Reg r ON t.user_id = r.user_id`
        );

        res.status(200).json({
            success: true,
            message: "All reviews retrieved successfully",
            data: reviews.rows
        });
    } catch (error) {
        console.error("Fetch reviews error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
