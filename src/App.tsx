import { Routes, Route } from "react-router-dom";
// import { useTheme } from "./context/hooks/useTheme";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Header from "./layout/header/header.layout";
import Footer from "./layout/footer/footer.layout";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts*" element={<Posts />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
