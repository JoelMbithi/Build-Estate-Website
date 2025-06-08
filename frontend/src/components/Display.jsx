import React from 'react';
import image from "../assets/build.png";
import { FaGoogle, FaHotel, FaCampground, FaMicrosoft, FaAmazon } from 'react-icons/fa';


const Display = () => {
  return (
    <div className='flex flex-col mt-11'>
      <div 
      className="relative h-94  w-[97%] rounded m-4 mr-4 bg-cover bg-center flex  items-center justify-center text-white" 
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute  inset-0  bg-opacity-40 rounded" />
     <div className='flex flex-col w-full'>
     <div className='flex flex-col items-center justify-center'>
     <h1 className="text-3xl lg:text-5xl relative  font-bold z-10 text-white text-center">
        Let's find a home <br /> that's perfect for you
      </h1>
      <p className='text text-black p-4'>search confidently with your trusted source of homes for sale or rent</p>
</div>


      {/* Search Input */}
      <div className='w-full'>
      <div className="flex items-center bg-white rounded-md w-full max-w-2xl mx-auto">
  <input
    type="text"
    placeholder="Enter an address, neighborhood, city, or ZIP code"
    className="flex-1 px-4 py-2 text-gray-800 outline-none truncate"
  />
  <button className="bg-blue-700 text-white px-3 mr-1 py-1 rounded hover:bg-blue-800 transition">
    Search
  </button>
</div>

</div>



     
     </div>
    
    </div>
    <div  className="flex flex-col p-4">
  <div className='flex text-center justify-center items-center'>
    <p className='text-slate-400 text-sm'>Trusted by 20,000+ companies</p>
  </div>

  
  <div className="flex flex-row justify-evenly gap-4 mt-4">
  <div className="flex items-center gap-2">
    <FaGoogle className="text-[#4285F4] " />
    <h1 className='font-bold text-slate-600'>Google</h1>
  </div>
  <div className="flex items-center gap-2">
    <FaHotel className="text-[#003580] " />
    <h1 className='font-bold text-slate-600'>Booking.com</h1>
  </div>
  <div className="flex items-center gap-2">
    <FaCampground className="text-[#6bbd6d] " />
    <h1 className='font-bold text-slate-600'>Basecamp</h1>
  </div>
  <div className="flex items-center gap-2">
    <FaMicrosoft className="text-[#0078D4] " />
    <h1 className='font-bold text-slate-600'>Microsoft</h1>
  </div>
  <div className="flex items-center gap-2">
    <FaAmazon className="text-[#FF9900] " />
    <h1 className='font-bold text-slate-600'>Amazon</h1>
  </div>

  
</div>
<hr className='text-xl mt-10 text-slate-400' />
  </div>
</div>
   
    
  );
};

export default Display;
