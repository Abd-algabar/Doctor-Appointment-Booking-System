import validator from "validator";
import bcrypt from "bcrypt";
import DoctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import AppointmentModel from "../models/appointmentModel.js";
import UserModel from "../models/userModel.js";
// Api for add doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      degree,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;
    // ckecking for all data
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !degree ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    //  validating email format
    const isUniq = await DoctorModel.findOne({ email });
    if (isUniq) {
      return res
        .status(400)
        .json({ success: false, message: "email already exist " });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // validating strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // uploading image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctor_images",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      degree,
      about,
      fees,
      // address: JSON.parse(address),
      date: new Date().getDate(),
    };

    const newDoctor = new DoctorModel(doctorData);
    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

// api for admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking for all data
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ success: true, message: "Login successful", token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

// api get all doctors list for admin panel

export const getAllDoctorForAdmin = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

// api to get all appointments for admin panel

export const getAllAppointmentsForAdmin = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error in getAllAppointmentsForAdmin:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Please try again." });
  }
};

// api for appointment cancellation

export const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // remove slot from booked slots in doctor model

    const { docId, slotDate, slotTime } = appointmentData;

    const docData = await DoctorModel.findById(docId);

    let slots_booked = docData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (slot) => slot !== slotTime
    );

    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "appointment cancelled successfully" });
  } catch (error) {
    console.log("error in cancelAppointmentAdmin: " + error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to get dashboard data for admin panel

export const adminDashboard = async (req, res) => {
  try {
    const doctorsCount = await DoctorModel.countDocuments();
    const appointmentsCount = await AppointmentModel.countDocuments();
    const latestAppointments = await AppointmentModel.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    const patientsCount = await UserModel.countDocuments();
    const  fees =await AppointmentModel.find({isCompleted:true}).select('amount')
    
    let totalEarnings= 0;
    for (let i = 0; i < fees.length; i++) {
      totalEarnings=totalEarnings+fees[i].amount;
    }

      const appointmentsCompletedCount = await AppointmentModel.countDocuments({ isCompleted: true });
      const appointmentsCancelledCount = await AppointmentModel.countDocuments({ cancelled: true });
      const appointmentsPendingCount = await AppointmentModel.countDocuments({ isCompleted: false, cancelled: false });
  
    const dashboardData = {
      doctorsCount,
      appointmentsCount,
      patientsCount,
     latestAppointments,totalEarnings,
      appointmentsCompletedCount,
      appointmentsCancelledCount,
      appointmentsPendingCount
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log("error in adminDashboard: " + error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllPatients=async (req,res)=>{
  try {

    const Patients = await UserModel.find({}).select(['name','dob','image']);

    return res.json({success:true,Patients})

  } catch (error) {

    console.log("error in getAllPatients: " + error.message);
    res.status(400).json({ success: false, message: "server error" });
  }
}




export const getAdminStats = async (req, res) => {
  try {

    // 🔹 1. حساب إجماليات النظام
    const totals = await AppointmentModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
          totalAppointments: { $sum: 1 },
          totalCompleted: {
            $sum: { $cond: ["$isCompleted", 1, 0] }
          },
          totalCancelled: {
            $sum: { $cond: ["$cancelled", 1, 0] }
          }
        }
      }
    ]);

    const systemTotals = totals[0] || {};

    // 🔹 2. باقي الاستعلامات
    const [
      topRevenue,
      topAppointments,
      topCompleted,
      topCancelled,
      lowestRevenue,
      lowestAppointments,
      lowestCompleted
    ] = await Promise.all([

      // AppointmentModel.aggregate([
      //   { $group: { _id: "$docId", totalRevenue: { $sum: "$amount" } } },
      //   { $sort: { totalRevenue: -1 } },
      //   { $limit: 1 }
      // ]),
   AppointmentModel.aggregate([
  {
    $match: { isCompleted: true }
  },
  {
    $group: {
      _id: "$docId",
      totalRevenue: { $sum: "$amount" }
    }
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 1 }
]),

      AppointmentModel.aggregate([
        { $group: { _id: "$docId", totalAppointments: { $sum: 1 } } },
        { $sort: { totalAppointments: -1 } },
        { $limit: 1 }
      ]),

      AppointmentModel.aggregate([
        { $match: { isCompleted: true } },
        { $group: { _id: "$docId", completedAppointments: { $sum: 1 } } },
        { $sort: { completedAppointments: -1 } },
        { $limit: 1 }
      ]),

      AppointmentModel.aggregate([
        { $match: { cancelled: true } },
        { $group: { _id: "$docId", cancelledAppointments: { $sum: 1 } } },
        { $sort: { cancelledAppointments: -1 } },
        { $limit: 1 }
      ]),

      AppointmentModel.aggregate([
        { $group: { _id: "$docId", totalRevenue: { $sum: "$amount" } } },
        { $sort: { totalRevenue: 1 } },
        { $limit: 1 }
      ]),

      AppointmentModel.aggregate([
        { $group: { _id: "$docId", totalAppointments: { $sum: 1 } } },
        { $sort: { totalAppointments: 1 } },
        { $limit: 1 }
      ]),

      AppointmentModel.aggregate([
        { $match: { isCompleted: true } },
        { $group: { _id: "$docId", completedAppointments: { $sum: 1 } } },
        { $sort: { completedAppointments: 1 } },
        { $limit: 1 }
      ])
    ]);

    // 🔥 دالة حساب النسبة
    const calcPercentage = (value, total) => {
      if (!total || total === 0) return 0;
      return Number(((value / total) * 100).toFixed(2));
    };

    // 🔥 دالة تجهيز النتيجة
    const attachDoctorData = async (result, type) => {
      if (!result || result.length === 0) return null;

      const doc = await DoctorModel.findById(result[0]._id).select("name image");

      let percentage = 0;

      if (type === "revenue") {
        percentage = calcPercentage(result[0].totalRevenue, systemTotals.totalRevenue);
      }

      if (type === "appointments") {
        percentage = calcPercentage(result[0].totalAppointments, systemTotals.totalAppointments);
      }

      if (type === "completed") {
        percentage = calcPercentage(result[0].completedAppointments, systemTotals.totalCompleted);
      }

      if (type === "cancelled") {
        percentage = calcPercentage(result[0].cancelledAppointments, systemTotals.totalCancelled);
      }

      return {
        docId: result[0]._id,
        doctor: doc,
        percentage,
        ...result[0]
      };
    };

    // 🔥 Response
    res.json({
      success: true,
      totals: systemTotals,

      data: {
        topRevenue: await attachDoctorData(topRevenue, "revenue"),
        topAppointments: await attachDoctorData(topAppointments, "appointments"),
        topCompleted: await attachDoctorData(topCompleted, "completed"),
        topCancelled: await attachDoctorData(topCancelled, "cancelled"),

        lowestRevenue: await attachDoctorData(lowestRevenue, "revenue"),
        lowestAppointments: await attachDoctorData(lowestAppointments, "appointments"),
        lowestCompleted: await attachDoctorData(lowestCompleted, "completed")
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log("Error in getAdminStats: " + err.message);
  }
};