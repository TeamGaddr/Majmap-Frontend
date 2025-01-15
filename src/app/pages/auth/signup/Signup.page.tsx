import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  displayName: Yup.string().required("Display Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const testResult = zxcvbn(password || "");
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strength = testResult.score;

  return (
    <div className="mt-2">
      <progress
        className="w-full h-2"
        max="4"
        value={strength}
        style={{ backgroundColor: "lightgray" }}
      />
      <p
        className={`text-sm mt-1 ${
          strength === 0
            ? "text-red-500"
            : strength === 1
            ? "text-orange-500"
            : strength === 2
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        {strengthLabels[strength]}
      </p>
    </div>
  );
};

const Register: React.FC = () => {
  const initialValues: FormData = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormData,
    { setSubmitting, setErrors }: any
  ) => {
    const { displayName, email, password } = values;

    const payload = {
      displayName,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", // Required to send cookies or authentication tokens
      });

      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error("Registration failed: " + error);
      setErrors({
        email: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async (response: any) => {
    console.log("Google response:", response);

    if (response?.credential) {
      const payload = {
        token: response.credential,
      };

      try {
        const res = await fetch("http://localhost:3000/auth/google/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          alert("Google registration successful! Token: " + data.token);
        } else {
          const errorData = await res.json();
          alert("Google registration failed: " + errorData.message);
        }
      } catch (error) {
        console.error("Error during Google registration:", error);
        alert("An error occurred during Google registration.");
      }
    } else {
      console.error("No credential found in Google response.");
      alert("Google registration failed: No credential found.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Sign Up
            </h2>

            {/* Display Name */}
            <div className="mb-4">
              <Field
                type="text"
                name="displayName"
                placeholder="Display Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="displayName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
              <PasswordStrengthMeter password={values.password} />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>

            {/* Google Login */}
            <div className="mt-6">
              <GoogleLogin onSuccess={handleGoogleSignup} useOneTap />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
