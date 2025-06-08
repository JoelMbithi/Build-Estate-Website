import React, { useEffect, useState } from "react";
import { FiUsers, FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiShieldUserLine } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import newRequest from "../utils/newRequest";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const [apartments, setApartments] = useState(null);
  const [apartmentCount, setApartmentCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState([]);
  const [userChartData, setUserChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewCount, setReviewCount] = useState(null);
  const [agents, setAgents] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await newRequest.get("/Testimonials/reviews");
      console.log("Response data:", res.data); // Log the data

      setReviewCount(res.data.data);
    } catch (error) {
      console.log("Error fetching user reviews:", error);
    }
  };

  const fetchAgents = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await newRequest.get("/agent/allAgents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      setAgents(res.data.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setError("Failed to load agents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await newRequest.get(`/user/getUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      /*   console.log(res.data.data) */
      setUser(res.data.data);
      setCount(res.data.count);
      setUserChartData(getUsersByMonth(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchReviews();
    fetchAgents();
  }, []);

  const fetchApartments = async () => {
    try {
      const res = await newRequest.get(`/apartment/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      /* console.log(res.data.apartments) */
      setApartments(res.data.apartments);
      setApartmentCount(res.data.apartments.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchBooking = async () => {
    const id = localStorage.getItem("bookId");
    const token = localStorage.getItem("token");

    try {
      if (!id) {
        console.error("Booking ID is undefined. Cannot fetch booking.");
        return;
      }
      const res = await newRequest.get(`/booking/getAllBooking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    fetchBooking();
  }, []);

  const getUsersByMonth = (userList) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyCount = {};

    // Initialize all months with 0
    months.forEach((month) => {
      monthlyCount[month] = 0;
    });

    userList.forEach((user) => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString("default", { month: "short" }); // "Jan", "Feb", etc.
      monthlyCount[month]++;
    });

    // Convert to array suitable for BarChart
    const result = months.map((month) => ({
      month,
      users: monthlyCount[month],
    }));

    return result;
  };

  return (
    <div className="flex h-grow bg-gray-100 font-sans">
      {/* Left sidebar */}
      <div className="bg-blue-950 text-white flex flex-col justify-evenly h-240 w-80">
        <div className="flex flex-col items-center justify-center h-80 bg-slate-700">
          <h1 className="text-4xl font-bold">Build Estate</h1>
        </div>

        <div className="text-white text-xl  p-8 mt-4">
          <Link
            to="/admin"
            className="flex items-center  p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center p-3 mt-4 rounded hover:bg-slate-700 transition-colors"
          >
            <FiUsers className="mr-3" />
            User Management
          </Link>
          <Link
            to="/properties"
            className="flex items-center p-1 mt-4  rounded hover:bg-slate-700 transition-colors"
          >
            <HiOutlineUserGroup className="mr-3" />
            Property Management
          </Link>
          <Link
            to="/AdminAgent"
            className="flex items-center p-3 mt-4  rounded hover:bg-slate-700 transition-colors"
          >
            <RiShieldUserLine className="mr-3" />
            Agents Management
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center p-3 mt-4  rounded hover:bg-slate-700 transition-colors"
          >
            <FiSettings className="mr-3" />
            Settings
          </Link>
        </div>

        <div className="p-4 border-t border-slate-700 mt-30">
          <button
            /* onClick={handleLogout} */
            className="flex items-center w-full p-3 rounded hover:bg-slate-700 transition-colors"
          >
            <FiLogOut className="mr-3 " />
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
            {/* Users */}
            {user && user.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-blue-600 font-bold">Total Users</h1>
                <p className="font-bold">{count}</p>
              </div>
            )}

            {/* Apartments */}
            {apartments && apartments.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-green-600 font-bold">Total Properties</h1>
                <p>{apartmentCount}</p>
              </div>
            )}

            <div className="flex flex-col p-4 rounded bg-slate-50">
              <h1 className="text-purple-600 font-bold">Pending Approvals</h1>
              <p>198</p>
            </div>

            {/* Booking */}
            {book && book.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-purple-600 font-bold">Total Booking</h1>
                <p>{bookCount}</p>
              </div>
            )}

            {/* Reviews */}
            {reviewCount && reviewCount.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-orange-600 font-bold">Total Reviews</h1>
                <p>{reviewCount.length}</p> {/* Displays the count */}
              </div>
            )}

            {/* Agents */}
            {agents && agents.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-red-600 font-bold">Total Agents</h1>
                <p>{agents.length}</p> {/* Displays the count */}
              </div>
            )}
          </div>
        </div>
        {/* Graph section */}

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">User Growth</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userChartData} barCategoryGap={20} barGap={5}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Admin;
