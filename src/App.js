import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminLogin from './components/adminLogin/AdminLogin';
import EditCar from './components/Car/EditCar';
import Cars from './components/Cars/Cars';
import AdminProfile from './components/Profile/AdminProfile';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={< AdminLogin/>} /> 
       <Route path="/admin/login" element={< AdminLogin/>} /> 
       <Route path="/admin/profile" element={< AdminProfile/>} /> 
       <Route path="/admin/cars" element={< Cars/>} /> 
       <Route path="/admin/cars/edit/:id" element={< EditCar/>} /> 
    </Routes>
  </BrowserRouter>
  )
}

export default App