import React from 'react';
import moment from 'moment';
import PreviewPicture from '../general/PreviewPicture';

const PostSummary = ({ addClass, post }) => {
  const masonryWidth = { width: '90%' };
  return (
    <div className="card z-depth-0 project-summary" style={masonryWidth}>
      <div className="card-content grey-text text-darken-3 project-summary__content">
        { post.headlineBanner ? <div className="project-summary__banner" ><PreviewPicture pictureUrl={post.headlineBanner} /></div> : null }
        <span className="card-title project-summary__title">{ post.title }</span>
        <p>Posted by { post.author }</p>
        <p className="grey-text">{ moment(post.createdAt.toDate()).calendar() }</p>
      </div>
    </div>
  );
};

export default PostSummary;
