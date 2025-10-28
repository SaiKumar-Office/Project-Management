import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1A3636] z-50">
      <motion.div
        className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <h2 className="text-gold-400 text-xl font-semibold ml-4">Loading...</h2>
    </div>
  );
};

export default Loader;
