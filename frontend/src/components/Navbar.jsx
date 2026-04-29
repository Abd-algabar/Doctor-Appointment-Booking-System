import React, { useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken,userData}=useContext(AppContext)
  const[showModel,setShowModel]=useState(false)
  const logout=()=>{
    setToken('');
    localStorage.removeItem("token")
    setShowModel(false)

  }
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-200">
      {showModel&& <LogoutModel setShowModel={setShowModel} logout={logout} />}
      <img onClick={()=>navigate("/")} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">
            HOME
            <hr className=" border-0 outline-none h-0.5 bg-primary w-3/4 m-auto hidden" />
          </li>
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">
            ALL DOCTORS
            <hr className="border-0 outline-none h-0.5 bg-primary w-3/4 m-auto hidden" />
          </li>
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">
            ABOUT
            <hr className="border-0 outline-none h-0.5 bg-primary w-3/4 m-auto hidden" />
          </li>
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">
            CONTACT
            <hr className="border-0 outline-none h-0.5 bg-primary w-3/4 m-auto hidden" />
          </li>
        </NavLink>
      </ul>
      <div className=" flex items-center gap-4">
        {token  && userData? (
          <div className=" flex items-center gap-2 cursor-pointer group relative">
            <img  className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className=" absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
                <div className="min-w-48 bg-stone-100 rounded flex-col gap-4 p-4">
                    <p onClick={()=>{navigate("my-profile")}} className="hover:text-black cursor-pointer">My Profile</p>
                    <p onClick={()=>{navigate("my-appointments")}} className="hover:text-black cursor-pointer">My Appointments</p>
                    <p onClick={()=>{navigate(`user-medical-record/${userData._id}`)}} className="hover:text-black cursor-pointer">My medical record</p>
                    <p onClick={()=>{setShowModel(true)}} className="hover:text-black cursor-pointer">Logout</p>
                </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-[#5f6fff] text-white px-8 py-3 rounded-full  font-light hidden md:block "
          >
            create account
          </button>
        )}

        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* mobile menu */}

        <div className={`${showMenu?"fixed w-full":"h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="" className="w-36" />
            <img src={assets.cross_icon} alt="" className="w-7" onClick={()=>{setShowMenu(false)}} />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/' > <p className="px-4 py-2 rounded inline-block">Home</p> </NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/doctors' > <p className="px-4 py-2 rounded inline-block">All Doctors</p> </NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/about' > <p className="px-4 py-2 rounded inline-block">About</p> </NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/contact' > <p className="px-4 py-2 rounded inline-block">Contact</p> </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


const LogoutModel = ({logout,setShowModel}) => {
  return (
    <div className='bg-black/30 absolute top-0 left-0 w-full h-full flex items-center justify-center z-100'>

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