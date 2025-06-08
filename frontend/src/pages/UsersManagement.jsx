import React, { useEffect, useState } from "react";
import { FiUsers, FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import newRequest from "../utils/newRequest";
import ConfirmationModal from "../components/ReusableConfirmPopUp";


const UserManagement = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [apartments, setApartments] = useState(null);
  const [apartmentCount, setApartmentCount] = useState(0);
  const [bookCount,setBookCount] = useState(0)
  const [books,setBooks]= useState(null)
  const [book, setBook] = useState([]);
  const {id} = useParams()

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);



  const fetchUser = async () => {
    const id = localStorage.getItem("userId");
    try {
      const res = await newRequest.get(`/user/getUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.data);
      setUsers(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooking = async () => {
    const id = localStorage.getItem("bookId");
    const token = localStorage.getItem("token");

    try {
      if (!id) {
        console.error("Booking ID is undefined. Cannot fetch booking.");
        return;
      }
      const res = await newRequest.get(
        `/booking/getAllBooking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      
      setBook(res.data.data.rows);
      const bookings = res.data.data.rows;
    setBook(bookings);
      setBookCount(bookings.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBooking();
  }, []);

  const fetchApartments = async () => {
    try {
      const res = await newRequest.get(`/apartment/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.apartments);
      setApartments(res.data.apartments);
      setApartmentCount(res.data.apartments.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleDeleteClick = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookingToDelete) return;
    
    try {
      const res = await newRequest.delete(`/booking/delete/${bookingToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Delete response:", res.data);
  
      // Update UI
      setBook((prev) => prev.filter((item) => item.id !== bookingToDelete));
      setBookCount((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    } finally {
      setShowConfirmModal(false);
      setBookingToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setBookingToDelete(null);
  };

 
  

  return (
    <div className="flex h-grow bg-gray-100">
      {/* Left sidebar */}
      <div className="bg-blue-950 text-white flex flex-col justify-evenly h-240 w-80">
        <div className="flex flex-col items-center justify-center h-80 bg-slate-700">
          <h1 className="text-4xl font-bold">Build Estate</h1>
        </div>

        <div className="text-white text-xl p-8 flex flex-col gap-4">
          <Link
            to="/admin"
            className="flex items-center p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiUsers className="mr-3" />
            User Management
          </Link>
          <Link
            to="/properties"
            className="flex items-center p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiHome className="mr-3" />
            Property Management
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiSettings className="mr-3" />
            Settings
          </Link>
        </div>

        <div className="p-4 border-t border-slate-700 mt-4">
          <button
            /* onClick={handleLogout} */
            className="flex items-center w-full p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1  mt-10 p-8 ">
        <div className="bg-white rounded-lg shadow  p-6">
          <h1 className="text-4xl font-bold">Admin Page</h1>

          {/* Single Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {users && users.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-blue-600 font-bold">Total Users</h1>
                <p className="font-bold">{count}</p>
              </div>
            )}

            { book && book.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
              <h1 className="text-purple-600 font-bold">Total Booking</h1>
              <p>{bookCount}</p>
            </div>
          )}
            <div className="flex flex-col p-4 rounded bg-slate-50">
              <h1 className="text-purple-600 font-bold">Completed Approvals</h1>
              <p>198</p>
            </div>
          </div>
        </div>
            
        {/* right section */}

        <div className="bg-white h-160 rounded-lg shadow p-6 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Room Occupancy</h1>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span>Active</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                <span>Occupied</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
                <span>Vacant</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                <span>Under Maintenance</span>
              </div>
            </div>
          </div>
          {/* table */}
          {apartments && (
            <div className="bg-slate-100 h-130 rounded-lg shadow p-6 mt-10 overflow-y-auto">
              <div className="overflow-x-auto shadow-md rounded-lg h-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occupant Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {book && book.length > 0 ? (
                      book.map((room, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {room?.room_number ?? "Room Number"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {room?.occupant ?? "Joe"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              {room.status === "occupied" && (
                                <>
                                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                                  <span>Occupied</span>
                                </>
                              )}
                              {room.status === "vacant" && (
                                <>
                                  <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
                                  <span>Vacant</span>
                                </>
                              )}
                              {room.status === "under_maintenance" && (
                                <>
                                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                                  <span>Under Maintenance</span>
                                </>
                              )}
                              {room.status === "active" && (
                                <>
                                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                  <span>Active</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {room?.type ?? "Rental"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {room?.location ?? "Location"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900"
                             
                              >
                                
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900"
                             onClick={() => handleDeleteClick(room.id)}
                              >
                                Delete
                              </button>
                            </div>
                            <div className="flex h-grow bg-gray-100">
      {/* ... existing JSX ... */}
      
      {/* Add this near the end of your component */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this booking?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          101
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Joe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            <span>Active</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rental
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Location
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
