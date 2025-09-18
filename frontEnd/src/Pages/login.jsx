// src/pages/Login.jsx
import { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext"; // ✅ import context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setAccessToken, setUser } = useContext(AuthContext); // ✅ get setters from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:5000/user/login", {
        email,
        password,
      });

      // ✅ Save user and token globally
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);

      alert("Login Completed!!");
      navigate("/");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert(
            "Invalid credentials. Please sign up first if you don't have an account."
          );
        } else {
          alert(`Error: ${err.response.data.error || "Something went wrong"}`);
        }
      } else {
        alert("Unable to connect to server. Please try again later.");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User Info:", decoded);

      try {
        // Send token to backend to verify & get JWT
        const res = await axios.post("http://127.0.0.1:5000/auth/google", {
          token: credentialResponse.credential,
        });

        setAccessToken(res.data.accessToken);
        setUser(res.data.user);

        alert("Google Login Successful!");
        navigate("/");
      } catch (err) {
        alert("Google login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A] text-white">
      <div className="bg-[#2C2C2C] p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-center text-white">
          WELCOME BACK!
        </h2>
        <p className="text-center text-[#A0A0A0] mb-6">
          Please login to continue 🔑
        </p>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1E1E1E] text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4473FF]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1E1E1E] text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4473FF]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition 
                       bg-gradient-to-r from-[#4473FF] to-blue-600 hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-3 text-[#A0A0A0] text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Google OAuth */}
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
              theme="filled_black"
              size="large"
              shape="pill"
            />
          </div>
        </GoogleOAuthProvider>

        {/* Footer Links */}
        <p className="text-center text-[#A0A0A0] mt-6 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#4473FF] font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
