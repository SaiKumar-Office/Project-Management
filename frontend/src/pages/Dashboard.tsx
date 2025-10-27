import React from "react";
import AnimatedWrapper from "../components/AnimatedWrapper";

const Dashboard: React.FC = () => {
  return (
    <AnimatedWrapper>
      <div className="ml-60 mt-16 p-8 min-h-screen bg-[#0d1b2a] text-[#e0e1dd]">
        <h2 className="text-3xl font-bold mb-6 text-[#f4a261]">Dashboard</h2>
        <p>Welcome to your project management tool dashboard!</p>
      </div>
    </AnimatedWrapper>
  );
};

export default Dashboard;
