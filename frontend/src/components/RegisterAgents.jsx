import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisterAgents = ({ setPopUp, setAgents }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      position: e.target.position.value,
      specialties: e.target.specialties.value,
      location: e.target.location.value,
      description: e.target.description.value,
      rating: e.target.rating.value,
      reviews: e.target.reviews.value,
      image: imageUrl
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/api/agent/register`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.status === "success") {
        alert("Agent registered successfully");
        setAgents(prev => [...prev, res.data.data]); 
        setPopUp(false);
        e.target.reset();
        setImageUrl("");
      }
      
    } catch (error) {
      console.error('Error creating agent:', error);
      setError(error.response?.data?.message || 'Failed to register agent');
    } finally {
      setLoading(false);
    }
  };

 

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Build Estate');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dz6pydmk6/image/upload',
        formData
      );
      setImageUrl(res.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-start justify-center p-4 overflow-y-auto">
  <div className="bg-white w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg relative">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Register New Agent</h2>
      <button 
        onClick={() => setPopUp(false)}
        className="text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>
    </div>

    {error && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          required
          className="w-full p-2 border rounded"
          placeholder="Agent's full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-2 border rounded"
          placeholder="Agent's email"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          required
          className="w-full p-2 border rounded"
          placeholder="Agent's phone number"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Role</label>
        <select
          name="position"
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Role</option>
          <option value="sales">Sales Agent</option>
          <option value="broker">Broker</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {/* Specialties */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Specialties</label>
        <input
          type="text"
          name="specialties"
          required
          className="w-full p-2 border rounded"
          placeholder="e.g., Luxury Homes, Commercial"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Location</label>
        <input
          type="text"
          name="location"
          required
          className="w-full p-2 border rounded"
          placeholder="Primary service area"
        />
      </div>
     

    {/* Rating */}
<div>
  <label className="block text-gray-700 text-sm font-bold mb-1">Rating</label>
  <input
    type="number"
    name="rating"
    required
    min="1"
    max="5"
    step="0.1"
    className="w-full p-2 border rounded"
    placeholder="Agent rating (e.g. 4.5)"
  />

</div>
 {/* Profile Photo */}
 <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Profile Photo</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
          accept="image/*"
        />
        {imageUrl && (
          <div className="mt-2">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="h-20 w-20 object-cover rounded"
            />
          </div>
        )}
      </div>
   {/* Reviews */}
<div className="md:col-span-2">
  <label className="block text-gray-700 text-sm font-bold mb-1">Reviews</label>
  <textarea
    name="reviews"
    rows="3"
    className="w-full p-2 border rounded"
    placeholder="Client reviews or feedback"
  ></textarea>
</div>
   

      {/* Bio */}
      <div className="md:col-span-2">
        <label className="block text-gray-700 text-sm font-bold mb-1">Bio</label>
        <textarea
          name="description"
          rows="3"
          className="w-full p-2 border rounded"
          placeholder="Agent's professional bio"
        ></textarea>
      </div>

     

      {/* Buttons */}
      <div className="md:col-span-2 flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => setPopUp(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Agent'}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default RegisterAgents;
