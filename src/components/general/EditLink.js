import React from 'react';
import {Link} from "react-router-dom";

const EditLink = (props) => {
    const { elemClass, linkTo, positionalLinkClass } = props.linkParams;

    return (
        <Link to={ linkTo } className={`edit-link edit-link__${ positionalLinkClass }`}>
            <div className={ elemClass }></div>
        </Link>
    )
};

export default EditLink;