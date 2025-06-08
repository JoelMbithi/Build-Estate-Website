import React from 'react'
import { MdMessage, MdOutlineSecurity  } from "react-icons/md"; 
import { GiTechnoHeart } from "react-icons/gi";
import { TbPencilStar } from "react-icons/tb";


const Display2 = () => {
  return (
    <div className='container flex flex-col mx-auto gap-4 -mb-2 bg-slate-100 rounded'>
      <div className='flex flex-col px-10 py-4 gap-6'>
        <h1 className='text-purple-700 font-bold'>EHM, SO?</h1>
        <h2 className='text-2xl font-bold text-slate-600'>What we do</h2>
        <p className='text-slate-500'>Full-Service Agents, Modern Technology</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      <div className='bg-white flex flex-col items-center justify-center text-center gap-4 p-4 rounded shadow hover:shadow-md transition'>
  <div className='bg-purple-300 rounded-full p-3 mb-2 flex items-center justify-center'>
    <MdMessage className="text-3xl text-purple-600 " />
  </div>
  <h1 className='text-sm font-semibold text-slate-700'>Communication</h1>
  <p className='text-slate-500 text-xs p-2'> Our website lets you chat with agents, ask questions, and get updates quickly. Everything is in one place so you can stay informed and feel confident throughout the process.</p>
</div>

        <div className='bg-white flex flex-col items-center gap-4 justify-center text-center  p-4 rounded shadow hover:shadow-md transition'>
        <div className='bg-purple-300 rounded-full p-3 mb-2 flex items-center justify-center'>
          <MdOutlineSecurity className="text-3xl text-purple-600 mb-2" />
          </div>
          <h1 className='text-sm font-semibold text-slate-700'>Reliable</h1>
          <p className='text-slate-500 text-xs p-2'>You can count on us. Our platform is built to be reliable, giving you accurate listings, secure transactions, and a smooth experience every time you visit.</p>
         
        </div>

        <div className='bg-white flex flex-col items-center gap-4 justify-center text-center p-4 rounded shadow hover:shadow-md transition'>
        <div className='bg-purple-300 rounded-full p-3 mb-2 flex items-center justify-center'>
          <GiTechnoHeart className="text-3xl text-purple-600 mb-2" />
          </div>
          <h1 className='text-sm font-semibold text-slate-700'>Technology</h1>
          <p className='text-slate-500 text-xs p-2'>We use the latest technology to provide you with a smooth and efficient real estate search. From advanced search filters to virtual tours, our platform ensures that you can find the perfect property with ease, anytime and anywhere.</p>
        </div>

        <div className='bg-white flex flex-col items-center gap-4 justify-center text-center p-4 rounded shadow hover:shadow-md transition'>
        <div className='bg-purple-300 rounded-full p-3 mb-2 flex items-center justify-center'>
          <TbPencilStar className="text-3xl text-purple-600 mb-2" />
          </div>
          <h1 className='text-sm font-semibold text-slate-700'>Quality</h1>
          <p className='text-slate-500 text-xs p-2'>We are committed to offering high-quality listings that meet your standards, ensuring that every property is carefully vetted for accuracy and value. Our goal is to help you find the best options, hassle-free.</p>
          
        </div>
      </div>
    </div>
  );
}

export default Display2;
