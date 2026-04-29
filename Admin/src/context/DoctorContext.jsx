import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getProfileData = async () => {
    try {
        const {data}= await axios.get(backendUrl+"/doctor/profile",{
            headers:{
                dtoken:dToken
        }});
        if(data.success){
            setProfileData(data.doctorData);
            // console.log("Profile Data fetched:",data.doctorData);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
      toast.error("Failed to fetch profile data");
      console.log("Error in getProfileData:",error.message);
    }
  };

  const getDoctorDashboardData = async (setLoading) => {
    try {
        const {data}= await axios.get(backendUrl+"/doctor/dashboard",{
            headers:{
                dtoken:dToken
            }
        });
        if(data.success){
            // console.log("Dashboard Data response:",data.dashboardData);
            setDashboardData(data.dashboardData);
            // console.log("Dashboard Data fetched:",dashboardData);
            setLoading(false);
        }else{
            toast.error(data.message);
            setLoading(false);
        }
    } catch (error) {
      toast.error(data.message);
      console.log("Error in getDoctorDashboardData:",error.message);
      setLoading(false);
    }
  }

  const getAppointments = async (setLoading) => {
    try {
        // console.log("Fetching appointments with dToken:", dToken);
        const {data}= await axios.get(backendUrl+"/doctor/appointments",{
            headers:{
                dtoken:dToken
            }
        });
        if(data.success){
            setAppointments(data.appointments.reverse());
            setLoading(false);
            // console.log(data.appointments);
        }else{
            toast.error(data.message)
            setLoading(false);
        }
    } catch (error) {
      toast.error("Failed to fetch appointments");
      setLoading(false);
      console.log("Error in getAppointments:",error.message);
    }
  }

  const completeAppointment = async(appointmentId)=>{
    try {
        const {data}= await axios.post(backendUrl+"/doctor/completed-appointment",{
            appointmentId
        },{
            headers:{
                dtoken:dToken
            }
        });
        if(data.success){
            toast.success(data.message);
            getAppointments();
        }else{
            toast.error(data.message);
        }
    } catch (error) {
      toast.error("Failed to complete appointment");
      console.log("Error in completeAppointment:",error.message);
    }
  }

  const cancelAppointment = async(appointmentId)=>{
    try {
        const {data}= await axios.post(backendUrl+"/doctor/cancel-appointment",{
            appointmentId
        },{
            headers:{
                dtoken:dToken
            }
        });
        if(data.success){
            toast.success(data.message);
            getAppointments();
        }else{
            toast.error(data.message);
        }
    } catch (error) {
      toast.error("Failed to cancel appointment");
      console.log("Error in cancelAppointment:",error.message);
    }
  }

  const value = {
    dToken,
    setDToken,
    appointments,
    setAppointments,
    backendUrl,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    getDoctorDashboardData,
    dashboardData,
    setDashboardData,
    getProfileData,
    profileData,
    setProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;