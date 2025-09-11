import { Link } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center">
              <span className="text-white font-bold">▶</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">VideoAI</span>
          </div>

          <ul className="flex items-center gap-8 text-gray-700 dark:text-gray-300">
            <Link to= "/dashboard">Dashboard</Link>
            <li>Create</li>
            <li>Templates</li>
            <li>Pricing</li>
          </ul>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">250 credits</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">AI Videos</span>
            <br /> in Minutes, Not Hours
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            Transform your ideas into professional videos with AI-powered text-to-video, image animation,
            and smart editing tools.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Start Creating Free
            </button>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              Watch Demo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
