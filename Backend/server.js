import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoute.js';
import medicalRecordRouter from './routes/MedicalRecordRoute.js';
import GeminiRouter from './routes/geminiRouter.js';
// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary()

// middlewares
app.use(cors());
app.use(express.json());

// Api end points

app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/medicalRecord', medicalRecordRouter);
app.use('/api/ai', GeminiRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Doctor Appointment Booking System API ');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});