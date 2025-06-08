import React, { useEffect, useState } from "react";
import { FiUsers, FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import newRequest from "../utils/newRequest";

const UserManagement = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [apartments, setApartments] = useState(null);

  const [apartmentCount, setApartmentCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState([]);
  const [popUp,setPopUp] = useState(false)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setPopUp(!popUp)

 }

 const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  setUser(null);
  setIsOpen(false);
  navigate('/');
};

  const fetchUser = async () => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const res = await newRequest.get(`/user/getUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.data);
      setUsers(res.data.data);
      setCount(res.data.count);

      /* get A single user */
      const response = await newRequest.get(`/user/getUser/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.data)
      setUser(response.data.data)
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

      /* Fetching single Booking */
      const response = await newRequest.get(
        `/booking/getBooking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(response.data.booking);
      setBook(response.data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApartments = async () => {
    const id = localStorage.getItem("bookId");
    const token = localStorage.getItem("token");
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
    fetchUser();
    fetchBooking();
  }, []);

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      // Fallback behavior
      window.history.back(); // or other navigation
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Send the payment details to the server
      const response = await newRequest.post("/pay", {
        phone,
        amount,
      });

      if (response.data.status === "success") {
        setSuccess("Payment initiated successfully. Please check your phone.");
      } else {
        setError("Failed to initiate payment.");
      }
    } catch (err) {
      setError("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-grow bg-gray-100">
      {/* Left sidebar */}
      <div className="bg-blue-950 text-white flex flex-col justify-evenly h-screen w-30">
        
      {user &&  (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="w-20 h-20  mt-20 bg-slate-300 p-2 rounded-full flex items-center justify-center">
            <img className="rounded-full scale-down bg-blend-color" src={user.image} alt="" />
          </div>
          <h1 className="text-center font-bold">{user.name ? user.name.split(' ')[0] : "User"}</h1>

        </div>
      )}
        <div className="flex flex-col items-center ">
          <div className="text-white text-lg p-4 flex flex-col gap-2 h-full">
            {/* Logo/Header (optional) */}

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 ">
              <Link
                to="/"
                className="flex items-center px-3 py-3  rounded-2xl "
              >
                <FiHome className="mr-3 text-xl " />
               
              </Link>

              <Link
                to="/agents"
                className="flex items-center px-3 py-3  rounded-2xl "
              >
                <FiUsers className="mr-3 text-xl " />
              </Link>

              {/* Spacer to push settings to bottom */}
              <div className=""></div>

              <Link
                to="/profile"
                className="flex items-center px-3 py-3   "
              >
                <FiSettings className="mr-3 text-xl " />
              </Link>
            </nav>
          </div>

          <div className="p-4  border-slate-700 mt-4">
          
               <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-gray-100'>
               <FiLogOut className="mr-3 text-xl" />
          </button>
              
           
          </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1  mt-10 p-8 ">
        <div className="bg-white rounded-lg shadow  p-6">
          <h1 className="text-4xl font-bold">Booking Information</h1>

          {/* Single Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {users && users.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-blue-600 font-bold">Total Users</h1>
                <p className="font-bold">{count}</p>
              </div>
            )}

            {book && book.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-purple-600 font-bold">Total Booking</h1>
                <p>{bookCount}</p>
              </div>
            )}
            <div className="flex flex-col p-4 rounded bg-slate-50">
              <h1 className="text-green-600 font-bold">Completed Booking</h1>
              <p>198</p>
            </div>
          </div>
        </div>

        {/* right section */}

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* User Details */}
         {user && (
           <div className="flex flex-col p-4 rounded bg-slate-50 flex-grow shadow-md">
           <h1 className="text-blue-600 font-bold mb-4">User Details</h1>

           <div className="flex flex-col rounded bg-white p-4">
             <div className="flex flex-row gap-2 mb-2">
               <label className="font-semibold">User:</label>
               <p>{user.name || "joe"}</p>
             </div>
             <div className="flex flex-row gap-2 mb-2">
               <label className="font-semibold">Email:</label>
               <p>{user.email ||"joellembithi@gmail.com"}</p>
             </div>
             <div className="flex flex-row gap-2 mb-2">
               <label className="font-semibold">Phone Number:</label>
               <p>{user.phone || "0743861565"}</p>
             </div>
             <div className="flex flex-row gap-2">
               <label className="font-semibold">Location:</label>
               <p>{user.location || "Kenya"}</p>
             </div>
           </div>
         </div>
         )}

          {/* Room Information */}
          {book && (
            <div className="flex flex-col p-4 rounded bg-slate-50 flex-grow shadow-md">
              <h1 className="text-blue-600 font-bold mb-4">Room Details</h1>

              <div className="flex flex-col rounded bg-white p-4">
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Room Number:</label>
                  <p>{book.room_number}</p>
                </div>
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Room Name:</label>
                  <p>{book.type}</p>
                </div>
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Occupant Name:</label>
                  <p>{book.occupant}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <label className="font-semibold">Location:</label>
                  <p>{book.location}</p>
                </div>
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Price:</label>
                  <p>$ {book.price || "2638600"}</p>
                </div>
                
                {/* buttons */}
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center mt-5 justify-center gap-2 mb-2">
                    <button className="bg-red-700 mt-5 p-2 rounded text-white hover:bg-red-800 " 
                    onClick={handleClose} 
                    >
                      Cancel Booking
                    </button>
                  </div>
                  
                  
                    <div className="flex flex-row items-center mt-5 justify-center gap-2 mb-2">
                   
                    <button className="bg-blue-700 mt-5 p-2 rounded text-white hover:bg-blue-800"
                    onClick={toggleDropdown}
                    >
                      Complete Booking
                    </button>
                   
                  </div>
                  {/* popup for payment */}
                  {popUp && (
                   
                   <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <div className="flex flex-row gap-4 justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-center">Payment Details</h2>
        <p className="cursor-pointer text-xl font-bold p-1" onClick={handleClose}>X</p>
        </div>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded" placeholder="Enter your name" />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded" placeholder="Enter phone number" />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded" placeholder="Enter amount" />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded" placeholder="Enter email" />
          </div>

          {loading ? (
            <div className="text-center text-blue-500">Processing Payment...</div>
          ) : (
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200">Pay Now</button>
          )}

          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mt-4 text-green-500 text-center">{success}</div>}
        </form>
      </div>
    </div>
                    
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
