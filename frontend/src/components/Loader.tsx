// // src/components/Loader.tsx
// import { motion } from "framer-motion";

// const Loader = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-[#1A3636]">
//       <motion.div
//         animate={{
//           rotate: 360,
//         }}
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//         className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full"
//       />
//     </div>
//   );
// };

// export default Loader;

import React from "react";
import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="theme-loader"></div>
    </div>
  );
};

export default Loader;
