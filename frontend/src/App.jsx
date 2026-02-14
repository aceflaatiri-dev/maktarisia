import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    // min-h-screen ensures the page always fills the window
    <div className="flex flex-col min-h-screen bg-[#0f172a] selection:bg-green-500/30">
      {/* Notifications - Configured for a sleek dark theme */}
      <ToastContainer 
        theme="dark" 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      
      {/* Global Navigation Bar */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* The Outlet component renders the current route's component.
            I've removed the px-4 here so individual pages can control 
            their own padding (full-width hero sections vs. centered containers).
        */}
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default App;