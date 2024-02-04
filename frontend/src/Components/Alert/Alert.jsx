import React from 'react';
import { MdDangerous } from 'react-icons/md';

const Alert = ({ error, cls }) => {
  return (
    <div className="alert alert-danger align-items-center p-1 justify-content-center w-100" style={cls} role="alert">
      <MdDangerous />
      <div className='px-3'>
        {error}
      </div>
      
    </div>
  );
}

export default Alert;