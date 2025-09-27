import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import { useAuth } from "../context/authContext";
import { assets } from "../assets/assets";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const darkMode = true;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className="min-h-screen transition-colors duration-300 bg-[#0f0f0f] text-white"
      >
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4473FF] to-purple-500">
              AI Images
            </span>
            <br /> in Minutes, Not Hours
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
            Transform your ideas into professional visuals with AI-powered
            text-to-image, image animation, and smart editing tools.
          </p>

          {/* CTA Buttons */}
       <div className="mt-8 flex gap-4 items-center">
  {/* Primary CTA */}
  <button
    onClick={() => navigate("/dashboard")}
    className="flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-transform bg-[#4473FF] text-white hover:scale-105 hover:shadow-lg"
  >
    <span>Generate Images</span>
    <img
      src={assets.sample_img_7}
      alt="Generate"
      className="w-8 h-8 rounded-md object-cover "
    />
  </button>

  {/* Secondary CTA */}
  <button
    onClick={() => navigate("/pricing")}
    className="px-6 py-3 rounded-lg font-semibold transition-transform border border-gray-700 text-gray-200 hover:bg-[#1f1f1f] hover:scale-105"
  >
    View Pricing
  </button>
</div>


          {/* Avatar Group */}
         {/* Avatar Group */}
<div className="mt-12">
  <div className="flex -space-x-4">
    {[
      assets.sample_img_1,
      assets.sample_img_2,
      assets.sample_img_3,
      assets.sample_img_4,
      assets.sample_img_5,
      assets.sample_img_6,
    ].map((imgSrc, index) => (
      <img
        key={index}
        src={imgSrc}
        alt={`sample-${index}`}
        className="w-16 h-16 rounded-full border-2 border-[#1A1A1A] object-cover shadow-md hover:scale-105 transition-transform"
      />
    ))}
  </div>
  <p className="mt-4 text-base text-gray-400">
    Join <span className="text-white font-semibold">5,000+</span> creators using ImageAI
  </p>
</div>

        </section>
      </div>
    </div>
  );
}
