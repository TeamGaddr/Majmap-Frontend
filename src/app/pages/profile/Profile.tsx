import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserData {
  id: string;
  email: string;
  displayName?: string;
  profilePicture?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthentication = async () => {
      // Check for tokens in URL hash (from Google OAuth redirect)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Clear the hash from URL
        window.history.pushState({}, document.title, window.location.pathname);
      }

      // Verify we have a token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Please login to view your profile');
        navigate('/login');
        return;
      }

      await fetchUserData(token);
    };

    const fetchUserData = async (token: string) => {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Profile fetch error:', error);
        toast.error('Failed to load profile data');
        // If there's an error, redirect to login
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthentication();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl mb-4">Profile</h1>
      {userData ? (
        <div className="text-center space-y-4">
          <p className="text-green-500 text-xl">Welcome, {userData.email}</p>
          {userData.displayName && (
            <p className="text-white">Name: {userData.displayName}</p>
          )}
          {userData.profilePicture && (
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              className="w-24 h-24 rounded-full mx-auto"
            />
          )}
        </div>
      ) : (
        <p className="text-red-500">Failed to load profile data</p>
      )}
    </div>
  );
};

export default Profile;