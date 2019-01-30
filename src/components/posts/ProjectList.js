import React from 'react';
import { Link } from 'react-router-dom';
import PostSummary from './PostSummary';
import NoPostsToShow from './NoPostsToShow';


const ProjectList = ({ addClass, posts }) => {
  return (
    <div className="project-list section">
      { posts.length ? (posts.map((post) => {
        return (
          <Link to={`/post/${post.id}`} key={post.id}>
            <PostSummary addClass={addClass} project={post} />
          </Link>
        );
      })) : (<NoPostsToShow />) }
    </div>
  );
};

export default ProjectList;
