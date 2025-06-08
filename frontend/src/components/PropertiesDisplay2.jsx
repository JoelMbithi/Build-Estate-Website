import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";
import { RiMenu4Line } from "react-icons/ri";
import { BiSolidBuildingHouse } from "react-icons/bi";
import axios from "axios";
import newRequest from "../utils/newRequest";

const PropertiesDisplay2 = () => {
  const [popUp, setPopUp] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Added state for imageUrl

  const fetchApartments = async () => {
    try {
      const res = await newRequest.get(`/apartment/get`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      console.log("Full API response:", res.data);
      
      if (res.data && Array.isArray(res.data.apartments)) {
        setApartments(res.data.apartments);
      } else {
        setError("Unexpected data format from API");
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setError("Failed to load apartments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // If image was uploaded to Cloudinary, add its URL to FormData
    if (imageUrl) {
      formData.append("imageUrl", imageUrl); // Append Cloudinary URL
    }
  
    try {
      const response = await newRequest.post(
        `/apartment/add`,
        formData, // Send FormData directly (not as JSON)
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            // Let Axios set Content-Type automatically (for FormData)
          },
        }
      );
     
      if (response.data.success) {
        alert("Apartment created successfully");
        setApartments((prev) => [...prev, response.data.apartment]);
      }
      setPopUp(false);
      e.target.reset();
      setImageUrl("");
    } catch (error) {
      console.error('Error creating apartment:', error);
      alert(error.response?.data?.message || 'Failed to create apartment');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Build Estate');

      try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dz6pydmk6/image/upload', formData);
        const uploadedImageUrl = res.data.secure_url;
        console.log('Image uploaded to Cloudinary:', uploadedImageUrl);
        setImageUrl(uploadedImageUrl); // Update image URL in state
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading properties...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  
  return (
    <div className="flex flex-col min-h-screen bg-white shadow">
      {/* Header and Add Property button */}
      <div className="flex items-center justify-between p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">Properties</h1>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          onClick={() => setPopUp(true)}
        >
          Add New Property
        </button>
      </div>

      {/* Property listings header */}
      <div className="flex flex-col p-4 px-10">
        <h1 className="text-purple-700 text-2xl font-bold">
          LATEST <span className="font-bold text-black">PROPERTIES</span>
        </h1>
        <p>
          Listing <span className="font-bold">Properties</span> by{" "}
          <span className="text-purple-700">location </span>or properties near you
        </p>
      </div>

      {/* Property grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {apartments.length > 0 ? (
          apartments.map((apartment) => (
            <div 
              key={apartment.apartments_id} 
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Property Image */}
              <div className="h-48 bg-gray-200 relative">
                {apartment.image && (
                  <img 
                    src={apartment.image} 
                    alt={apartment.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "path/to/default-image.jpg";
                    }}
                  />
                )}
                <div className="absolute top-2 left-2 flex gap-2">
                  <div className="bg-red-600 p-2 rounded-full">
                    <BiSolidBuildingHouse className="text-white" />
                  </div>
                  <div className="bg-pink-950 px-2 py-1 rounded-full text-white text-xs font-semibold">
                  {apartment.type}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-800 mb-1">{apartment.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaLocationDot className="text-red-500 mr-1" />
                  <span>{apartment.location}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {apartment.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <TiHeartFullOutline className="text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <RiMenu4Line className="text-gray-700" />
                    </button>
                  </div>
                  <span className="font-bold text-red-600">${apartment.price}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No properties found</p>
          </div>
        )}
      </div>

      {/* Add Property Popup */}
      {popUp && (
        <div className="fixed top-20 left-150 w-100 bg-slate-100 flex items-center justify-center z-50">
          <div className="bg-white h-full w-full p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Property</h2>

            <form action="" onSubmit={handleSubmit} className="overflow-y-auto h-100 scroll">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="propertyName"
                >
                  Property Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter property name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="propertyType"
                >
                  Select Type
                </label>
                <select
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="type"
                  required
                >
                  <option value="">-- Select Property Type --</option>
                  <option value="apartment">Apartment</option>
                  <option value="rental">Rental</option>
                  <option value="hotel">Hotel</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="propertyName"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter location"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="propertyName"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  required
                  id="price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the price"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the property description"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Property Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageUpload}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPopUp(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesDisplay2;
