import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSlack } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <section className="bg-black text-white px-6 md:px-20 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Easy and convenient <br /> workflows at your fingertips
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-md">
          Create, or use our brilliantly structured templates. Assisted and generated workflows using AI, all your diagramming needs in one place.
        </p>

        <button className="bg-purple-500 text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-purple-600 transition">
          Sign up free
        </button>
        <div className="mt-6">
          <p className="text-gray-400 mb-4">or continue with</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 border border-white w-[170px] h-[44px] rounded-md text-sm hover:bg-white hover:text-black transition">
              <FcGoogle className="w-5 h-5" />
              Sign in
            </button>
            <button className="flex items-center justify-center gap-2 border border-white w-[170px] h-[44px] rounded-md text-sm hover:bg-white hover:text-black transition">
              <FaGithub className="w-5 h-5" />
              Sign in
            </button>
            <button className="flex items-center justify-center gap-2 border border-white w-[170px] h-[44px] rounded-md text-sm hover:bg-white hover:text-black transition">
              <FaSlack className="w-5 h-5 text-[#4A154B]" />
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex justify-center">
        <img
          src="/images/hero-ui-preview.png"
          alt="UI Preview"
          className="rounded-lg shadow-lg w-full max-w-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
