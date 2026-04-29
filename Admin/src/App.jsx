import React from 'react'
import Login from './pages/Login'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
  import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes ,Route} from 'react-router-dom';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import UserMedicalRecord from './pages/UserMedicalRecord';
import AllPatients from './pages/Admin/AllPatients';
import Statistics from './pages/Admin/Statistics';
const App = () => {
  const {aToken}=useContext(AdminContext);
  const {dToken}=useContext(DoctorContext);

  return aToken || dToken ? (
    <div className='bg-[#f8f9fd]'>
        <Navbar/>
        <div className='flex items-start' >
          <Sidebar/>
          <Routes>
            {/* admin routes */}
              <Route path='/' element={<></>} />
              <Route path='/admin-dashboard' element={<Dashboard/>} />
              <Route path='/all-appointments' element={<AllAppointments/>} />
              <Route path='/Statistics' element={<Statistics/>} />
              <Route path='/add-doctor' element={<AddDoctor/>} />
              <Route path='/doctor-list' element={<DoctorsList/>} />
              <Route path='/All-patients' element={<AllPatients/>} />
            {/* doctor routes */}
              <Route path='/doctor-profile' element={<DoctorProfile/>} />
              <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
              <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
              <Route path='/user-medical-record/:id' element={<UserMedicalRecord/>}/> 
          </Routes>
        </div>
      <ToastContainer  />
    </div>
  ):(
    <>
      <Login/>
       <ToastContainer  />
    </>
  )
}

export default App
