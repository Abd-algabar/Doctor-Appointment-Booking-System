import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filter,setFilter]=useState(false)
  const navigate = useNavigate();
  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctors(
        doctors.filter(
          (doctor) =>
            doctor.speciality.toLowerCase() === speciality.toLowerCase()
        )
      );
    } else {
      setFilteredDoctors(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all duration-300 sm:hidden ${filter?'bg-[#5f6fff] text-white':''}`} onClick={()=>setFilter(prev=>!prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${filter?'flex':'hidden sm:flex'} `}>
          <p onClick={()=>{speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')}} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality==='General physician'?'bg-indigo-100 text-blue-600':''}`}>General physician</p>
          <p onClick={()=>{speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')}} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality==='Gynecologist'?'bg-indigo-100 text-indigo-600':''}`}>Gynecologist</p>
          <p onClick={()=>{speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')}} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality==='Dermatologist'?'bg-indigo-100 text-indigo-600':''}`}>Dermatologist</p>
          <p onClick={()=>{speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')}} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality==='Pediatricians'?'bg-indigo-100 text-indigo-600':''}`}>Pediatricians</p>
          <p onClick={()=>{speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')}} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality==='Neurologist'?'bg-indigo-100 text-indigo-600':''}`}>Neurologist</p>
          <p onClick={()=>{speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist')}} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all duration-300 cursor-pointer ${speciality==='Gastroenterologist'?'bg-indigo-100 text-indigo-600':''}`}>Gastroenterologist</p>
        </div>
        <div className=" w-full flex flex-wrap justify-center gap-4 pt-5 gap-y-6 ">
          {filteredDoctors.map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointments/${doctor._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img
                className="bg-blue-50 w-60 md:w-52"
                src={doctor.image}
                alt={doctor.name}
              />
              <div className="p-4">
                 <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? "text-green-500" : "text-red-500"}`}>
                <p className={`w-2 h-2 ${doctor.available ?"bg-green-500":"bg-red-500"}  rounded-full `}></p>
                <p>{doctor.available ? "Available" : "Not Available"}</p>
              </div>

                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-500 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
