import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext.jsx'
import { useEffect } from 'react';
import { assets } from '../../assets/assets_admin/assets.js';
import { AppContext } from '../../context/AppContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelLoadingSpinner from '../../components/UI/CancelLoadingSpinner.jsx';
import CreateMedicalRecord from '../../components/CreateMedicalRecord.jsx';
const DoctorAppointments = () => {
  const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(DoctorContext);
  const { calculateAge, currency } = useContext(AppContext);
  const [loading,setLoading]=useState(false);
  const [showCreateMedicalRecord,setShowCreateMedicalRecord]=useState(false);

  const navigate=useNavigate();

  // record state
     const [imageFiles, setImageFiles] = useState([]);
    const [RecordData,setRecordData]=useState({
        symptoms:"",
        Chronic_illnesses_or_previous_surgeries:"",
        diagnosis:"",
        treatment:"",
        userId:"",
        appointmentId:"",

    })

    const handelRecord=async(appointmentId,userId)=>{
      setRecordData({...RecordData,userId:userId,appointmentId:appointmentId})
      setShowCreateMedicalRecord(true)
    }

 
  useEffect(() => {

    if (dToken) {
      setLoading(true);
      getAppointments(setLoading);
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6lx m-5 '>
      {showCreateMedicalRecord && <div className=' absolute backdrop-blur-sm  rounded-2xl  lg:w-[80%] min-w-[60%]  p-2  h-[100vh]'>
          <CreateMedicalRecord imageFiles={imageFiles} setImageFiles={setImageFiles}  RecordData={RecordData}  setRecordData={setRecordData} setShowCreateMedicalRecord={setShowCreateMedicalRecord} />
      </div>
        
    
      }
      <p className='mb-3 text-lg font-medium'>All appointments:</p>
      

      <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
              <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
                <p>#</p>
                <p>patient</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Doctor</p>
                <p>Fees</p>
                <p>Actions</p>
              </div>
      
              { loading?  <div className='flex items-center justify-center w-full h-[50vh] '>
                  <CancelLoadingSpinner size="large" color="primary" />
              </div> : appointments.map((item, index) => (
                <div
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
                  key={index}
                >
                  <p className="max-sm:hidden">{index + 1}</p>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full"
                      src={item.userData.image}
                      alt=""
                    />
                    <p onClick={()=>navigate(`/user-medical-record/${item.userId}`)} className='cursor-pointer '>{item.userData.name}</p>
                  </div>
                  <p className="max-sm:hidden ">{calculateAge(item.userData.dob)}</p>
                  <p>
                    {item.slotDate},{item.slotTime}
                  </p>
      
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full  bg-gray-200"
                      src={item.docData.image}
                      alt=""
                    />
                    <p>{item.docData.name}</p>
                  </div>
      
                  <p>
                    {currency}
                    {item.docData.fees}
                  </p>
                  

                   {item.cancelled ? (
                    <p className="text-red-500 text-xs font-medium">cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">completed</p>
                  ) : (
                    <div className='flex'>
                         <img
                      onClick={()=>{cancelAppointment(item._id)}}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />

                       <img
                      onClick={()=>{handelRecord(item._id,item.userData._id)}}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                    </div>
                   
                  )}

                
                  
                 
                </div>
              ))}
            </div>
    </div>
  )
}

export default DoctorAppointments
