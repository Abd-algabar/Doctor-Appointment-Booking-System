import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");

  const { setAToken, backendUrl, aToken } = useContext(AdminContext);
  const { setDToken, dToken } = useContext(DoctorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting login for", state);
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-[#c6c6c6] rounded text-[#5e5e5e] text-sm  ]">
        <p className="text-2xl font-semibold m-auto ">
          <span className="text-[#5f6fff]">{state}</span> login
        </p>
        <div className="w-full">
          <p>Email:</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password:</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base">
          login
        </button>
        {state === "Admin" ? (
          <p className="m-auto">
            Doctor Login ?{" "}
            <span
              className="text-[#5f6fff] cursor-pointer underline"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="m-auto">
            Admin Login ?{" "}
            <span
              className="text-[#5f6fff] cursor-pointer underline"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
