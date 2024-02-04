import React from 'react';

const Input = ({ label, type, value, onChange, placeholder, name, accept }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" value={value} name={name} accept={accept} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Input;