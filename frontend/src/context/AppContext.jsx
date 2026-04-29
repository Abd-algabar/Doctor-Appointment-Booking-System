import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios"
import {toast} from "react-toastify"
export const AppContext = createContext();

const AppContextProvider = ({ children })=>{

    const[ doctors,setDoctors]=useState([])
    const[userData,setUserData]=useState(false)
    const[token,setToken]=useState(localStorage.getItem("token")|| false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL ;
    const currencySymbol='$'
  

    const getUserData=async()=>{
        try {
            const{data}=await axios.get(backendUrl+"/user/get-profile",{headers:{token}});
            if (data.success) {
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log("error in getuserData:")
          toast.error(error.response?.data?.message);
        }
    }

    const getAllDoctors=async()=>{
        try {

            const {data}= await axios.get(backendUrl+'/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

      const  value={
        doctors,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        getUserData,
        getAllDoctors
    }

    useEffect(()=>{
        getAllDoctors()
       
    },[])

     useEffect(()=>{
        if (token) {
             getUserData()
        }else{
            setUserData(false)
        }
      
       
    },[token])

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;