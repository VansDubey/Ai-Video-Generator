import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import { useAuth } from "./authContext"; // ✅ import context


export default function Home() {
  const { user, logout } = useAuth(); // ✅ get user from context
  const navigate = useNavigate();
  const darkMode = true; // keeping your dark mode default

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        {/* Navbar */}
        <nav
          className="flex justify-between items-center px-8 py-4 border-b"
          style={{ borderColor: "#2C2C2C" }}
        >
          {/* Logo and App Name */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "#4473FF" }}
            >
              <span className="text-white font-bold">▶</span>
            </div>
            <span className="font-bold text-xl text-white">VideoAI</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8 text-[#A0A0A0]">
            <Link to="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <li className="hover:text-white cursor-pointer">Create</li>
            <li className="hover:text-white cursor-pointer">Templates</li>
            <Link to ='/Pricing' className="hover:text-white cursor-pointer">Pricing</Link>

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
            ) : null}
          </ul>

          {/* Credits, Profile */}
          <div className="flex items-center gap-4">
            {user && (
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

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4473FF] to-purple-500">
              AI Videos
            </span>
            <br /> in Minutes, Not Hours
          </h1>
          <p className="mt-4 text-[#A0A0A0] max-w-2xl">
            Transform your ideas into professional videos with AI-powered
            text-to-video, image animation, and smart editing tools.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              className="px-6 py-3 rounded-lg font-semibold transition"
              style={{
                backgroundColor: "#4473FF",
                color: "#FFFFFF",
              }}
            >
              Start Creating Free
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold transition"
              style={{
                backgroundColor: "#2C2C2C",
                color: "#FFFFFF",
              }}
            >
              Watch Demo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
