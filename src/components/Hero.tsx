import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSlack } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <section className="bg-black text-white px-6 md:px-20 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Easy and convenient <br /> workflows at your fingertips
        </h1>
        <p className="text-2xl text-gray-300 mb-8 max-w-md">
          Create, or use our brilliantly structured templates. Assisted and generated workflows using AI, all your diagramming needs in one place.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            to="/auth/login"
            className="bg-purple-500 text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-purple-600 transition w-full text-center"
          >
            Sign In
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-gray-400 text-sm">or continue with</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="http://localhost:3000/auth/google"
            className="flex items-center justify-center gap-2 border border-white w-[170px] h-[44px] rounded-md text-sm hover:bg-white hover:text-black transition"
          >
            <FcGoogle className="w-5 h-5" />
            Sign in
          </Link>
          <Link
            to="/auth/github"
            className="flex items-center justify-center gap-2 border border-white w-[170px] h-[44px] rounded-md text-sm hover:bg-white hover:text-black transition"
          >
            <FaGithub className="w-5 h-5" />
            Sign in
          </Link>
          <Link
            to="/auth/slack"
            className="flex items-center justify-center gap-2 border border-white w-[170px] h-[44px] rounded-md text-sm hover:bg-white hover:text-black transition"
          >
            <FaSlack className="w-5 h-5 text-[#4A154B]" />
            Sign in
          </Link>
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
