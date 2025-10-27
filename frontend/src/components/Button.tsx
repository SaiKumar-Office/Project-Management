// src/components/Button.tsx
import { motion } from "framer-motion";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 bg-[#FFD700] text-[#1A3636] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      type={type}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default Button;
