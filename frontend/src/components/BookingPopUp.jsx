import React, { useEffect, useState } from "react";
import axios from "axios";
import newRequest from "../utils/newRequest";

const BookingPopUp = ({
  handleSubmit,
  setPopUp,
  handleCountryChange,
  country,
  apartments_id,
}) => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApartments = async () => {
    if (!apartments_id) return;

    try {
      setIsLoading(true);
      const res = await newRequest.get(
        `/apartment/getSingleApartment/${apartments_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data.apartment); // note: it's `apartment`, not `apartments`
      setApartments(res.data.apartment);
    } catch (error) {
      console.error("Error fetching apartment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">
            {apartments.name || "Booking Apartment"}
          </h2>
          {/* Booking form */}
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1">Room Number:</label>
              <input
                name="room_number"
                type="number"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Occupant Name:</label>
              <input
                name="occupant"
                type="text"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Status:</label>
              <select
                name="status"
                id="status"
                className="border rounded p-2 w-full"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="occupied">Occupied</option>
                <option value="vacant">Vacant</option>
                <option value="under_maintenance">Under Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Type:</label>

              {apartments.type ? (
               <input
               name="type"
               type="text"
               className="w-full p-2 border rounded"
               value={apartments.type || ""}
               readOnly={!!apartments.type}
             />
             
              ) : (
                <input
                  name="type"
                  type="text"
                  className="w-full p-2 border rounded"
                  required
                />
              )}
            </div>

            <div>
            <label className="block font-medium mb-1">Price:</label>
{apartments.price ? (
  <input
    name="price"  // Correct name for price field
    type="number"
    className="w-full p-2 border rounded"
    value={apartments.price || ""}  // Ensure price is set as value
    readOnly={true}  // Set it as readonly if price exists
  />
) : (
  <input
    name="price"  // Correct name for price field
    type="number"
    className="w-full p-2 border rounded"
    required
    placeholder="Enter Price"  // Provide a placeholder in case price is missing
  />
)}



            </div>

            <div>
              <label htmlFor="country" className="block font-medium mb-1">
                Location
              </label>

              {apartments.location ? (
               <input
               name="location"
               type="text"
               className="w-full p-2 border rounded"
               value={apartments.location || ""}
               readOnly={!!apartments.location}
             />
             
              ) : (
                <>
                  <select
                    id="country"
                    className="w-full p-2 border rounded"
                    name="location"
                    required
                    onChange={handleCountryChange}
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="KE">Kenya</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="NG">Nigeria</option>
                    <option value="ZA">South Africa</option>
                    <option value="IN">India</option>
                    <option value="AU">Australia</option>
                  </select>

                  {country === "KE" && (
                    <div>
                      <label className="block font-medium mb-1">County:</label>
                      <select
                        name="county"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select a county</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Kisumu">Kisumu</option>
                      </select>
                    </div>
                  )}

                  {country === "UK" && (
                    <div>
                      <label className="block font-medium mb-1">Region:</label>
                      <select
                        name="region"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select a region</option>
                        <option value="England">England</option>
                        <option value="Scotland">Scotland</option>
                        <option value="Wales">Wales</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setPopUp(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPopUp;
