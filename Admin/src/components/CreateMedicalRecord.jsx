import React from "react";
import { useState, useContext } from "react";
import { DoctorContext } from "../context/DoctorContext.jsx";
// import { assets } from '../../assets/assets_admin/assets.js';
import { assets } from "../assets/assets_admin/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import CancelLoadingSpinner from "./UI/CancelLoadingSpinner.jsx";
import Diagnosis from "./Diagnosis.jsx";

const CreateMedicalRecord = ({
  imageFiles,
  setImageFiles,
  RecordData,
  setRecordData,
  setShowCreateMedicalRecord,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [AIData, setAIData] = useState();
  const { dToken, backendUrl, completeAppointment, getDoctorDashboardData } =
    useContext(DoctorContext);

  const handelAi = async (e) => {
    e.preventDefault();
    try {
      setLoadingAi(true);
      const formData = new FormData();
      formData.append("symptoms", RecordData.symptoms);
      formData.append(
        "Chronic_illnesses_or_previous_surgeries",
        RecordData.Chronic_illnesses_or_previous_surgeries,
      );

      if (imageFiles.length > 0) {
        imageFiles.forEach((image) => {
          formData.append("images", image);
        });
      }

      const { data } = await axios.post(
        backendUrl + "/ai/PatientDiagnosis",
        formData,
        { headers: { dtoken: dToken } },
      );
      if (data.success) {
        setAIData(data.AiData);
        setLoadingAi(false);
      } else {
        toast.error(data.message);
        setLoadingAi(false);
      }
    } catch (error) {
      console.log("error in handel Ai: " + error);
      toast.error(error.message);
      setLoadingAi(false);
    }
  };

  const handelCreateRecordData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("symptoms", RecordData.symptoms);
      formData.append(
        "Chronic_illnesses_or_previous_surgeries",
        RecordData.Chronic_illnesses_or_previous_surgeries,
      );
      formData.append("diagnosis", RecordData.diagnosis);
      formData.append("treatment", RecordData.treatment);
      formData.append("userId", RecordData.userId);
      formData.append("appointmentId", RecordData.appointmentId);
      if (imageFiles.length > 0) {
        imageFiles.forEach((image) => {
          formData.append("medicalTests_and_X_rays", image);
        });
      }
      //  formData.append("",RecordData.)

      const { data } = await axios.post(
        backendUrl + "/medicalRecord/add",
        formData,
        { headers: { dtoken: dToken } },
      );
      if (data.success) {
        toast.success(data.message);
        completeAppointment(RecordData.appointmentId);
        setShowCreateMedicalRecord(false);
        setLoading(false);
        getDoctorDashboardData();
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("error in add medical record: " + error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="absolute  bg-white   rounded-2xl shadow-lg  z-50  flex items-start gap-3 flex-col sm:flex-row ">
      <div>
        <img
          onClick={() => setShowCreateMedicalRecord(false)}
          className="w-6 m-4 absolute right-1"
          src={assets.cross_icon}
          alt=""
        />
        <p className="p-4 font-semibold text-gray-700 md:text-xl">
          CreateMedicalRecord:
        </p>

        <div className=" px-6 py-1">
          <div className="mb-3 text-gray-600 ">
            <label className="pl-1" htmlFor="symptoms">
              Symptoms:
            </label>
            <textarea
              value={RecordData.symptoms}
              onChange={(e) =>
                setRecordData({ ...RecordData, symptoms: e.target.value })
              }
              type="text"
              id="symptoms"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-3 text-gray-600 ">
            <label className="pl-1" htmlFor="chronicIllnesses">
              Chronic Illnesses or Previous Surgeries:
            </label>
            <input
              value={RecordData.Chronic_illnesses_or_previous_surgeries}
              onChange={(e) =>
                setRecordData({
                  ...RecordData,
                  Chronic_illnesses_or_previous_surgeries: e.target.value,
                })
              }
              type="text"
              id="chronicIllnesses"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-3 text-gray-600 ">
            <label className="pl-1" htmlFor="diagnosis">
              Diagnosis:
            </label>
            <textarea
              value={RecordData.diagnosis}
              onChange={(e) =>
                setRecordData({ ...RecordData, diagnosis: e.target.value })
              }
              type="text"
              id="diagnosis"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-3 text-gray-600 ">
            <label className="pl-1" htmlFor="treatment">
              Treatment:
            </label>
            <textarea
              value={RecordData.treatment}
              onChange={(e) =>
                setRecordData({ ...RecordData, treatment: e.target.value })
              }
              type="text"
              id="treatment"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="px-8  ">
          <div className="flex  flex-col gap-2">
            <label className="pl-1 text-gray-600" htmlFor="medicalTests">
              Upload Medical Tests and X-rays:
            </label>
            <label
              className="flex gap-2 items-center justify-start overflow-scroll"
              htmlFor="medicalTests"
            >
              {imageFiles.length > 0 ? (
                imageFiles.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="Uploaded"
                    className="w-20  mr-2 rounded-md"
                  />
                ))
              ) : (
                <img
                  src={assets.upload_area}
                  alt="Upload Icon"
                  className="w-20 h-20 mr-2"
                />
              )}
            </label>
            <input
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              hidden
              type="file"
              id="medicalTests"
              multiple
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="  flex  justify-end mb-4 mt-2">
          <button
            disabled={loading}
            onClick={handelCreateRecordData}
            className="bg-[#5f6fff] text-white px-4 py-2 rounded-md  mr-8 my-2  text-center"
          >
            {loading ? (
              <CancelLoadingSpinner color="gray" size="medium" />
            ) : (
              "Create Medical Record"
            )}
          </button>

          <button
            disabled={loadingAi}
            onClick={handelAi}
            className="text-[#5f6fff] border border-[#5f6fff] bg-white px-3 py-1 rounded-md  mr-8 my-2  text-center"
          >
            {loadingAi ? (
              <CancelLoadingSpinner color="gray" size="medium" />
            ) : (
              "Smart Diagnosis Ai "
            )}
          </button>
        </div>
      </div>

      {AIData && (
        <div className="border border-gray-300 p-4 rounded-md mr-2 mt-22 sm:max-w-[50%]">
          <p className=" font-semibold text-gray-800 ">AI-guided diagnosis:</p>
          {console.log("AIData: ", AIData&& AIData)}
          {AIData&&<Diagnosis AiData={AIData} />}
          {/* <p className="text-gray-500 text-sm">{AIData}</p> */}
        </div>
      )}
    </div>
  );
};

export default CreateMedicalRecord;
