import express from "express";
import {PatientDiagnosis} from '../controllers/geminiController.js'
import upload from "../middlewares/multer.js";

const GeminiRouter = express.Router();

GeminiRouter.post('/PatientDiagnosis',upload.array("images", 10),PatientDiagnosis);


export default GeminiRouter;