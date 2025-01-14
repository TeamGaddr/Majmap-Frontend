import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RootLayout from "./app/root-layout";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="760399119728-13dkae27q63j9sfppmfrfmg49tg46hkb.apps.googleusercontent.com">
    <StrictMode>
      <RootLayout />
    </StrictMode>
  </GoogleOAuthProvider>
);
