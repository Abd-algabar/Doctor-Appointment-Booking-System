import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import CancelLoadingSpinner from '../../components/UI/CancelLoadingSpinner'
import { useNavigate } from 'react-router-dom'
const AllPatients = () => {

    const{calculateAge}=useContext(AppContext);
    const  [AllPatients,setAllPatients] =useState([]);
    const {aToken,backendUrl}=useContext(AdminContext);
    const navigate=useNavigate()

    const getAllPatients=async()=> {
        try {

            const {data}=await  axios.get(backendUrl+"/admin/get-all-patients",{headers:{
                atoken:aToken
            }})

            // console.log(data)
            if (data.success) {
                setAllPatients(data.Patients)
            }else{
                toast.error("tray again")
            }
        } catch (error) {
            toast.error("tray again")
        }
    }

    useEffect(()=>{
            getAllPatients()
    },[])

  return (
    <div className='mt-4 ml-4' >
      
      <h3 className='mb-3 text-lg font-medium'>All Patients :</h3>
     

            <div className="bg-white border w-100 border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
                    <div className="hidden  sm:grid grid-cols-[1fr_3fr_2fr] grid-flow-col py-3 px-6 border-b border-gray-300">
                      <p>#</p>
                      <p>patient</p>
                      <p>Age</p>
                      
                
                    </div>
            
                    {AllPatients.length > 0 ?  AllPatients.map((item, index) => (
                      <div
                        className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[1fr_3fr_2fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
                        key={index}
                      >
                        <p className="max-sm:hidden">{index + 1}</p>
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 rounded-full"
                            src={item.image}
                            alt=""
                          />
                          <p  onClick={()=>navigate(`/user-medical-record/${item._id}`)} className='cursor-pointer '>{item.name}</p>
                        </div>
                        <p className="max-sm:hidden ">{calculateAge(item.dob)}</p>
                       
            
                       
            
                        
                       
                      </div>
                    )) : <div className=' flex items-center justify-center h-40'>
                        <CancelLoadingSpinner  size='large' color='primary'/>
                    </div>  }
                  </div>
     
    </div>
  )
}

export default AllPatients
