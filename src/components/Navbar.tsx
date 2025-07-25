import React from "react";
import { Link } from "react-router-dom"; // 👈 import Link from react-router-dom
import logo from "@/assets/MajMap 1.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-black text-white">
      <div className="text-xl font-bold text-purple-400">
        <img
          src={logo}
          alt="Logo"
          className="rounded-lg shadow-lg w-70 h-10"
        />
      </div>

      <ul className="flex space-x-6">
        {["Pricing", "Resources", "How it works", "Features", "Contact us"].map((item) => (
          <li
            key={item}
            className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Link button for sign up */}
      <Link
        to="/auth/register"
        className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 text-white px-4 py-2 rounded-md"
      >
        Sign up free
      </Link>
    </nav>
  );
};

export default Navbar;
