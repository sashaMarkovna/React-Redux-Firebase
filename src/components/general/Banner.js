import React from 'react';

const Banner = (props) => {

    const { pictureUrl } = props;
    const banner = {
        background: `url(${pictureUrl})`,
        height: '30vh'
    };

    return (
        <div className="banner" style={ banner }>

        </div>
        // <img className="responsive-img" src={ pictureUrl } />
    );
};

export default Banner;