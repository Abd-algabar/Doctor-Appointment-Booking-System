import DoctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js"


export const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctorData = await DoctorModel.findById(docId);
    if (!doctorData) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not found" });
    }
    await DoctorModel.findByIdAndUpdate(docId, {
      available: !doctorData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log("error in changeAvailablity:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const getAllDoctorsForFrontend = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.log("error in getAllDoctorsForFrontend:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await DoctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log("error in loginDoctor:", error);
    return res.json({ success: false, message: error.message });
  }
};


// Api to get doctor appointments for doctor dashboard
export const getDoctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    // console.log("docId in getDoctorAppointments:", docId);
    const appointments= await appointmentModel.find({docId});
    return res.json({ success: true, appointments } );
  
  }
    catch (error) {
    console.log("error in getDoctorAppointments:", error);
    return res.json({ success: false, message: error.message });
  }
    }

// api to  mark appointment as completed
export const markAppointmentCompleted=async(req,res)=>{
  try {
    const {appointmentId,docId}=req.body;

    const appointmentData=await appointmentModel.findById(appointmentId);
    if(!appointmentData){
      return res.status(404).json({success:false,message:"Appointment not found"});
    }
    if(appointmentData.docId!==docId){
      return res.status(403).json({success:false,message:"Unauthorized action"});
    }

    await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
    res.json({success:true,message:"Appointment completed"});
  }catch (error) {

    console.log("error in markAppointmentCompleted:", error);
    return res.json({ success: false, message: error.message });
  }};


  // api to cancel appointment by doctor
export const cancelAppointmentByDoctor=async(req,res)=>{
  try {
   
    const {appointmentId,docId}=req.body;

    const appointmentData=await appointmentModel.findById(appointmentId);
    if(!appointmentData){
      return res.status(404).json({success:false,message:"Appointment not found"});
    }
    if(appointmentData.docId!==docId){
      return res.status(403).json({success:false,message:"Unauthorized action"});
    }

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
    res.json({success:true,message:"Appointment cancelled"});
  
  }

    catch (error) {
    console.log("error in cancelAppointmentByDoctor:", error);
    return res.json({ success: false, message: error.message });
  }
    }

    // Api to get dashboard data for doctor
export const getDoctorDashboardData=async(req,res)=>{
try {
  const {docId}=req.body;
  const docData=await DoctorModel.findById(docId).select(["-password","-email"]);
  if(!docData){
    return res.status(404).json({success:false,message:"Doctor not found"});
  }
  const totalAppointments=await appointmentModel.countDocuments({docId});
  const completedAppointments=await appointmentModel.countDocuments({docId,isCompleted:true});
  const cancelledAppointments=await appointmentModel.countDocuments({docId,cancelled:true});
  const pendingAppointments=await appointmentModel.countDocuments({docId,isCompleted:false,cancelled:false});
  let totalEarnings= completedAppointments * docData.fees;

  const dashboardData={
    totalAppointments,
    completedAppointments,
    cancelledAppointments,
    totalEarnings,
    latestAppointments:await appointmentModel.find({docId}).sort({createdAt:-1}).limit(5),
    pendingAppointments,
  }

  res.json({success:true,dashboardData});
} catch (error) {
  console.log("error in getDoctorDashboardData:", error);
    return res.json({ success: false, message: error.message });
}

}


// Api to get doctor profile (for doctor panel)
export const getDoctorProfile=async(req,res)=>{
  try {
    const {docId}=req.body;
    const doctorData=await DoctorModel.findById(docId).select(["-password"]);

    res.json({success:true,doctorData});
  }catch (error) {
    console.log("error in getDoctorProfile:", error);
      return res.json({ success: false, message: error.message });
  }}

  // api to update doctor profile
export const updateDoctorProfile=async(req,res)=>{
  try {
    const {docId,fees,available}=req.body;

    await DoctorModel.findByIdAndUpdate(docId,{fees,available});
    res.json({success:true,message:"Profile updated successfully"});

   
  }catch (error) {
    console.log("error in updateDoctorProfile:", error);
      return res.json({ success: false, message: error.message });
  }}



