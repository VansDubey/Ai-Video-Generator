// src/pages/Signup.jsx
import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./authContext"; // ✅ use context

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setAccessToken } = useAuth(); // ✅ from context
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/user/register", {
        name,
        email,
        password,
      });

      // ✅ set auth state from backend response
      setUser(res.data.user || { name, email });
      setAccessToken(res.data.accessToken);

      alert("Signup successful 🎉");
      navigate("/"); // redirect to homepage/dashboard
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          alert("Email already exists. Please login instead.");
        } else if (err.response.status === 400) {
          alert("Missing required fields (email or password).");
        } else {
          alert(`Error: ${err.response.data.error || "Something went wrong"}`);
        }
      } else {
        alert("Unable to connect to server. Please try again later.");
      }
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User Info:", decoded);

      try {
        // ✅ send Google token to backend
        const res = await axios.post("http://127.0.0.1:5000/auth/google-signup", {
          token: credentialResponse.credential,
        });

        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        navigate("/");
      } catch (err) {
        console.error("Google signup failed", err);
        alert("Google signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A] text-white">
      <div className="bg-[#2C2C2C] p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-center text-white">
          CREATE ACCOUNT
        </h2>
        <p className="text-center text-[#A0A0A0] mb-6">
          Sign up to get started 🚀
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1E1E1E] text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4473FF]"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition 
                       bg-gradient-to-r from-[#4473FF] to-blue-600 hover:opacity-90"
          >
            Sign Up
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
              onError={() => console.log("Google Signup Failed")}
              theme="filled_black"
              size="large"
              shape="pill"
              text="signup_with"
            />
          </div>
        </GoogleOAuthProvider>

        {/* Footer Links */}
        <p className="text-center text-[#A0A0A0] mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#4473FF] font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
