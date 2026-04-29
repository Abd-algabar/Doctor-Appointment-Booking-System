import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments,setAppointments]=useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/all-doctors", {
        headers: { atoken: aToken },
      });
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/admin/change-availability",
        { docId },
        { headers: { atoken: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointmentsForAdmin=async()=>{
    try {
      const {data}=await axios.get(backendUrl+"/admin/all-appointments",{
        headers:{atoken:aToken}
      });
      if(data.success){
        console.log(data.appointments);
        setAppointments(data.appointments);
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const cancelAppointmentAdmin=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl+"/admin/cancel-appointment",{appointmentId},{headers:{atoken:aToken}});
      if(data.success){
        toast.success(data.message);
        getAllAppointmentsForAdmin();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getDashboardData=async()=>{
    try {
      const {data}=await axios.get(backendUrl+"/admin/dashboard",{headers:{atoken:aToken}});    
      if(data.success){
        setDashboardData(data.dashboardData);
        console.log(data.dashboardData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeAvailablity,
    getAllAppointmentsForAdmin,
    setAppointments,
    appointments,
    cancelAppointmentAdmin,
    getDashboardData,
    dashboardData
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
