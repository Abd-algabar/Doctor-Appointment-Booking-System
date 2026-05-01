import React from "react";
import { assets } from "../assets/assets_admin/assets";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { DoctorContext } from "../context/DoctorContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import CancelLoadingSpinner from "../components/UI/CancelLoadingSpinner";
const UserMedicalRecord = () => {
  const [userMedicalRecord, setUserMedicalRecord] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { dToken, backendUrl } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  const{aToken}=useContext(AdminContext)
  const { id } = useParams();

  const navigate = useNavigate();
  const getUserMedicalRecord = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/medicalRecord/user-medical-record/${id}`,
        { headers: { dtoken: dToken } },
      );
      // console.log(data);
      if (data.success) {
        setUserData(data.user);
        setUserMedicalRecord(data.medicalRecords||[]);
        setLoading(false);
      }
       else {
        toast.error(data.message);
        setLoading(false)
      }
    } catch (error) {
      console.log("error in  getUserMedicalRecord" + error.message);
    }
  };

  useEffect(() => {
    if (dToken||aToken) {
      getUserMedicalRecord();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="   bg-white my-6 mx-4 p-4 rounded-md shadow-md">
        <p className=" font-semibold text-gray-800 md:text-xl mb-1">
          User Medical Record :
        </p>

        {loading ? (
          <CancelLoadingSpinner color="primary" size="large" />
        ) : (
          <div className="flex items-center justify-between flex-col md:flex-row md:gap-2   ">
            <div className=" flex items-center gap-3">
              <img className="w-16 rounded-4xl" src={userData.image} alt="" />

              <div>
                <p className="text-gray-500 ">
                  <span className="text-gray-800 font-semibold mr-1">
                    Name:
                  </span>
                  {userData.name}
                </p>
                <p className="text-gray-500 ">
                  <span className="text-gray-800 font-semibold mr-1">age:</span>
                  {calculateAge(userData.dob)}
                </p>
              </div>
            </div>

            <button onClick={() => navigate(`/medical-report/${id}`)} className=" mt-3 md:mt-0 text-sm hover:bg-[#5f6fff] px-4 py-2 hover:text-white rounded-xl text-[#5f6fff] bg-white transition-all duration-500 border border-[#5f6fff]">Generate medical report AI</button>
          </div>
        )}
      </div>

      <div>
        {loading ? (
          <CancelLoadingSpinner color="primary" size="large" />
        ) : userMedicalRecord.length ==0 ?  <p className=" m-6 text-gray-600 "> " No medical records found for this user " </p> :  (
          userMedicalRecord.reverse().map((record, index) => (
            <div
              key={index}
              className="   bg-white my-6 mx-4 p-4 rounded-md shadow-md"
            >
              <div className="flex items-center justify-between  border-b   border-b-gray-200 pb-1">
                <p className=" flex items-center gap-2  text-sm text-zinc-500">
                  <img className="w-8" src={record.doctor.image} alt="" />{" "}
                  {record.doctor.name}
                </p>
                <p className=" flex items-center gap-2  text-sm text-zinc-500">
                  {record.doctor.speciality}
                </p>
                <p className="   text-sm text-zinc-500">
                  {record.appointment.slotDate} || {record.appointment.time}
                </p>
              </div>

              <div className="mt-4 p-1 flex flex-col gap-2">
                <div>
                  <p className="font-semibold text-gray-800 underline">
                    Symptoms:
                  </p>
                  <p className="text-sm text-gray-500">{record.symptoms}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 underline">
                    Chronic Illnesses or Previous Surgeries:
                  </p>
                  <p className="text-sm text-gray-500">
                    {record.Chronic_illnesses_or_previous_surgeries}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 underline">
                    Diagnosis:
                  </p>
                  <p className="text-sm text-gray-500"> {record.diagnosis}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 underline">
                    Treatment:
                  </p>
                  <p className="text-sm text-gray-500">{record.treatment}</p>
                </div>
              </div>

              {record.medicalTests_and_X_rays.length > 0 && (
                <div>
                  <p className="font-semibold text-gray-800 underline">
                    Medical Tests and X-rays:
                  </p>
                  <div className="flex items-start gap-2 mt-2">
                    {record.medicalTests_and_X_rays.map((img, index) => (
                      <img
                        className="w-14 rounded-md"
                        key={index}
                        src={img}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default UserMedicalRecord;

