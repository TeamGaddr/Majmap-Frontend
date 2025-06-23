import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import ROUTES from "src/shared/static/router.data";
import Icon1 from "src/assets/icon1.svg";
import Icon2 from "src/assets/icon2.svg";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

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

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
async (values: SignInFormValues) => {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Invalid email or password");
    }

    const data = await response.json();

    // Store tokens
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    toast.success("Sign in successful!");

    // Redirect logic based on isFirstLogin
    if (data.isFirstLogin) {
      navigate(ROUTES.user.profile, { replace: true });
    } else {
      navigate(ROUTES.user.dashboard, { replace: true });
    }
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Login failed. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};
  const handleFormSubmit = async (values: SignInFormValues) => {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Invalid email or password");
    }

    const data = await response.json();

    // Store tokens
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    toast.success("Sign in successful!");

    // Redirect logic based on isFirstLogin
    if (data.isFirstLogin) {
      navigate(ROUTES.user.profile, { replace: true });
    } else {
      navigate(ROUTES.user.dashboard, { replace: true });
    }
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Login failed. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};


  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="w-full h-screen bg-neutral-900">
      {/* Header */}
      <div className="w-full px-12 py-6 bg-neutral-900 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.20)] outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-12">
        <div className="flex-1 flex justify-center items-center gap-2.5">
          <div className="flex items-center gap-4">
            <img src={Icon1} alt="Logo part 1" className="h-10" />
            <img src={Icon2} alt="Logo part 2" className="h-10" />
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full h-[calc(100vh-80px)] px-28 flex justify-center items-center gap-20">
        <div className="w-[560px] p-6 flex flex-col justify-center items-center gap-2">
          <div className="w-full flex justify-center items-center gap-2.5">
            <h1 className="flex-1 text-left text-white text-3xl font-bold">
              Login
            </h1>
          </div>
          <div className="w-full pt-2 flex justify-center items-center gap-2.5">
            <p className="flex-1 text-left text-white text-2xl font-normal">
            Or sign up using the link below
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full space-y-4">
                <div className="w-full pt-6 flex flex-col justify-center items-center">
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

                <div className="w-full pt-2 flex flex-col justify-center items-center">
                  <Field name="password">
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
                  <div className="w-full flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-purple-400 text-sm font-normal hover:underline focus:outline-none"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <div className="w-full pt-6 flex flex-col justify-center items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`w-full h-11 px-3.5 py-2 bg-purple-400 rounded-lg outline outline-1 outline-purple-400 ${
                      isSubmitting || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <span className="text-white text-lg font-normal">
                      {isSubmitting || isLoading ? "Signing in..." : "Sign In"}
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
                or login with
              </span>
            </div>
            <div className="w-36 self-stretch flex justify-end items-center gap-2.5">
              <div className="w-28 h-px bg-neutral-200"></div>
            </div>
          </div>

          <div className="w-full pt-6 flex justify-center items-center gap-6">
            <button
              onClick={handleGoogleSignIn}
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
                Don't have an Account?{" "}
              </span>
              <button
                onClick={() => navigate(ROUTES.authentication.register)}
                className="text-purple-400 text-xl font-normal underline hover:text-purple-300 focus:outline-none"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}