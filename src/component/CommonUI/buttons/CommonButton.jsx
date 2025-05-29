import React from 'react';
function CommonButton({ label, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`cursor-pointer ${className}`.trim()}
    >
      {label}
    </button>
  );
}

export default CommonButton;
