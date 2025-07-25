import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import ROUTES from "@/shared/static/router.data";
import Icon1 from "@/assets/icon1.svg";
import Icon2 from "@/assets/icon2.svg";

const validationSchema = Yup.object({
  displayName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  if (!password) return null;

  const testResult = zxcvbn(password);
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

const PasswordInputWithToggle = ({
  field,
  placeholder,
  showPassword,
  togglePasswordVisibility,
}: {
  field: any;
  form: any;
  placeholder: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}) => (
  <div className="relative w-full">
    <input
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 bg-black rounded-lg outline outline-1 outline-neutral-200 text-white text-base font-normal pr-10"
      {...field}
    />
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
  </div>
);

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setIsLoading(true);
    const { displayName, email, password } = values;

    const payload = {
      displayName,
      email,
      password,
    };

    try {
      // First, register the user
      const registerResponse = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.error || "Registration failed");
      }

      // If registration is successful, automatically log in
      const loginResponse = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!loginResponse.ok) {
        throw new Error("Auto-login failed after registration");
      }

      const loginData = await loginResponse.json();
      
      // Store tokens
      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("refreshToken", loginData.refreshToken);

      toast.success("Account created and logged in successfully!");
      navigate(ROUTES.user.profile);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      setErrors({
        email: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="w-full min-h-screen bg-neutral-900 flex flex-col">
      {/* Header */}
      <div className="w-full px-12 py-6 bg-neutral-900 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.20)] outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-12">
        <div className="flex-1 flex justify-center items-center gap-2.5">
          <div className="flex items-center gap-4">
            <img src={Icon1} alt="Logo part 1" className="h-10" />
            <img src={Icon2} alt="Logo part 2" className="h-10" />
          </div>
        </div>
      </div>

      {/* Signup Form - Flex-grow to take remaining space */}
      <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="w-[560px] p-6 flex flex-col justify-center items-center gap-2">
            <div className="w-full flex justify-center items-center gap-2.5">
              <h1 className="flex-1 text-left text-white text-3xl font-bold">
                Sign Up
              </h1>
            </div>
            <div className="w-full pt-2 flex justify-center items-center gap-2.5 mb-6">
              <p className="flex-1 text-left text-white text-2xl font-normal">
              Use the links below to connect your profile
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="w-full space-y-4">
                  {/* Full Name */}
                  <div className="w-full flex flex-col justify-center items-center">
                    <Field
                      name="displayName"
                      type="text"
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 bg-black rounded-lg outline outline-1 outline-neutral-200 text-white text-base font-normal"
                    />
                    <ErrorMessage
                      name="displayName"
                      component="p"
                      className="text-red-600 text-sm mt-1 w-full text-left"
                    />
                  </div>

                  {/* Email */}
                  <div className="w-full pt-4 flex flex-col justify-center items-center">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full px-3.5 py-2.5 bg-black rounded-lg outline outline-1 outline-neutral-200 text-white text-base font-normal"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-600 text-sm mt-1 w-full text-left"
                    />
                  </div>

                  {/* Password */}
                  <div className="w-full pt-4 flex flex-col justify-center items-center">
                    <Field
                      name="password"
                    >
                      {({ field, form }: { field: any; form: any }) => (
                        <PasswordInputWithToggle
                          field={field}
                          form={form}
                          placeholder="Password"
                          showPassword={showPassword}
                          togglePasswordVisibility={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-600 text-sm mt-1 w-full text-left"
                    />
                    <PasswordStrengthMeter password={values.password} />
                  </div>

                  {/* Confirm Password */}
                  <div className="w-full pt-4 flex flex-col justify-center items-center">
                    <Field
                      name="confirmPassword"
                    >
                      {({ field, form }: { field: any; form: any }) => (
                        <PasswordInputWithToggle
                          field={field}
                          form={form}
                          placeholder="Confirm Password"
                          showPassword={showConfirmPassword}
                          togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="confirmPassword"
                      component="p"
                      className="text-red-600 text-sm mt-1 w-full text-left"
                    />
                  </div>

                  <div className="w-full pt-6 flex flex-col justify-center items-center gap-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full h-11 px-3.5 py-2 bg-purple-400 rounded-lg outline outline-1 outline-purple-400 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="text-white text-lg font-normal">
                        {isLoading ? "Creating account..." : "Create Account"}
                      </span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="w-full pt-6 flex justify-between items-center">
              <div className="w-36 self-stretch flex justify-start items-center gap-2.5">
                <div className="w-28 h-px bg-neutral-200"></div>
              </div>
              <div className="flex-1 flex justify-center items-center gap-2.5">
                <span className="text-neutral-200 text-sm font-normal">
                  or continue with
                </span>
              </div>
              <div className="w-36 self-stretch flex justify-end items-center gap-2.5">
                <div className="w-28 h-px bg-neutral-200"></div>
              </div>
            </div>

            <div className="w-full pt-6 flex justify-center items-center gap-6">
              <button
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
                className={`flex-1 px-6 py-3.5 bg-black rounded-lg outline outline-1 outline-neutral-200 flex justify-center items-center gap-2.5 ${
                  isGoogleLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-neutral-200 text-lg font-normal">
                  Sign in
                </span>
              </button>
              <button className="flex-1 px-6 py-3.5 bg-black rounded-lg outline outline-1 outline-neutral-200 flex justify-center items-center gap-2.5">
                <FaGithub className="w-5 h-5 text-white" />
                <span className="text-neutral-200 text-lg font-normal">
                  Sign in
                </span>
              </button>
              <button className="flex-1 px-6 py-3.5 bg-black rounded-lg outline outline-1 outline-neutral-200 flex justify-center items-center gap-2.5">
                <div className="relative w-5 h-5">
                  <div className="absolute w-2.5 h-2.5 left-0 top-0" style={{ backgroundColor: 'rgba(224, 30, 90, 1)' }}></div>
                  <div className="absolute w-2.5 h-2.5 left-0 bottom-0" style={{ backgroundColor: 'rgba(236, 178, 46, 1)' }}></div>
                  <div className="absolute w-2.5 h-2.5 right-0 top-0" style={{ backgroundColor: 'rgba(54, 197, 240, 1)' }}></div>
                  <div className="absolute w-2.5 h-2.5 right-0 bottom-0" style={{ backgroundColor: 'rgba(46, 182, 125, 1)' }}></div>
                </div>
                <span className="text-neutral-200 text-lg font-normal">
                  Sign in
                </span>
              </button>
            </div>

            <div className="w-full pt-6 flex justify-center items-center gap-2.5">
              <p className="text-center">
                <span className="text-neutral-200 text-xl font-normal">
                  Already have Account?{" "}
                </span>
                <button
                  onClick={() => navigate(ROUTES.authentication.login)}
                  className="text-purple-400 text-xl font-normal underline hover:text-purple-300 focus:outline-none"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;