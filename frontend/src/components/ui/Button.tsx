import React from "react";

import { cn } from "@/lib/utils";

interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Button = ({ children, onClick }: IButtonProps) => {
  return (
    <button
      className={cn(
        "!bg-red-600 hover:!bg-red-700 transition duration-300 py-1 px-4 rounded-lg font-semibold"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
