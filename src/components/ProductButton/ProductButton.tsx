import React from "react";
import "./ProductButton.css";

interface ProductButtonProps {
  buttonText: string;
  handleClick: () => void;
  customStyle?: React.CSSProperties;
}

export const ProductButton: React.FC<ProductButtonProps> = ({
  buttonText,
  handleClick,
  customStyle,
}) => (
  <button onClick={handleClick} className="text-white h-[40px] flex items-center justify-center" style={customStyle}>
    {buttonText}
  </button>
);
