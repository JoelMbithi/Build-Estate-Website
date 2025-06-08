import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebook, FaInstagram, FaLinkedin
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { useParams } from "react-router-dom";
import emailjs from 'emailjs-com';
import { emailjsConfig } from '../config/emailjs.js';



const ContactPage = ({onClose,agent}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      const [message,setMessage] = useState(null)
      const { id: agentId } = useParams()
      const formRef = useRef();


     /*  const fetchMessage = async() =>{
        
        try {
          const res = await newRequest.get(`/message/messages/${agentId}`)
          console.log(res.data.data)
          setMessage(res.data.data)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        fetchMessage()
      },[agentId]) */


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
      };    
      console.log(agent)

     
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // 1. Validate form data
          if (!formData.name || !formData.email || !formData.message) {
            throw new Error('Please fill all required fields');
          }
      
          // 2. Send email using EmailJS
          const response = await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig. agentTemplateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              to_name: agent?.name || 'Agent',
              to_email: agent?.email || 'joellembithi@gmail.com',
              message: formData.message,
              phone: formData.phone || 'Not provided',
              reply_to: formData.email
            },
            emailjsConfig.publicKey
          );
      
          alert('Message sent successfully!');
          onClose();  // Use the onClose prop passed from parent
          
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
      
        } catch (error) {
          console.error('Email submission failed:', {
            error: error.message,
            stack: error.stack,
            formData: formData,
            config: emailjsConfig
          });
          
          alert(`Failed to send message: ${error.message}`);
        }
      };


  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  const position = [1.2921, 36.8219]; // Nairobi, Kenya

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-100 px-4 py-10">
      {/* Header */}
      <div className="relative mb-12">
  {/* Close Button */}
  <button
    className="absolute top-0 right-0 bg-slate-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold hover:bg-slate-300"
    onClick={onClose}
  >
    X
  </button>

  {/* Header Text */}
  <div className="text-center">
    <h1 className="text-5xl font-bold text-blue-700 mb-4">Let's Connect</h1>
    <p className="text-lg text-gray-600">
      Reach out today for expert real estate guidance.
    </p>
  </div>
</div>

      

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Form */}
      
          <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="How can I help you?"
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-lg transition"
            >
              Submit
            </button>
          </form>
        </div>
      

        {/* Contact Info */}
           {agent && (
             <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between">
             <div>
               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Details</h2>
               <div className="flex items-center gap-4 mb-6">
         <img
           src={agent.image || "joe"}
           alt="Agent"
           className="w-20 h-20 rounded-full object-cover shadow-md"
         />
         <div>
           <h3 className="text-xl font-bold text-gray-800">{agent.name || "Joel Mbithi"}</h3>
           <p className="text-sm text-gray-600">{agent.position || "Senior"} Real Estate Consultant</p>
         </div>
       </div>
               <div className="space-y-5 mb-6">
                 <div className="flex items-center gap-3">
                   <FaPhone className="text-blue-600 text-xl" />
                   <a href="tel:+1234567890" className="text-gray-700 hover:text-blue-600">
                     {agent.phone || "(123) 456-7890"}
                   </a>
                 </div>
                 <div className="flex items-center gap-3">
                   <FaEnvelope className="text-blue-600 text-xl" />
                   <a href="mailto:agent@example.com" className="text-gray-700 hover:text-blue-600">
                    {agent.email || "joellembithi@gmail.com"}
                   </a>
                 </div>
                 <div className="flex items-start gap-3">
                   <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                   <p className="text-gray-700 leading-tight">
                     123 Real Estate Ave,<br /> {agent.location || "Suite 100, Nairobi, Kenya"}
                   </p>
                 </div>
               </div> 
               
   
   
               {/* Socials */}
               <div className="flex gap-4 text-2xl mb-6">
                 <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                   <FaFacebook />
                 </a>
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-500 hover:text-pink-700">
                   <FaInstagram />
                 </a>
                 <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-800 hover:text-blue-900">
                   <FaLinkedin />
                 </a>
               </div>
             </div>
   
             {/* Map */}
             <div className="h-48 mt-4 rounded-lg overflow-hidden border">
               <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                 <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                 <Marker position={position}>
                   <Popup>Our Office — Nairobi, Kenya</Popup>
                 </Marker>
               </MapContainer>
             </div>
           </div>
           )}
      </div>

      {/* Testimonial */}
      <div className="max-w-4xl mx-auto mt-12 bg-white border-l-4 border-blue-600 p-6 rounded-xl shadow-md">
        <blockquote className="text-gray-700 italic">
          "Working with Joel was a seamless experience. He sold our house above asking price in less than a week!"
          <cite className="block mt-3 not-italic font-bold text-blue-700">— Happy Client</cite>
        </blockquote>
      </div>
    </div>
  );
};

export default ContactPage;
