import React from 'react';

const Btn = ({ type, onClick, label, className }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Btn;