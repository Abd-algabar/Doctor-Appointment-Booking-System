import React, { use, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docId } = useParams();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { doctors, currencySymbol, getAllDoctors, token, backendUrl } =
    useContext(AppContext);
  const [docInfo, setDocInfo] = useState({});

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setslotTime] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting end tim of date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlot = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let mouth = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + mouth + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          // add slot to array
          timeSlot.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlot]);
    }
  };

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doctor) => doctor._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo);
  };

  const bookAppointment = async () => {
    setLoading(true);
    if (!token) {
      toast.warn("Login to book Appointment");
      setLoading(false);
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      // console.log(slotDate);
      const { data } = await axios.post(
        backendUrl + "/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } },
      );
      // console.log(data);
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        setLoading(false);
        navigate("/my-appointments");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      // console.log("error in booked appointment:" + error.message);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo && docInfo.slots_booked) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // useEffect(() => {
  //   // console.log(docSlots);
  // }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* doc ditailes */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#5f6fff] w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0">
            {/* doc info */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full ">
                {docInfo.experience}
              </button>
            </div>

            {/* doc about  */}
            <div>
              <p className="felx items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                {" "}
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => {
                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-5 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-[#5f6fff] text-white" : "border border-gray-200"}`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => {
                return (
                  <p
                    onClick={() => setslotTime(item.time)}
                    className={`text-sm font-light flex-shrink px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-[#5f6fff] text-white" : "text-gray-400 border border-e-gray-300"}`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>

          {/* <button
            disabled={loading}
            onClick={bookAppointment}
            className="bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            {" "}
            Book an appointment
          </button> */}


             <button
      onClick={bookAppointment}
      disabled={loading}
      className={`
        bg-[#5f6fff] text-white text-sm font-light 
        px-14 py-3 rounded-full my-6 
        transition-all duration-300
        hover:bg-[#4a5bff]
        ${loading ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
          Booking...
        </div>
      ) : (
        'Book an appointment'
      )}
    </button>



        </div>
        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
