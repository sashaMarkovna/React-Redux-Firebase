import React from 'react';
import Masonry from "react-masonry-component";
import {Link} from "react-router-dom";
import ProjectSummary from "./ProjectSummary";
import NoProjectsToShow from "./NoProjectsToShow";

const ProjectsMasonryLayout = ({projects}) => {

    const masonryOptions = {
        transitionDuration: 0
    };

    const imagesLoadedOptions = {
        columnWidth: ".grid-item",
        itemSelector: ".grid-item",
        percentPosition: true,
        gutter: 10,
        fitWidth: true,
    };

    return (
        <div>
            { projects.length ? (
                <Masonry
                    className={ 'masonry' }
                    elementType={ 'div' }
                    options={masonryOptions}
                    disableImagesLoaded={ false }
                    updateOnEachImageLoad={ false }
                    imagesLoadedOptions={ imagesLoadedOptions }
                >
                    { projects.map(project => {
                        return (
                            <Link className="grid-item" to={ '/project/' + project.id } key={ project.id }>
                                <ProjectSummary project={ project } />
                            </Link>
                        )
                    }) }
                </Masonry>

            ) : <NoProjectsToShow/> }
        </div>
    )
};

export default ProjectsMasonryLayout;