import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import AppRouter from "./routes/AppRouter";

const App: React.FC = () => {
  return (
    <Router>
        <button
          className="bg-gold-600 text-black px-6 py-3 rounded-lg font-semibold shadow-md 
                    scale-50 hover:scale-100 active:scale-95 
                    transition-all duration-300 ease-in-out 
                    hover:bg-gold-400 
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          Create Project
        </button>

      <div className="flex h-screen">
        {/* <Sidebar /> */}
        <AppRouter />
      </div>
    </Router>
  );
};

export default App;
