import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Doctors from './pages/Doctors.jsx';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
 import { ToastContainer, toast } from 'react-toastify';
 import { useContext } from 'react';
 import { AppContext } from './context/AppContext.jsx';
import UserMedicalRecord from './pages/UserMedicalRecord.jsx';
const App = () => {

    const {token}=useContext(AppContext);
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/my-profile' element={token ? <MyProfile /> : <Login />} />
        <Route path='/my-appointments' element={token ? <MyAppointments /> : <Login />} />
        <Route path='/appointments/:docId' element={<Appointments />} />
        <Route path='/user-medical-record/:id' element={<UserMedicalRecord />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
