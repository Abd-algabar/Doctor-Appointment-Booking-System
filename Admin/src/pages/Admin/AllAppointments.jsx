import React from "react";
import { useEffect } from "react";
import { use } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets.js";
import CancelLoadingSpinner from "../../components/UI/CancelLoadingSpinner.jsx";
const AllAppointments = () => {
  const {
    getAllAppointmentsForAdmin,
    appointments,
    aToken,
    cancelAppointmentAdmin,
  } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointmentsForAdmin();
    }
  }, [aToken]);

  return (
    <div className=" w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <p>{appointments.length} Appointments</p>

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

        { appointments.length==0 ? <div className="flex justify-center mt-30">
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
              <p>{item.userData.name}</p>
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
              <img
                onClick={()=>{cancelAppointmentAdmin(item._id)}}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
