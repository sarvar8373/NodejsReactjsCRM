import React from 'react';

const Message = ({ status, message }) => {
  return (
    <div
      className={`alert alert-${status === 'success' ? 'success' : 'danger'}`}
      role="alert"
      style={{
        display: status ? 'block' : 'none',
      }}
    >
      {message}
    </div>
  );
};

export default Message;