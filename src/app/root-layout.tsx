import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "../context/theme/ThemeProvider";
import "src/global.css";

// Layouts
import HeaderFooterLayout from "src/layout/header-footer.layout";
import SidebarLayout from "src/layout/sidebar.layout";

// Pages
import ROUTES from "src/shared/static/router.data";
import RootPage from "./pages/landing/root-page";
import About from "./pages/about/About";
import Posts from "./pages/posts/Posts";
import SignIn from "./pages/auth/signIn/SignIn.page";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/auth/signup/Signup.page";
import WorkflowPage from "./pages/dashboard/workflow.page";
import UploadPage from "./pages/dashboard/upload.page";
import GeneratePage from "./pages/dashboard/generate.page";
import TemplatesPage from "./pages/dashboard/templates.page";
import StylingPage from "./pages/dashboard/create.page";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RoutingComponent() {
  const location = useLocation();

  useEffect(() => {
    // Handle OAuth redirect with tokens in hash
    if (location.hash.includes('access_token')) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        // Store tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Clean the URL by removing the hash
        window.history.replaceState({}, '', ROUTES.user.profile);
      }
    }
  }, [location]);

  return (
    <Routes location={location}>
      {/* Public routes with header/footer */}
      <Route element={<HeaderFooterLayout />}>
        <Route path={ROUTES.public.root} element={<RootPage />} />
        <Route path={ROUTES.public.about} element={<About />} />
        <Route path={ROUTES.public.posts} element={<Posts />} />
        <Route path={ROUTES.authentication.login} element={<SignIn />}>
  <Route path=":error" element={<SignIn />} />
</Route>
        <Route path={ROUTES.authentication.register} element={<Signup />} />
        <Route path={ROUTES.user.profile} element={<Profile />} />
      </Route>

      {/* Dashboard routes with sidebar */}
      <Route element={<SidebarLayout />}>
        <Route path={ROUTES.dashboard.root} element={<WorkflowPage />} />
        <Route path={ROUTES.dashboard.workflow} element={<WorkflowPage />} />
        <Route path={ROUTES.dashboard.upload} element={<UploadPage />} />
        <Route path={ROUTES.dashboard.generate} element={<GeneratePage />} />
        <Route path={ROUTES.dashboard.templates} element={<TemplatesPage />} />
        <Route path={ROUTES.dashboard.styling} element={<StylingPage />} />
      </Route>
    </Routes>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          {/* Background with dot grid */}
          <div className="fixed inset-0 bg-[#1b1b1b] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 viewBox=%220 0 400 400%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3Ccircle cx=%22200%22 cy=%2220%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3Ccircle cx=%22200%22 cy=%22200%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3Ccircle cx=%2220%22 cy=%22200%22 r=%2210%22 fill=%22%23ffffff%22 /%3E%3C/svg%3E')] bg-[length:50px_50px]"></div>
          
          <div className="relative z-10">
            <RoutingComponent />
            <ScrollToTop />
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}