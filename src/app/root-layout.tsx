// src/app/root-layout.tsx
import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Context and Components
import ContextComponent from "../components/context/context.component";

// Pages
// Static Routes
import ROUTES from "src/shared/static/router.data";

// Styles
import "react-toastify/dist/ReactToastify.css";
import HeaderFooterLayout from "src/layout/header-footer.layout";
import RootPage from "./pages/landing/root-page";
import About from "./pages/about/About";
import Posts from "./pages/posts/Posts";
import SignIn from "./pages/auth/signIn/SignIn.page";
import Profile from "./pages/profile/Profile";
import "src/global.css";
import Signup from "./pages/auth/signup/Signup.page";

import WorkflowEditor from "./pages/workflow/demo.page";
import ReactFlow from "./pages/workflow/reactflow.page";
import SidebarLayout from "src/layout/sidebar.layout";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RoutingComponent() {
  return (
    <>
      <Routes>
        {/* header footer layout */}
        <Route element={<HeaderFooterLayout />}>
          {/* root page */}
          <Route path={ROUTES.root} element={<RootPage />} />
          {/* about page */}
          <Route path={ROUTES.about} element={<About />} />
          {/* posts page */}
          <Route path={ROUTES.posts} element={<Posts />} />

          {/* Authentication routes */}
          <Route path={ROUTES.authentication.login} element={<SignIn />} />
          <Route path={ROUTES.authentication.register} element={<Signup />} />

          {/* profile page */}
          <Route path={ROUTES.profile} element={<Profile />} />
        </Route>


        <Route element={<SidebarLayout />}>
          <Route path={ROUTES.dashboard.root} element={<WorkflowEditor />} />
          <Route path={ROUTES.dashboard.test} element={<ReactFlow />} />
        </Route>
      </Routes>
    </>
  );
}

export default function RootLayout() {
  return (
    // <GoogleOAuthProvider clientId={clientId}>
    <ContextComponent>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <RoutingComponent />
        </Suspense>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </BrowserRouter>
    </ContextComponent>
    // </GoogleOAuthProvider>
  );
}
