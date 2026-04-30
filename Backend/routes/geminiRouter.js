import express from "express";
import {CreateMedicalReport, PatientDiagnosis} from '../controllers/geminiController.js'
import upload from "../middlewares/multer.js";

const GeminiRouter = express.Router();

GeminiRouter.post('/PatientDiagnosis',upload.array("images", 10),PatientDiagnosis);

GeminiRouter.post('/CreateMedicalReport',CreateMedicalReport);
export default GeminiRouter;