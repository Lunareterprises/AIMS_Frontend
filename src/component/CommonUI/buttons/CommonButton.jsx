import React from 'react';

function CommonButton({ label, ...props }) {
  return (
    <button style={{ cursor: 'pointer' }} {...props}>
      {label}
    </button>
  );
}

export default CommonButton;
