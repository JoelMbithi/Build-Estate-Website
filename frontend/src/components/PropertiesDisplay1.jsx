import React from 'react'
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FaHome } from 'react-icons/fa';
import { PiBuildingsBold } from 'react-icons/pi';
import { FaBuilding } from 'react-icons/fa';
import { GiFamilyHouse } from 'react-icons/gi';


const PropertiesDisplay1 = () => {
  return (
    <div className='flex flex-col items-center  justify-center mt-12'>
      <div 
        className="relative h-120 w-[97%] rounded m-4 mr-4 bg-cover bg-center flex items-center justify-center text-white" 
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60)` }}
      >
        <div className='flex flex-col p-4  gap-6'>
          <p className='text-xs text-center '>  PROPERTIES FOR SALE & FOR RENT AROUND THE WORLD</p>          
          <h1 className='text-4xl'>Search and find Your <span className='text-red-600'>Family House</span></h1>
          <div className='bg-white rounded-md w-full max-w-2xl mx-auto flex items-center'>
            <button className="bg-blue-700 text-white px-3 mr-1 py-2  hover:bg-blue-800 transition">
              Search
            </button>
            <input
              type="text"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              className="flex-1 px-4 py-2 text-gray-800 outline-none truncate"
            />

          </div>
          <div className='text-center p-4'>
            <p>browse more properties types</p>
          </div>
          <div className='flex flex-row justify-evenly w-full gap-4 mt-10'>
          <div className='flex flex-col items-center'>
            <div className='bg-[rgba(19,17,17,0.69)] rounded p-4'>
                <HiOutlineOfficeBuilding size={70} className='text-white'/>
            </div>
            <span className='mt-2 text-lg font-semibold text-white'>Condo</span>
            </div>
                  
            <div className='flex flex-col items-center'>
            <div className='bg-[rgba(19,17,17,0.69)] rounded p-4'>
                <FaHome  size={70} className='text-white'/>
            </div>
            <span className='mt-2 text-lg font-semibold text-white'>Family House</span>
            </div>
            <div className='flex flex-col items-center'>
            <div className='bg-[rgba(19,17,17,0.69)] rounded p-4'>
                <FaBuilding size={70} className='text-white'/>
            </div>
            <span className='mt-2 text-lg font-semibold text-white'>Modern Villa</span>
            </div>
            <div className='flex flex-col items-center'>
            <div className='bg-[rgba(19,17,17,0.69)] rounded p-4'>
                <GiFamilyHouse size={70} className='text-white'/>
            </div>
            <span className='mt-2 text-lg font-semibold text-white'>Town House</span>
            </div>
            <div className='flex flex-col items-center'>
            <div className='bg-[rgba(19,17,17,0.69)] rounded p-4'>
                <PiBuildingsBold size={70} className='text-white'/>
            </div>
            <span className='mt-2 text-lg font-semibold text-white'>Apartment</span>
            </div>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default PropertiesDisplay1;
