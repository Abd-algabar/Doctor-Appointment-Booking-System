// import React from "react";
// import { assets } from "../../assets/assets_admin/assets";
// import { useState } from "react";

// const AddDoctor = () => {

//     const[docImg,setDocImg]=useState(false);
//     const[form,setForm]=useState({
//         name:"",
//         email:"",
//         password:"",
//         experience:"1 year",
//         fees:"",
//         about:"",
//         spaciality:"General physician",
//         degree:"",
//         address1:"",
//         address2:"",

//     })

//   return (
//     <form className="m-5 w-full">
//       <p className="mb-3 text-lg font-medium">Add Doctor</p>

//       <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
//         <div className="flex items-center gap-4 mb-8 text-gray-500 ">
//           <label htmlFor="doc-img">
//             <img
//               className="w-16 bg-gray-100 rounded-full cursor-pointer"
//               src={assets.upload_area}
//               alt=""
//             />
//           </label>
//           <input type="file" id="doc-img" hidden />
//           <p>
//             Upload Doctor <br /> picture
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Name:</p>
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="text"
//                 placeholder="Name"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Email:</p>
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="email"
//                 placeholder="Email"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Password:</p>
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="password"
//                 placeholder="Password"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Experience</p>
//               <select
//                 className="border border-gray-200 rounded px-3 py-2"
//                 name=""
//                 id="Experience"
//               >
//                 <option value="1 year">1 Year</option>
//                 <option value="2 year">2 Year</option>
//                 <option value="3 year">3 Year</option>
//                 <option value="4 year">4 Year</option>
//                 <option value="5 year">5 Year</option>
//                 <option value="6 year">6 Year</option>
//                 <option value="7 year">7 Year</option>
//                 <option value="8 year">8 Year</option>
//                 <option value="9 year">9 Year</option>
//                 <option value="10 year">10 Year</option>
//                 <option value="11 year">11 Year</option>
//                 <option value="12 year">12 Year</option>
//                 <option value="13 year">13 Year</option>
//                 <option value="14 year">14 Year</option>
//                 <option value="15 year">15 Year</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Fees:</p>
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="number"
//                 placeholder="Fees"
//                 required
//               />
//             </div>
//           </div>

//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Spaciality:</p>
//               <select
//                 className="border border-gray-200 rounded px-3 py-2"
//                 name=""
//                 id="Spaciality"
//               >
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatricians">Pediatricians</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Education:</p>
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="text"
//                 placeholder="Education"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Address:</p>
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="text"
//                 placeholder="Address1 "
//                 required
//               />
//               <input
//                 className="border border-gray-200 rounded px-3 py-2"
//                 type="text"
//                 placeholder="Address2 "
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-full">
//           <p className="mt-4 mb-2">About Doctor:</p>
//           <textarea
//             className=" w-full border border-gray-200 rounded "
//             placeholder="write about doctor"
//             rows={4}
//             type="text"
//             required
//           />
//         </div>
//         <button className="bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full ">Add Doctor</button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;

import React from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
    const [loading,setLoading]=useState(false)
  const [docImg, setDocImg] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1",
    fees: "",
    about: "",
    spaciality: "General physician",
    degree: "",
    address1: "",
    address2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!docImg) {
        setLoading(false);
        return toast.error("image not selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("experience", Number(form.experience));
      formData.append("fees", Number(form.fees));

      formData.append("about", form.about);
      formData.append("speciality", form.spaciality);
      formData.append("degree", form.degree);
      formData.append(
        "address",
        JSON.stringify({ line1: form.address1, line2: form.address2 })
      );

      // console.log formdata
      formData.forEach((value, key) => {
        console.log(key + ":" + value);
      });

      const response = await axios.post(
        backendUrl + "/admin/add-doctor",
        formData,
        { headers: { atoken: aToken } }
      );
      const data = response?.data || false;
      console.log("data:", data);
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setForm({
          name: "",
          email: "",
          password: "",
          experience: "1",
          fees: "",
          about: "",
          spaciality: "General physician",
          degree: "",
          address1: "",
          address2: "",
        });
        setLoading(false)
      } else {
        toast.error(data.message);
         setLoading(false)
      }
    } catch (error) {
         setLoading(false)
      console.log("error add doctor:" + error);
      const errorMessage =
        error.response?.data?.message || "Failed to add doctor";

      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500 ">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name:</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email:</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password:</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border border-gray-200 rounded px-3 py-2"
                name="experience"
                id="Experience"
                value={form.experience}
                onChange={handleChange}
              >
                <option value={1}>1 Year</option>
                <option value={2}>2 Year</option>
                <option value={3}>3 Year</option>
                <option value={4}>4 Year</option>
                <option value={5}>5 Year</option>
                <option value={6}>6 Year</option>
                <option value={7}>7 Year</option>
                <option value={8}>8 Year</option>
                <option value={9}>9 Year</option>
                <option value={10}>10 Year</option>
                <option value={11}>11 Year</option>
                <option value={12}>12 Year</option>
                <option value={13}>13 Year</option>
                <option value={14}>14 Year</option>
                <option value={15}>15 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees:</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
                name="fees"
                value={form.fees}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Spaciality:</p>
              <select
                className="border border-gray-200 rounded px-3 py-2"
                name="spaciality"
                id="Spaciality"
                value={form.spaciality}
                onChange={handleChange}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education:</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
                name="degree"
                value={form.degree}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address:</p>
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Address1"
                required
                name="address1"
                value={form.address1}
                onChange={handleChange}
              />
              <input
                className="border border-gray-200 rounded px-3 py-2"
                type="text"
                placeholder="Address2"
                required
                name="address2"
                value={form.address2}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="mt-4 mb-2">About Doctor:</p>
          <textarea
            className=" w-full border border-gray-200 rounded "
            placeholder="write about doctor"
            rows={4}
            type="text"
            required
            name="about"
            value={form.about}
            onChange={handleChange}
          />
        </div>
        <button
            disabled={loading}
          type="submit"
          className={`bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full ${loading?"bg-gray-400 cursor-not-allowed ":""}  `}
        >
           {loading ? (
        <>
            {/* Spinner animation */}
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            
        </>
    ) : (
        "Add Doctor"
    )}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
