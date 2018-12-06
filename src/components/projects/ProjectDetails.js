import React from 'react';

const ProjectDetails = (props) => {
    const id = props.match.params.id;

    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project Title - {id}</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem deleniti dolor dolorem ex, impedit inventore laborum natus odio omnis perspiciatis porro provident quam quidem quisquam quos, rem repellat tempora temporibus!</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by John Smith</div>
                    <div>2nd September, 2am</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
