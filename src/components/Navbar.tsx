import React from "react";
import logo from "../assets/MajMap 1.svg"; // Adjust the path to your image file

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-black text-white">
      <div className="text-xl font-bold text-purple-400">
        <img
          src={logo} // Use the imported image here
          alt="Logo"
          className="rounded-lg shadow-lg w-12 h-12" // Adjust size as needed
        />
      </div>
      <ul className="flex space-x-6">
        <li>Pricing</li>
        <li>Resources</li>
        <li>How it works</li>
        <li>Features</li>
        <li>Contact us</li>
      </ul>
      <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Sign up free</button>
    </nav>
  );
};

export default Navbar;