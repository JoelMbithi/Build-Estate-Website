import React, { Profiler } from 'react'
import "./App.css"
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Properties from './pages/Properties'
import Profile from './pages/Profile'
import Users from "./pages/UsersManagement"; 
import BookingDisplay from "./pages/BookingDisplay"
import Agents from './pages/Agents'
import AdminAgentManagement from './pages/AdminAgentManagement'
import OverView from './pages/OverView'
import Sales from "./pages/Sales"

const App = () => {
  return (
    <div>
      <NavBar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="users" element={<Users />} />
        <Route path="/booking" element={<BookingDisplay/>}/>
        <Route path="/properties" element={<Properties/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/agents' element={<Agents/>}/>
        <Route path='/AdminAgent' element={<AdminAgentManagement/>}/>
        <Route path ="/overView" element={<OverView/>} />
        <Route path ="/sales" element={<Sales/>} />
       </Routes>
      <Footer />
      
    </div>
  )
}

export default App
