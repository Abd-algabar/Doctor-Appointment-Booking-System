import express from "express";
import authDoctor from "../middlewares/authDoctor.js";
import { createMedicalRecord ,GetUserMedicalRecord } from "../controllers/medicalRecordController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";
const medicalRecordRouter = express.Router();

medicalRecordRouter.post("/add",  upload.array("medicalTests_and_X_rays", 10), authDoctor,createMedicalRecord);
medicalRecordRouter.get('/user-medical-record/:id',GetUserMedicalRecord);
medicalRecordRouter.get('/user-medical-record-for-user/:id',authUser,GetUserMedicalRecord)

export default medicalRecordRouter;