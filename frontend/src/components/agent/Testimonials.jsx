import React, { useEffect } from "react"
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import newRequest from "../../utils/newRequest.js"

const TestimonialForm = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
 const [user, setUser] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.review) newErrors.review = "Review is required";
    if (rating === 0) newErrors.rating = "Please select a rating";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
   const fetchUser = async () => {
      try {
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
  
        const res = await newRequest.get(`/user/getUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
  console.log(res.data.data)
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          console.log("Error: Unable to fetch user data");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submit triggered");
      const isValid = validate();
      if (!isValid) return;
    
      setIsSubmitting(true);
      setError(null);
    
      try {
        const token = localStorage.getItem('token'); // your JWT token
    
        // Assuming user contains the userId after fetchUser() is called
        const userId = user._id;  // Or use user.id depending on your API response
    
        const reviewData = {
          name: formData.name,
          email: formData.email,
          rating,
          review: formData.review,
          user_id: userId,  // Add user_id to the data */
        };
    
        const response = await newRequest.post("/Testimonials/create", reviewData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log("Review submitted:", response.data);
        setIsSuccess(true);
        resetForm();
    
        // Close the form after displaying the success message for 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
    
      } catch (error) {
        console.error("Submission error:", error);
        setError(
          error.response?.data?.message || "Failed to submit review. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    };
    
    
    
  
  // Helper function to reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      review: ''
    });
    setRating(0);
  };
  


  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              Thank You!
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Your Review  has been submitted.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
              Leave a Review for Our Community
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rating
                </label>
                <div className="flex">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className="text-2xl mr-1"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      >
                        <FaStar
                          className={
                            ratingValue <= (hover || rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows="4"
                  value={formData.review}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.review && (
                  <p className="mt-1 text-sm text-red-600">{errors.review}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialForm;