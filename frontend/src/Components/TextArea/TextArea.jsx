import React from 'react';

const TextArea = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea type={type} rows="3" className="form-control" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default TextArea;