import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import HomePage from './Pages/HomePage'
import Login from "./Pages/login";
import Signup from "./Pages/SignUp";
import PricingPage from "./Pages/Pricing";
import UrlToVideo from "./Pages/UrlToVideo";
import Results from "./Pages/Results";
import BuyCredit from "./Pages/BuyCredit";
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Pricing" element={<PricingPage />} />
      <Route path="/urlToVideo" element={<UrlToVideo />} />
      <Route path="/Results" element={<Results/>} />
      <Route path="/BuyCredit" element={<BuyCredit />} />
    

    </Routes>
    </>

  );
}

export default App;
