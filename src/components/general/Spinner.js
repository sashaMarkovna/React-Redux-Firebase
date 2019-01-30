import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="spinner">
      <Loader type="Ball-Triangle" color="#26a69a" height={150} width={150} />
    </div>
  );
};

export default Spinner;
