import React from 'react';
import ProjectSummary from "./ProjectSummary";
import { Link } from 'react-router-dom';
import NoProjectsToShow from "./NoProjectsToShow";

const ProjectList = ({ projects }) => {
    return (
        <div className="project-list section">
            { projects.length ? (projects.map(project => {
                return (
                    <Link to={ '/project/' + project.id } key={ project.id }>
                        <ProjectSummary project={ project } />
                    </Link>
                )
            })) : ( <NoProjectsToShow/> ) }
        </div>
    )
};

export default ProjectList;