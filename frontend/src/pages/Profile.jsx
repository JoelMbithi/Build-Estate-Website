import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";
import newRequest from "../utils/newRequest";

const Profile = () => {
  const [user,setUser] = useState({
    name:'',
    email:'',
    role:'',
    phone:'',
    country:'',
    password:'',
  })
  

  const fetchUser = async () => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      const res = await newRequest.get(`/user/getUser/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`

        }
      })
      console.log("User data", res.data);
      if (res.data.success) {
        setUser(res.data.data);  
      } else {
        console.log("Error: Unable to fetch user data");
      } 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  },[])


  const handleUpdate = async (e) => {
    e.preventDefault()
    const id = localStorage.getItem("userId")
    try {
      const res = await newRequest.put(`/user/updateUser/${id}`,user,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log("User data", res.data);
      alert('Profile updated!')
      if (res.data.success) {
        setUser(res.data.data);  
      }
      else {
        console.log("Error: Unable to fetch user data");
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-20">
        <h1 className="font-bold p-2 text-2xl">Account Information</h1>
        {user && (
          <div className="bg-white sm:w-100 shadow-md rounded-lg p-6 lg:w-300 ">
          {/* profile image */}
          <div className="flex justify-center top-0 left-0 lg:mr-200 mb-6">
            <img
              src={user.image || ""}
              alt="Profile"
              className="w-24 h-24 rounded-full bg-gray-200"
            />
          </div>

          {/* form to contain information */}
          <form action="" onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Column */}
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 mb-1">
                 FullName
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={user.name || "Joe Mbithi"}
                    onChange={(e) => setUser({...user,name:e.target.value})}
                    placeholder={user.name}
                    className="border rounded w-full py-2 px-3"
                  />
                  <TiUserOutline className="absolute text-xl sm:left-80 lg:left-130 top-3 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 mb-1">
                  Role
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="role"
                    value={user.role || "user"}
                    onChange={(e) => setUser({...user,role:e.target.value})}
                    placeholder="your role"
                    className="border rounded w-full py-2 px-3"
                  />
                  <TiUserOutline className="absolute text-xl sm:left-80 lg:left-130 top-3 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-1 fon  text-green-500 sm:ml-70 lg:ml-115 ">
                  <MdVerified className="text-xl" />
                  <p>verified</p>
                </div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser ({...user,email:e.target.value})}
                    placeholder={user.email || "joellembithi@gmail.com"}
                    className="border rounded w-full py-2 px-3 pl-10" // Added pl-10 for icon spacing
                  />
                  <MdOutlineEmail className="absolute sm:left-80 lg:left-130 top-3 text-gray-400" />
                </div>
              </div>

              {/* Second Column */}
              <div className="mb-4">
                <div className="flex items-center gap-1 fon  text-green-500 sm:ml-70 lg:ml-115 ">
                  <MdVerified className="text-xl" />
                  <p>verified</p>
                </div>
                <label htmlFor="phone" className="block text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser({ ... user,phone:e.target.value})}
                    placeholder={user.phone || "0743861565"}
                    className="border rounded w-full py-2 px-3"
                  />
                  <FiPhoneCall className="absolute sm:left-80 lg:left-130 top-3 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({...user,password:e.target.value})}
                  placeholder="password"
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="country" className="block text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  value={user.country || "Select a country"}
                  onChange={(e) => setUser({ ...user,country:e.target.value})}
                  className="border rounded w-full py-2 px-3 bg-white"
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
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition duration-200"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
