// components/common/Loader.js
import React from "react";

const Loader = ({ type = "inline", size = 6, className = "" }) => {
  const sizeClass = `h-${size} w-${size}`;
  const spinner = (
    <svg
      className={`animate-spin text-blue-500 ${sizeClass} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
      />
    </svg>
  );

  if (type === "fullscreen") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
