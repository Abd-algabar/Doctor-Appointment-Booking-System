import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets.js";
import CancelLoadingSpinner from "../../components/UI/CancelLoadingSpinner.jsx";
// import CircularProgressBar from "../../components/UI/CircularProgressBar.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import ProgressBar from "../../components/UI/ProgressBar .jsx";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = React.useState(null);
  const { aToken, backendUrl } = useContext(AdminContext);

  const getStatisticsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/get-admin-stats", {
        headers: {
          atoken: aToken,
        },
      });

      console.log(data);
      if (data.success) {
        setStatisticsData(data.data);
      } else {
        toast.error("tray again");
      }
    } catch (error) {
      toast.error("tray again");
    }
  };

  useEffect(() => {
    if (aToken) {
      getStatisticsData();
    }
  }, [aToken]);
  return statisticsData ? (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">

        <div className=" w-[280px]  flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all">
          <p className=" font-semibold text-gray-600 ">Most Appointed Doctor</p>
          
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.topAppointments.doctor.image}
            alt=""
          />
          <p className=" text-gray-500">
            {statisticsData.topAppointments.doctor.name}{ "  "}
          ({statisticsData.topAppointments.totalAppointments})
          </p>

          <div className=" w-full">
            <ProgressBar percent={statisticsData.topAppointments.percentage} />
          </div>
        </div>

        <div className="w-[280px]   flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600 ">
            Top Revenue-Generating Doctor
          </p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.topRevenue.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.topRevenue.doctor.name}
            { "  "}
          ({statisticsData.topRevenue.totalRevenue}$)
          </p>
          <div className="w-full">
            <ProgressBar percent={statisticsData.topRevenue.percentage} />
          </div>
        </div>

        <div className="w-[280px]   flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600">
            Most Completed Appointments
          </p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.topCompleted.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.topCompleted.doctor.name}
            { "  "}
          ({statisticsData.topCompleted.completedAppointments})
          </p>
          <div className="w-full">
            <ProgressBar percent={statisticsData.topCompleted.percentage} />
          </div>
        </div>

        <div className="w-[280px]   flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600">
            Most Cancelled Appointments
          </p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.topCancelled.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.topCancelled.doctor.name}
               { "  "}
          ({statisticsData.topCancelled.cancelledAppointments})
          </p>
          <div className="w-full">
            <ProgressBar percent={statisticsData.topCancelled.percentage} />
          </div>
        </div>

        <div className="w-[280px]  flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600">Lowest Revenue Doctor</p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.lowestRevenue.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.lowestRevenue.doctor.name}
             { "  "}
          ({statisticsData.lowestRevenue.totalRevenue}$)
          </p>
          <div className="w-full">
            <ProgressBar percent={statisticsData.lowestRevenue.percentage} />
          </div>
        </div>

        <div className="w-[280px]   flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600">Least Appointed Doctor</p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.lowestAppointments.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.lowestAppointments.doctor.name}
            { "  "}
          ({statisticsData.lowestAppointments.totalAppointments})
          </p>
          <div className="w-full">
            <ProgressBar
              percent={statisticsData.lowestAppointments.percentage}
            />
          </div>
        </div>

        <div className="w-[280px]   flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600">
            Least Completed Appointments
          </p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.lowestCompleted.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.lowestCompleted.doctor.name}
             { "  "}
          ({statisticsData.lowestCompleted.completedAppointments})
          </p>
          <div className="w-full">
            <ProgressBar percent={statisticsData.lowestCompleted.percentage} />
          </div>
        </div>

        <div className="w-[280px]   flex flex-col items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <p className="font-semibold text-gray-600">Least Appointed Doctor</p>
          <img
            className="w-24 bg-[#5F6FFF] rounded-full"
            src={statisticsData.lowestAppointments.doctor.image}
            alt=""
          />
          <p className="text-gray-500">
            {statisticsData.lowestAppointments.doctor.name}
          </p>
          <div className="w-full">
            <ProgressBar
              percent={statisticsData.lowestAppointments.percentage}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex mt-30 justify-center  w-full">
      <CancelLoadingSpinner size="large" color="primary" />
    </div>
  );
};

export default Statistics;
