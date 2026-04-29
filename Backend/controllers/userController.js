import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { json } from "express"
import {v2 as cloudinary } from "cloudinary"
import DoctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js"
import razorpay from "razorpay"
//api to register

export const registerUser=async(req,res)=>{
    try {
        const {name, email,password}=req.body
        if (!name || !email ||!password) {
            res.status(400).json({success:false,message:"Missing Details  "})
        }
        const isUniq= await userModel.findOne({email})
        if (!validator.isEmail(email)|| isUniq) {
           return  res.status(400).json({success:false,message:"enter a valid email  "})
        }
        if (password.length<8) {
           return  res.status(400).json({success:false,message:"enter a strong password  "})
        }

        // hash password
        const hashedPassword= await bcrypt.hash(password,10)

        const userData={
            name,
            email,
            password:hashedPassword
        }
         const newUser = new userModel(userData);
         const user =await  newUser.save();
        
         const token= jwt.sign({id:user._id},process.env.JWT_SECRET)

         res.json({success:true,message:"user created successfully",token})

    } catch (error) {
        console.log("error in registerUser:" + error.message)
        res.json({success:false,message:error.message})
    }
}

export const  loginUser =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
           return  res.json({success:false,message:"pleas enter email and password "})
        }
        const user= await userModel.findOne({email});
        if (!user) {
           return  res.json({success:false,message:"invalid email or password"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if (isMatch) {
            const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token,message:"Hello~"})
        }
        else{
            return  res.json({success:false,message:"invalid email or password"})
        }
    } catch (error) {
        console.log("error in loginUser:" + error.message)
        res.json({success:false,message:error.message})
    }
}


export const getUserprofile= async (req,res)=>{
    try {

        const {userId}=req.body
      
        const userData= await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.status(400).json({success:false,message:"user not found"})
        }

        return res.json({success:true,userData});

    } catch (error) {
        console.log("error in getUserProfile: "+error.message);
        res.status(400).json({success:false, message:error.message})
    }
}

export const updateProfile=async (req,res)=>{
    try {

        const {userId,name, phone ,dob,gender}=req.body
        const imageFile=req.file

        if (!name || !phone  || !dob || !gender) {
            res.status(400).json({success:false,message:'all filed required'})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,dob,gender})
        
        if (imageFile) {
            //upload img
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl=imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        res.json({success:true,message:"profile updated"})

    } catch (error) {
        console.log("error in updateProfile: "+error.message);
        res.status(400).json({success:false, message:error.message})
    }
}


export const bookAppointment =async (req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body;
        const docData=await DoctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({success:false,message:'Doctor not available'})
        }
        let slots_booked=docData.slots_booked;
        //checking for slot availability
        if (slots_booked[slotDate]) {
                if (slots_booked[slotDate].includes(slotTime)) {
                     return res.json({success:false,message:'slot not available'})
                }else{
                    slots_booked[slotDate].push(slotTime);
                }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData =await userModel.findById(userId).select('-password')

        delete docData.slots_booked;

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
          
        }

        const nweAppointment= new  appointmentModel(appointmentData);
        await nweAppointment.save()

        //save new slots data in doctor
        await DoctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment Booked"})
    } catch (error) {
        console.log("error in bookAppointment: "+error.message);
        res.status(400).json({success:false, message:error.message})
    }
}

// api to get user appointments
export const getUserAppointments=async (req,res)=>{

    try {
        const {userId}=req.body;

        const appointments= await appointmentModel.find({userId}).sort({createdAt:-1})

        res.json({success:true,appointments})
        
    } catch (error) {
          console.log("error in bookAppointment: "+error.message);
        res.status(400).json({success:false, message:error.message})
    }
}

//  api to cancel appointment

export const  cancelAppointment= async (req,res)=>{
    try {

        const {userId, appointmentId}=req.body;

        const  appointmentData=await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({success:false,message:"Appointment not found"})
        }
        if(appointmentData.userId !== userId)
        {
            return res.json({success:false,message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

        // remove slot from booked slots in doctor model

        const {docId,slotDate,slotTime}= appointmentData

        const docData= await DoctorModel.findById(docId);

        let slots_booked=docData.slots_booked;

        slots_booked[slotDate]= slots_booked[slotDate].filter(slot=> slot !== slotTime)

        await DoctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"appointment cancelled successfully"})

    } catch (error) {
         console.log("error in cancelAppointment: "+error.message);
        res.status(400).json({success:false, message:error.message})
    }
}



// api to make payment of apppointment using razorpay

// const razorpayInstance=new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET
// })

// const paymentRazorpay=async (req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }