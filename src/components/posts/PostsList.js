import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import PostSummary from './PostSummary';
import NoPostsToShow from './NoPostsToShow';

class PostsList extends Component {

  render() {
    const { posts } = this.props;
    const masonryOptions = { transitionDuration: '500ms' };
    const postsLength = posts && Object.keys(posts).length;
    const imagesLoadedOptions = {
      columnWidth: '.grid-item',
      itemSelector: '.grid-item',
      percentPosition: true,
      gutter: 10,
      fitWidth: true,
    };

    return (
      <div>
        { postsLength ?
          <Masonry
            className={'masonry'}
            elementType={'div'}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad
            imagesLoadedOptions={imagesLoadedOptions}
          >
            { posts.map((post) => {
              console.log('posts list', posts);
              return (
                <Link className="grid-item" to={`/post/${post.id}`} key={post.id}>
                  <PostSummary post={post} />
                </Link>
              );
            })}
          </Masonry>
                : <NoPostsToShow />
            }
      </div>
    );
  }
}

export default PostsList;
