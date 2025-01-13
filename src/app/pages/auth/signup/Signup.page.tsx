import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiError } from "react-icons/bi";

interface AuthError {
  message: string;
  code?: string;
}

interface AuthState {
  isLoading: boolean;
  error: AuthError | null;
}

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const handleCallback = async () => {
      if (!location.search) return;

      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch(
          `http://localhost:3000/auth/google/callback${location.search}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        console.log("Authentication successful:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
          localStorage.setItem("tokenExpiry", expiryTime.toString());
        }

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data.user.id,
              email: data.user.email,
              displayName: data.user.displayName,
            })
          );
        }

        navigate("/profile", { replace: true });
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthState((prev) => ({
          ...prev,
          error: {
            message:
              error instanceof Error ? error.message : "Authentication failed",
            code: "AUTH_ERROR",
          },
        }));
      } finally {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  const handleGoogleSignIn = () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      console.error("Failed to initiate Google Sign In:", error);
      setAuthState((prev) => ({
        ...prev,
        error: {
          message: "Failed to initiate Google Sign In",
          code: "INIT_ERROR",
        },
        isLoading: false,
      }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="m-auto w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-gray-500">Sign up to get started</p>
        </div>

        {authState.error && (
          <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-md">
            <BiError className="w-5 h-5" />
            <p>{authState.error.message}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={authState.isLoading}
            className={`w-full flex items-center justify-center gap-2 p-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              authState.isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {authState.isLoading ? (
              <div className="w-5 h-5 border-t-2 border-gray-500 rounded-full animate-spin" />
            ) : (
              <>
                <FcGoogle className="w-5 h-5" />
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:text-blue-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:text-blue-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
