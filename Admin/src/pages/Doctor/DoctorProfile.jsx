import React from "react";
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);

  const  updateProfileData = async () => {
    try {

        const updatedData={
          fees:profileData.fees,
          available:profileData.available
        };
        console.log("Updating profile with data:",updatedData);``
        setIsEditing(false);
      const response = await axios.post(
        `${backendUrl}/doctor/update-profile`,
         updatedData ,
        {
          headers: {
            dtoken: dToken,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProfileData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile data");
      console.log("Error in updateProfileData:", error.message);
    }}

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="flex flex-col gap-4 m-5">
        <div>
          <div>
            <img
              className="bg-[#5f6fff]/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className=" flex-1 border  border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* doc info */}
            <p className=" flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {" "}
                {profileData.degree}-{profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* doc about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium mt-3 text-neutral-800">
                About:
              </p>
              <p className="text-sm  text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium ">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEditing ? (
                  <input
                    type="number"
                    onChange={(e) => {
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }));
                    }}
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEditing &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
              />
              <label htmlFor="">Available</label>
            </div>

            {isEditing ? (
              <button
                onClick={() => updateProfileData()}
                className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff]  hover:text-white transition-all duration-300 "
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff]  hover:text-white transition-all duration-300 "
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
