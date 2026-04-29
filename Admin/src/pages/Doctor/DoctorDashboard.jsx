import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { useEffect ,useState} from "react";
import { assets } from "../../assets/assets_admin/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import CancelLoadingSpinner from "../../components/UI/CancelLoadingSpinner.jsx";
import CreateMedicalRecord from '../../components/CreateMedicalRecord.jsx';
import ProgressBar from "../../components/UI/ProgressBar .jsx";
import CircularProgressBar from "../../components/UI/CircularProgressBar.jsx";
const DoctorDashboard = () => {
  const {
    dToken,
    getDoctorDashboardData,
    dashboardData,
    setDashboardData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(null);

      const [showCreateMedicalRecord,setShowCreateMedicalRecord]=useState(false);
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
      setLoading(true);
    if (dToken) {
      getDoctorDashboardData(setLoading);
      // console.log("Dashboard Data:",dashboardData);
    }
    
  }, [dToken]);
  return (
    loading ? <div className="flex justify-center items-center w-full h-[100vh]">
<CancelLoadingSpinner color="primary"  size="large"/>
    </div>  : dashboardData && (
      <div className="m-5">

          {showCreateMedicalRecord && <div className=' absolute backdrop-blur-sm  rounded-2xl  lg:w-[80%] min-w-[60%]  p-2  h-[100vh]'>
          <CreateMedicalRecord imageFiles={imageFiles} setImageFiles={setImageFiles}  RecordData={RecordData}  setRecordData={setRecordData} setShowCreateMedicalRecord={setShowCreateMedicalRecord} />
      </div>
        
    
      }

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.totalAppointments}
              </p>
              <p className=" text-gray-400">Total Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {dashboardData.totalEarnings}
              </p>
              <p className=" text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            
            <div className=" flex items-center flex-col" >
              
                
                  <CircularProgressBar percent={dashboardData.pendingAppointments/dashboardData.totalAppointments * 100 || 0}  />
              
               
              <p className=" text-gray-400">Pending Appointments({dashboardData.pendingAppointments})</p>
             
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            {/* <img className="w-14" src={assets.cancel_icon} alt="" /> */}
            <div className=" flex items-center flex-col" >
              {/* <p className="text-xl font-semibold text-gray-600">
                {dashboardData.cancelledAppointments}
              </p> */}
                
                  <CircularProgressBar percent={dashboardData.cancelledAppointments/dashboardData.totalAppointments * 100 || 0} color="#FB2C36" />
              
               
              <p className=" text-gray-400">Cancelled Appointments({dashboardData.cancelledAppointments})</p>
             
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
            {/* <img className="w-14" src={assets.tick_icon} alt="" /> */}
            <div className="flex items-center flex-col">
              {/* <p className="text-xl font-semibold text-gray-600">
                {dashboardData.completedAppointments}
              </p> */}
              <CircularProgressBar percent={dashboardData.completedAppointments/dashboardData.totalAppointments * 100 || 0} color="#10B981" />
              <p className=" text-gray-400">Completed Appointments({dashboardData.completedAppointments})</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className=" flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300 ">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 border-gray-300 ">

            { dashboardData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className=" flex-1 text-sm">
                  <p className=" text-gray-800">{item.userData.name}</p>
                  <p className=" text-gray-600">
                    {item.slotDate}||{item.slotTime}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => {
                        cancelAppointment(item._id);
                        getDoctorDashboardData();
                      }}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />

                    <img
                      onClick={() => {
                        handelRecord(item._id,item.userData._id);
                        
                      }}
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
      </div>
    )
  );
};

export default DoctorDashboard;
