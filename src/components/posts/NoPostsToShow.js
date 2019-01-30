import React from 'react';
import { Link } from 'react-router-dom';

const NoPostsToShow = () => {
  return (
    <div className="card z-depth-0">
      <div className="card-content grey-text text-darken-3">
        <h3>Hey!</h3>
        <p>It seems like you haven`t post anything yet</p>
        <p><Link to={'/create'}>Let`s fix that!</Link></p>
      </div>
    </div>
  );
};

export default NoPostsToShow;

