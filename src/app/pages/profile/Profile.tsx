import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/Logo.svg";
import logo2 from "/assets/MajMap 1.svg";

interface UserData {
  id: string;
  email: string;
  displayName: string;
  profilePicture?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthentication = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);

      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        window.history.pushState({}, document.title, window.location.pathname);
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      await fetchUserData(token);
    };

    const fetchUserData = async (token: string) => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load user data");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthentication();
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      console.log("User Data:", userData);
    }
  }, [userData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Loading welcome page...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      {/* Top Navbar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
        <div className="flex items-center space-x-2">
          <img src={logo2} alt="Majmap Logo" className="w-60 h-50" />
          <span className="text-xl font-bold text-white"></span>
        </div>
        <button
          className="text-white text-2xl font-bold hover:text-gray-400"
          onClick={() => navigate("/dashboard")} // or close modal/logout
        >
          &times;
        </button>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

      {/* Decorative Arrows */}
      <div className="absolute left-10 top-1/3 hidden md:block">
        <svg width="150" height="100" fill="none">
          <path
            d="M0,50 Q75,0 150,50"
            stroke="#FFE97F"
            strokeWidth="2"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#FFE97F" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="absolute right-10 bottom-1/3 hidden md:block">
        <svg width="150" height="100" fill="none">
          <path
            d="M0,50 Q75,100 150,50"
            stroke="#FFE97F"
            strokeWidth="2"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead2)"
          />
          <defs>
            <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#FFE97F" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Main Welcome Box */}
      <div className="flex flex-col justify-center items-center h-full space-y-6 z-10 relative">
        <img src={logo} alt="Logo" className="w-40 h-40" />

        <h1 className="text-4xl font-semibold">
          Hi! <span>{userData?.displayName || userData?.email}</span>
        </h1>

        <p className="text-2xl font-bold">Welcome to Majmap</p>

        <button className="mt-4 px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-md text-lg font-medium transition">
          Get Started
        </button>
      </div>
    </div>
  );


};

export default Profile;
