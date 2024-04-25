import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Authentication/AdminLogin/AdminLogin";
import AdminSignup from "./pages/Authentication/AdminSignup/AdminSignup";
import Home from "./pages/Admin/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserHome from "./pages/User/Home/UserHome";
import UserLogin from "./pages/Authentication/UserLogin/UserLogin";
import UserSignup from "./pages/Authentication/UserSignup/UserSignup";
import Navbar from "./Components/Navbar/Navbar";
import Tour from "./pages/User/Tour/Tour";
import Detail from "./pages/User/Details/Details";
import Bookings from "./pages/User/Bookings/Bookings";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        {/* <Route path="/appointment/:id" element={<Appointment />} /> */}
        <Route path="/tour" element={<Tour />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route element={<ProtectedRoute roles={["USER"]} />}>
          <Route path="/details/:id" element={<Detail />} />
          <Route path="/bookings/:id" element={<Bookings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
