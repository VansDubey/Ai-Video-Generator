import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { assets } from "../assets/assets";
import { User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#1A1A1A]">
        {/* Logo and App Name */}
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-white">ImageAI</span>
        </div>

        {/* Center Navigation Links */}
        <ul className="flex items-center gap-8 text-[#A0A0A0]">
          <li>
            <Link to="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
          </li>
          <li className="hover:text-white cursor-pointer">Create</li>
          <li className="hover:text-white cursor-pointer">Templates</li>
          <li>
            <Link to="/Pricing" className="hover:text-white cursor-pointer">
              Pricing
            </Link>
          </li>
        </ul>

        {/* Right Side (Auth / User Info) */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-md hover:bg-[#2C2C2C] transition"
                style={{ borderColor: "#2C2C2C", color: "#FFFFFF" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md font-semibold transition"
                style={{ backgroundColor: "#4473FF", color: "#FFFFFF" }}
              >
                SignUp
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-[#A0A0A0]">250 credits</span>
              <div
                className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg hover:bg-[#2C2C2C] transition"
                onClick={() => navigate("/dashboard")}
              >
                <User className="w-5 h-5 text-white" />
                <span className="text-white text-sm">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
