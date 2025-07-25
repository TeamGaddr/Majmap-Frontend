import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/hooks/useTheme";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import ROUTES from "@/shared/static/router.data";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLoginClick = () => {
    window.location.href = ROUTES.authentication.login; // Direct user to the sign-in page
  };

  const navLinks = [
    { label: "Home", href: ROUTES.root },
    { label: "About Us", href: ROUTES.about },
    { label: "Posts", href: ROUTES.posts },
    { label: "Login", href: ROUTES.authentication.login },
    { label: "Profile", href: ROUTES.profile },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 text-white">
      <nav className="h-20 border-b border-deep-blue flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <h1 className="text-[#131b62] font-bold text-2xl sm:text-2xl">
          MajMap
        </h1>
*/
        {/* Desktop Navigation */}
       /* <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href}>
              <span className="cursor-pointer text-black hover:text-deep-blue transition-colors text-base">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
*/
        {/* Desktop Login Button and Dark Mode Toggle */}
        /*<div className="flex justify-center items-center gap-4">
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
*/
        {/* Mobile Menu Button */}
       /* <button
  className="md:hidden p-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
  onClick={() => setMobileOpen(true)}
  title="Open Menu"
>
  <IoMenu size={24} />
</button>
*/
{/* Mobile Menu Overlay */}
/*{mobileOpen && (
  <div className="fixed inset-0 bg-black/50 flex justify-end md:hidden">
    <div className="w-64 bg-white h-full flex flex-col shadow-lg">
      <div className="w-full flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-blue-900">Menu</h2>
        <button
          className="text-2xl text-blue-900 focus:outline-none"
          onClick={() => setMobileOpen(false)}
        >
          &times;
        </button>
      </div>
      
      <div className="flex flex-col gap-4 mt-6 px-4">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.href}>
            <span
              onClick={() => setMobileOpen(false)}
              className="cursor-pointer text-black hover:text-blue-900 transition-colors text-lg"
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-auto px-4 pb-6">
        <button
          className="w-full px-4 py-2 border border-blue-900 text-blue-900 rounded-md hover:bg-blue-900 hover:text-white transition"
          onClick={handleLoginClick}
        >
          Log In
        </button>
        <button
          onClick={toggleTheme}
          className="mt-4 p-2 w-full bg-gray-200 dark:bg-gray-700 rounded flex justify-center"
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

*/