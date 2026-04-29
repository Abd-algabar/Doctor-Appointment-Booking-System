import express from "express";
import {
  registerUser,
  loginUser,
  getUserprofile,
  updateProfile,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getUserprofile);

userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

userRouter.get("/get-myappointments", authUser, getUserAppointments);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
