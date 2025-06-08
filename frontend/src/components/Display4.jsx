import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingPopUp from "./BookingPopUp";
import newRequest from "../utils/newRequest";

const Display4 = () => {
  const [apartments, setApartments] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true for initial load
  const [country, setCountry] = useState("");

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-48 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  );

  const fetchApartments = async () => {
    try {
      setIsLoading(true);
      const res = await newRequest.get(`/apartment/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApartments(res.data.apartments);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await newRequest.post(`/booking/book`, data);

      if (res.data?.booking) {
        const booking = res.data.booking;
        setRoom(booking);
        
        // Save to localStorage
        localStorage.setItem('bookId', booking.id || '');
        localStorage.setItem('bookRoomNumber', booking.room_number || '');
        localStorage.setItem('bookOccupantName', booking.occupant || '');
        localStorage.setItem('bookStatus', booking.status || '');
        localStorage.setItem('bookType', booking.type || '');
        localStorage.setItem('bookLocation', booking.location || '');
        
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }

        alert(res.data.message || "Room successfully Booked");
        setPopUp(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to book the room. Please try again.");
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="container flex flex-col bg-slate-50 rounded mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 px-10">
        <p className="font-bold text-purple-600">Come Now!</p>
        <h1 className="text-4xl text-slate-600 font-bold">Live Who You Are.</h1>
        <p className="text-slate-500">Own the home meant for you</p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : apartments.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {apartments.map((apartment) => (
            <div
              key={apartment.apartments_id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={apartment.image}
                alt="Apartment"
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <h1 className="text-xl font-bold text-slate-700">
                    {apartment.name}
                  </h1>
                  <p className="text-slate-500">{apartment.location}</p>
                  <p className="text-purple-600 font-bold mt-2">
                    ${apartment.price}/month
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setRoom(apartment.apartments_id);
                      setPopUp(true);
                    }}
                    className="bg-slate-200 rounded shadow text-slate-700 mt-4 p-2 font-bold hover:text-purple-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 py-10">No apartments available</p>
      )}

      {popUp && (
        <BookingPopUp
          handleSubmit={handleSubmit}
          setPopUp={setPopUp}
          handleCountryChange={handleCountryChange}
          country={country}
          apartments_id={room}
        />
      )}
    </div>
  );
};

export default Display4;