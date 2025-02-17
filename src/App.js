import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword"; // Ensure correct path
import UserDash from "./components/userdash";
import Profile from "./components/Profile";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import OwnerDashboard from "./components/owner/OwnerDashboard";
import OwnerProfile from "./components/owner/OwnerProfile";
import OwnerManagement from "./components/admin/OwnerManagement";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/userdash" element={<UserDash />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="/UserManagement" element={<UserManagement/>}/>
          <Route path="/OwnerDashboard" element={<OwnerDashboard/>}/>
          <Route path="/OwnerProfile" element={<OwnerProfile/>}/>
          <Route path="/OwnerManagement" element={<OwnerManagement/>}/>
          
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
