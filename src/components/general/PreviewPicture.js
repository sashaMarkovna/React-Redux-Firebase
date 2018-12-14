import React from 'react';

const PreviewPicture = (props) => {

    const { pictureUrl } = props;

    return (
        <img className="responsive-img " src={ pictureUrl } />
    );
};

export default PreviewPicture;