import { useState, useEffect, useRef } from "react";
import logo from "src/assets/Icon1.svg";
import {  FaCheck } from "react-icons/fa";
import { CommentQuote24Regular } from "@fluentui/react-icons";
import { FiLogOut, FiSettings, FiHelpCircle, FiUser } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface UserData {
  id: string;
  email: string;
  displayName: string;
  photo: string;
}
export default function DashboardHeaderComponent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadUser = async () => {
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
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load user data");
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const toggleShareModal = () => setShowShareModal(!showShareModal);
  const handleDoneClick = () => {
    setShowShareModal(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };
  return (
    <div className="relative">
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <header className="flex items-center justify-between px-6 py-4 bg-[#1E1F1F] border-b border-[#2E2E2E] w-full h-[64px] fixed top-0 z-50">
        <img src={logo} alt="Logo" className="h-full" />
        <div className="flex items-center gap-4 ml-auto">
          {/* Comment Icon */}
          <button
            type="button"
            className="flex items-center justify-center p-2 rounded-md text-white hover:bg-[#2E2E2E] transition-colors"
            title="Quote"
            aria-label="Quote button"
          >
            <CommentQuote24Regular style={{ width: "24px", height: "24px" }} />
          </button>
          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={userData?.photo || "https://i.pravatar.cc/40"}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1E1F1F] text-white rounded-xl shadow-lg z-[9999] p-4 border border-[#2E2E2E]">
                <div className="mb-4">
                  <p className="font-semibold text-white text-lg">
                    {userData?.displayName || "Jane Doe"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {userData?.email || "jd@gmail.com"}
                  </p>
                </div>
                <div className="space-y-3">
                  <button className="flex items-center gap-2 text-left text-gray-300 hover:text-white w-full">
                    <FiUser className="text-lg" />
                    Your details
                  </button>
                  <button className="flex items-center gap-2 text-left text-gray-300 hover:text-white w-full">
                    <FiSettings className="text-lg" />
                    Settings
                  </button>
                  <button className="flex items-center gap-2 text-left text-gray-300 hover:text-white w-full">
                    <FiHelpCircle className="text-lg" />
                    Help
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left text-red-500 hover:text-red-400 w-full"
                  >
                    <FiLogOut className="text-lg" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Share Button with custom style */}
          <button
            onClick={toggleShareModal}
            className="inline-flex items-center justify-center text-white"
            style={{
              width: "111px",
              height: "34px",
              background: "#BA86FC",
              borderRadius: "10px",
              flex: "none",
              order: 1,
              flexGrow: 0,
            }}
            aria-label="Share button"
          >
            <span className="ml-2 text-sm font-medium">Share</span>
          </button>
        </div>
      </header>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px] relative p-6">
            <button
              onClick={toggleShareModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <RxCross2 size={20} />
            </button>
            <h3 className="text-[#1E1F1F] text-xl font-semibold mb-6">
              Share the selection platform
            </h3>
            <div className="mb-6 flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Invite others by name or email
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter names or emails"
                />
              </div>
              <button className="h-[44px] px-4 bg-gray-300 rounded-lg">
                Invite
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Add a Custom message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Optional message"
                rows={3}
              />
            </div>
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Who has access</h4>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Anyone with the link</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleDoneClick}
                className="px-6 py-2 text-white bg-blue-500 rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed bottom-4 left-[120px] z-50">
          <div className="bg-white border border-gray-300 text-black px-4 py-3 rounded-lg shadow-lg flex items-center min-w-[200px]">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <FaCheck className="text-white text-xs" />
            </div>
            <span className="text-sm font-medium">Successfully shared!</span>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="ml-4 text-black hover:text-gray-700"
              title="Close success popup"
            >
              <RxCross2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}