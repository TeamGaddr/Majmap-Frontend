import { useState, useEffect } from "react";
import logo from "src/assets/Icon1.svg";
import { CommentQuote24Regular } from "@fluentui/react-icons";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

interface User {
  photoUrl?: string;
}

export default function DashboardHeaderComponent() {
  const [/*user*/, setUser] = useState<User | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
  };

  const handleDoneClick = () => {
    setShowShareModal(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000); // Auto-hide after 3 seconds
  };

  return (
    <div className="relative">
      {/* Dark overlay when share modal is open */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      <header
        className={`flex items-center justify-between px-[30px] py-[16px] border-b-[1px] border-[#2E2E2E] z-30 relative ${
          showShareModal ? "bg-[#1A1A1A]" : "bg-[#1E1F1F]"
        }`}
        style={{ height: "64px", width: "1300px" }}
      >
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center p-2 rounded-md text-white hover:bg-[#2E2E2E] transition-colors"
            style={{ backgroundColor: showShareModal ? "#1A1A1A" : "#1E1F1F" }}
            title="Quote"
            aria-label="Quote button"
          >
            <CommentQuote24Regular style={{ width: "20px", height: "20px" }} />
          </button>

          <div
            className="flex items-center justify-center flex-shrink-0 rounded-full bg-[#f25872] text-white font-medium"
            style={{
              width: "32px",
              height: "32px",
            }}
            aria-label="User profile picture"
          >
            X
          </div>

          <button
            type="button"
            onClick={toggleShareModal}
            className="inline-flex items-center justify-center gap-[7px] hover:opacity-90 transition-opacity"
            title="Share content"
            aria-label="Share button"
            style={{
              width: "90px",
              height: "38px",
              padding: "12px 8px",
              borderRadius: "8px",
              background: "rgba(186, 134, 252, 1)"
            }}
          >
            <span className="text-sm text-white">Share</span>
          </button>
        </div>
      </header>

      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px] relative">
            <button
              onClick={toggleShareModal}
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <RxCross2 size={20} />
            </button>

            <div className="p-6">
              <h3 className="text-[#1E1F1F] text-xl font-semibold mb-6">Share the selection platform</h3>
              
              <div className="mb-6 flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-[#1E1F1F] text-sm font-medium mb-2">Invite others by name or email</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-[#1E1F1F] text-sm focus:outline-none focus:ring-1 focus:ring-[#BA86FC] focus:border-[#BA86FC]"
                    placeholder="Enter names or emails"
                  />
                </div>
                <button 
                  className="h-[44px] px-4 bg-[#D9D9D9] text-[#1E1F1F] text-sm font-medium rounded-lg"
                  style={{
                    background: "rgba(217, 217, 217, 1)"
                  }}
                >
                  Invite
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-[#1E1F1F] text-sm font-medium mb-2">Add a Custom message</label>
                <textarea 
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-[#1E1F1F] text-sm focus:outline-none focus:ring-1 focus:ring-[#BA86FC] focus:border-[#BA86FC]"
                  placeholder="Optional message"
                  rows={3}
                />
              </div>

              <div className="mb-6">
                <h4 className="text-[#1E1F1F] text-sm font-medium mb-2">Who has access</h4>
                <div className="bg-[#F3F4F6] p-4 rounded-lg">
                  <p className="text-[#1E1F1F] text-sm mt-1">Anyone with the link</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleDoneClick}
                  className="px-6 py-2 text-white text-sm font-medium rounded-lg"
                  style={{
                    background: "rgba(0, 148, 255, 1)"
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed bottom-4 left-[120px] z-50">
          <div className="bg-[#ffffff] border border-[#2E2E2E] text-black px-4 py-3 rounded-lg shadow-lg flex items-center min-w-[200px]">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <FaCheck className="text-white text-xs" />
              </div>
              <span className="text-sm font-medium">Successfully shared!</span>
            </div>
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