import React, { useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from "react-router-dom"
import { DoctorContext } from '../context/DoctorContext'
const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext);
    const {dToken,setDToken}=useContext(DoctorContext)
    const [showModel,setShowModel]=useState(false)
    const navigate=useNavigate()
    const logout=()=>{
            navigate('/')
            aToken&& setAToken('')
            aToken&& localStorage.removeItem("aToken");
            dToken&& setDToken('')
            dToken&& localStorage.removeItem("dToken");
    }
  return (
    <div className='flex items-center justify-between px-4 py-3 sm:px-10 border-b border-gray-300 bg-white '>
      { showModel && <LogoutModel setShowModel={setShowModel} logout={logout} />}
        <div className='flex items-center gap-2 text-sm'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken?"Admin":"Doctor"}</p>
        </div>
        <button onClick={()=>{setShowModel(true)}} className='text-white text-sm bg-[#5f6fff]  px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar




const LogoutModel = ({logout,setShowModel}) => {
  return (
    <div className='bg-black/30 absolute top-0 left-0 w-full h-full flex items-center justify-center'>

        <div className='bg-white p-6 rounded-md shadow-lg mb-6 min-w-70 ' >
          <h4 className='text-2xl font-semibold underline'>LogOut:</h4>
          <p className='text-gray-600  text-sm' >Do you really want to log out?</p>
          <div className='flex gap-3 p-2 mt-2'>
            <button onClick={logout} className='text-white text-sm   bg-red-600  px-10 py-2 rounded-full'>Logout</button>
            <button onClick={()=>{setShowModel(false)}}  className='text-white text-sm bg-[#5f6fff] px-10 py-2 rounded-full'>Cancel</button>
          </div>
        </div>
    </div>
  )
}


