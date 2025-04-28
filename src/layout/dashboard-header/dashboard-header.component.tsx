import { useState, useEffect } from "react";
import logo from "src/assets/Icon1.svg";
import { FaShareSquare } from "react-icons/fa";
import { CommentQuote24Regular } from "@fluentui/react-icons";

interface User {
  photoUrl?: string;
}

export default function DashboardHeaderComponent() {
  const [user, setUser] = useState<User | null>(null);

  // Check if the user is signed in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header
      className="flex items-center gap-4 px-[25px] py-[16px] bg-[#1E1F1F] border-b-[1px] border-[#2E2E2E]"
      style={{ height: "64px", width: "1410px" }}
    >
      <img src={logo} alt="Logo" className="w-auto h-full" />

      {user && (
        <>
          {/* Share button */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-[35px] py-[3px] rounded-[10px] bg-[#0094FF]"
            title="Share content"
            aria-label="Share button"
            style={{ borderRadius: "10px" }}
          >
            <FaShareSquare className="text-white" />
            Share
          </button>

          {/* User photo */}
          <div
            className="flex-shrink-0"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: `url(${user.photoUrl || "path-to-default-photo"}) lightgray 0px -7.754px / 100% 150.027% no-repeat`,
            }}
            aria-label="User profile picture"
          ></div>

          {/* Fluent quote button */}
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 rounded-md bg-[#1E1F1F] text-white border-b border-[#2E2E2E]"
            title="Quote"
            aria-label="Quote button"
          >
            <CommentQuote24Regular style={{ width: "35px", height: "35px" }} />
          </button>
        </>
      )}
    </header>
  );
}
