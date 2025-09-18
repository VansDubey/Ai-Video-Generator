import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import HomePage from './Pages/HomePage'
import Login from "./Pages/login";
import Signup from "./Pages/SignUp";
import PricingPage from "./Pages/Pricing";

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Pricing" element={<PricingPage />} />

    </Routes>
  );
}

export default App;
