import express from "express";
import authDoctor from "../middlewares/authDoctor.js";
import {
  getAllDoctorsForFrontend,
  loginDoctor,
  getDoctorAppointments,
  cancelAppointmentByDoctor,
  markAppointmentCompleted,
  getDoctorDashboardData,
  updateDoctorProfile,
  getDoctorProfile,
} from "../controllers/doctorController.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", getAllDoctorsForFrontend);

doctorRouter.post("/login", loginDoctor);

doctorRouter.get("/appointments", authDoctor, getDoctorAppointments);
doctorRouter.post("/completed-appointment", authDoctor, markAppointmentCompleted);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointmentByDoctor);

doctorRouter.get("/dashboard", authDoctor, getDoctorDashboardData);

doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.get("/profile", authDoctor, getDoctorProfile);
export default doctorRouter;
