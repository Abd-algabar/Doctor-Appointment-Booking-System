import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Axios from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate= useNavigate()
  const onSubmitHandler = async () => {
    console.log(state)
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/user/register", {
          name,
          email,
          password,
        });
        if (data?.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message)
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("error:" + error);
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Create Account" : "log in"} to book
          appointment
        </p>
        {state == "Sign Up" && (
          <div className=" w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              required
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
        )}

        <div className=" w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            required
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>

        <div className=" w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            required
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-[#5f6fff] underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              className="text-[#5f6fff] underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              {" "}
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
