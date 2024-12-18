import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "src/context/hooks/useTheme";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLoginClick = () => {
    window.location.href = "https://www.google.com";
  };

  const navLinks = [
    { label: "Product", href: "/product" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 text-white">
      <nav className="h-20 border-b border-deep-blue flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <h1 className="text-[#131b62] font-bold text-2xl sm:text-2xl">
          MajMap
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href}>
              <span className="cursor-pointer text-black hover:text-deep-blue transition-colors text-base">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-6 py-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-900 hover:text-white transition"
            onClick={handleLoginClick}
          >
            Log In
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {theme === "light" ? <FaMoon /> : <FiSun />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-4 text-blue-900"
          onClick={() => setMobileOpen(true)}
        >
          <IoMenu size={24} />
        </button>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-black/30 flex justify-end pt-4 md:hidden">
            <div className="w-64 bg-white h-[400px] flex flex-col items-center shadow-lg">
              <div className="w-full flex justify-end">
                <button
                  className="text-2xl pr-4 text-blue-900"
                  onClick={() => setMobileOpen(false)}
                >
                  &times;
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link key={link.label} to={link.href}>
                    <span
                      onClick={() => setMobileOpen(false)}
                      className="cursor-pointer text-black hover:text-deep-blue transition-colors text-lg"
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="">
                <button
                  className="mt-4 px-6 py-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-900 hover:text-white transition"
                  onClick={handleLoginClick}
                >
                  Log In
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  {theme === "light" ? <FaMoon /> : <FiSun />}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
