import React from "react";

const Profile: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Profile</h1>
      {token ? (
        <p className="text-green-500">You are logged in! {token}</p>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
