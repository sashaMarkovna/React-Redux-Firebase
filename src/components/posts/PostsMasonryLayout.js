import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';
import PostSummary from './PostSummary';
import NoPostsToShow from './NoPostsToShow';


const PostsMasonryLayout = ({ posts }) => {
  const masonryOptions = {
    transitionDuration: 0,
  };

  const imagesLoadedOptions = {
    columnWidth: '.grid-item',
    itemSelector: '.grid-item',
    percentPosition: true,
    gutter: 10,
    fitWidth: true,
  };

  return (
    <div>
      { posts.length ?
        (<Masonry
          className={'masonry'}
          elementType={'div'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          imagesLoadedOptions={imagesLoadedOptions}
        >
          { posts.map((post) => {
            return (
              <Link className="grid-item" to={`/post/${post.id}`} key={post.id}>
                <PostSummary project={post} />
              </Link>
            );
          }) }
        </Masonry>)
        : <NoPostsToShow /> }
    </div>
  );
};

export default PostsMasonryLayout;
