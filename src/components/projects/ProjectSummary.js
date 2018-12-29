import React from 'react';
import moment from 'moment';
import PreviewPicture from "../general/PreviewPicture";

const ProjectSummary = ({ addClass, project }) => {

    const masonryWidth = { width: '90%' };
    return (
            <div className="card z-depth-0 project-summary" style={ masonryWidth }>
                <div className="card-content grey-text text-darken-3 project-summary__content">
                  { project.headlineBanner ? <div className="project-summary__banner" ><PreviewPicture pictureUrl={ project.headlineBanner }/></div> : null }
                  <span className="card-title project-summary__title">{ project.title }</span>
                  <p>Posted by { project.author }</p>
                  <p className="grey-text">{ moment(project.createdAt.toDate()).calendar() }</p>
                </div>
            </div>
    )
};

export default ProjectSummary;
