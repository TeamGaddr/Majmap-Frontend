import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

// Yup schema for form validation
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

// SignIn component
export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null
  });

  // Handle Google OAuth callback
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
            message: error instanceof Error ? error.message : "Authentication failed",
            code: "AUTH_ERROR",
          },
        }));
      } finally {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  // Handle form submission for sign-in
  const handleFormSubmit = async (values: { email: string; password: string }) => {
    setAuthState({ isLoading: true, error: null });

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Invalid email or password");

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data.user.id, email: data.user.email, displayName: data.user.displayName })
      );

      navigate("/profile", { replace: true });
    } catch (error) {
      setAuthState({ isLoading: false, error: { message: error instanceof Error ? error.message : "Login failed" } });
    }
  };

  // Handle Google sign-in redirect
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
          <h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
          <p className="text-gray-500">Access your account</p>
        </div>

        {authState.error && (
          <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-md">
            <BiError className="w-5 h-5" />
            <p>{authState.error.message}</p>
          </div>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || authState.isLoading}
                className={`w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-500 ${
                  isSubmitting || authState.isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting || authState.isLoading ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="relative text-center my-4">
          <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-gray-300"></span>
          <span className="relative bg-white px-4 text-sm text-gray-500">OR</span>
        </div>

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
