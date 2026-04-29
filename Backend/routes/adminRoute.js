import express from 'express';
import  {getAdminStats, addDoctor, adminLogin ,getAllDoctorForAdmin,getAllAppointmentsForAdmin,cancelAppointmentAdmin,adminDashboard,getAllPatients} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';
const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);

adminRouter.get('/all-doctors',authAdmin, getAllDoctorForAdmin);
adminRouter.post('/change-availability',authAdmin, changeAvailablity);

adminRouter.get('/all-appointments',authAdmin, getAllAppointmentsForAdmin);

adminRouter.post("/cancel-appointment",authAdmin, cancelAppointmentAdmin);
adminRouter.get('/dashboard',authAdmin, adminDashboard);

adminRouter.get('/get-all-patients', getAllPatients);
    
adminRouter.get('/get-admin-stats', getAdminStats);
export default adminRouter;