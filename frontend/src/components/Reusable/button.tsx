import React from "react";

interface ButtonProps {
  text: string;
  customClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, customClass = "", onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 w-60 rounded-full mt-2 ${customClass}`}
  >
    {text}
  </button>
);

export default Button;
