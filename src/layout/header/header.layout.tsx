import React from "react";
import { useTheme } from "../../context/hooks/useTheme";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Application</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              {/* icon use react icons  */}
              <button
                onClick={toggleTheme}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                {theme === "light" ? <FaMoon /> : <FiSun />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
