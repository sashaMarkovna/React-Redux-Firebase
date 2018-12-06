import React from 'react';
import ProjectSummary from "./ProjectSummary";


const ProjectList = ({ projects }) => {
    return (
        <div className="project-list section">
             {/*If we have projects => projects.map() else => do nothing*/}
            { projects && projects.map(project => {
                return (
                    <ProjectSummary project={ project } key={ project.id }/>
                )
            }) }
        </div>
    )
};

export default ProjectList;