import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/hooks/useTheme';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import Header from './layout/header/header.layout';
import Footer from './layout/footer/footer.layout';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
    <Header/>
      <button
        onClick={toggleTheme}
        className="p-2 m-4 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts*" element={<Posts/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
