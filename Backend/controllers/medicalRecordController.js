
import MedicalRecord from "../models/MedicalRecord.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from 'mongoose';

export const createMedicalRecord = async (req, res) => {
  try {
    const { docId } = req.body;
    const {
      userId,
      appointmentId,
      symptoms,
      Chronic_illnesses_or_previous_surgeries,
      diagnosis,
      treatment,
    } = req.body;
    // console.log("docID :" + docId);
    if (!userId || !appointmentId || !symptoms || !diagnosis || !treatment) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const medicalTests_and_X_rays = req.files.map((file) => file.path);

    const newMedicalRecord = new MedicalRecord({
      userId,
      docId,
      appointmentId,
      symptoms,
      Chronic_illnesses_or_previous_surgeries,
      diagnosis,
      treatment,
      medicalTests_and_X_rays,
    });

    if (medicalTests_and_X_rays && medicalTests_and_X_rays.length > 0) {
      const uploadedFiles = medicalTests_and_X_rays.map((file) =>
        cloudinary.uploader.upload(file, {
          resource_type: "image",
          folder: "medicalTests_and_X_rays",
        }),
      );

      const uploadResults = await Promise.all(uploadedFiles);

      const fileUrls = uploadResults.map((result) => result.secure_url);

      newMedicalRecord.medicalTests_and_X_rays = fileUrls;
    }

    await newMedicalRecord.save();

    res
      .status(201)
      .json({ success: true, message: "Medical Record Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
};

export const GetUserMedicalRecord = async (req, res) => {
  try {
    const userId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid user ID format" 
            });
        }

    const user = await userModel
      .findById(userId)
      .select(["name", "image", "dob"]);

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const userMedicalRecords = await MedicalRecord.find({ userId })
      .populate({
        path: "docId",
        select: "name  speciality image ",
        model: "doctor",
      })
      .populate({
        path: "appointmentId",
        select: "slotDate slotTime",
        model: "appointment",
      });

    if (!userMedicalRecords || userMedicalRecords.length === 0) {
      return res.json({
        success: true,
        user:{
                name: user.name,
                image: user.image,
                dob: user.dob
            },
        message: "No medical records found for this user",
      });
    }

     const responseData = {
            success: true,
            user: {
                name: user.name,
                image: user.image,
                dob: user.dob
            },
            medicalRecords: userMedicalRecords.map(record => ({
                symptoms: record.symptoms,
                diagnosis: record.diagnosis,
                treatment: record.treatment,
                medicalTests_and_X_rays: record.medicalTests_and_X_rays,
                Chronic_illnesses_or_previous_surgeries: record.Chronic_illnesses_or_previous_surgeries,
                createdAt: record.createdAt,
                
                // معلومات الطبيب
                doctor: record.docId ? {
                    id: record.docId._id,
                    name: record.docId.name,
                   
                    speciality: record.docId.speciality,
                    image: record.docId.image,
                   
                } : null,
                
                // معلومات الموعد (اختياري)
                appointment: record.appointmentId ? {
                    slotDate: record.appointmentId.slotDate,
                    time: record.appointmentId.slotTime
                } : null
            }))
        }

        return res.status(200).json(responseData)

  } catch (error) {
    console.error("Error fetching medical records:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
