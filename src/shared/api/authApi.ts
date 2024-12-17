import axios from "axios";

// Create global axios instance
export const api = axios.create({
  baseURL: "http://localhost:3000", // Update with your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Function to initiate Google OAuth login
export const initiateGoogleLogin = () => {
  window.location.href = "http://localhost:3000/auth/google";
};

// Function to handle the callback and get the token
export const handleGoogleCallback = async (queryString: string) => {
  try {
    const response = await api.get(`/auth/google/callback${queryString}`);
    return response.data; // { message: 'Google login successful', token: '...' }
  } catch (error) {
    console.error("Google login callback error:", error);
    throw error;
  }
};
