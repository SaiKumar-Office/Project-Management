// src/App.tsx
import React from "react";
import AppRouter from "./routes/AppRouter";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
