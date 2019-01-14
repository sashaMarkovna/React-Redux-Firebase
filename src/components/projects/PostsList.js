import React, {Component, Fragment} from 'react';
import Masonry from "react-masonry-component";
import {Link} from "react-router-dom";
import ProjectSummary from "./ProjectSummary";
import NoProjectsToShow from "./NoProjectsToShow";
import SortedPosts from "./SortedPosts";
import Spinner from "../general/Spinner";

class PostsList extends Component {

    handleUpdate =() => {
       console.log('complete');
    };

    render() {

        const { projects, sortedProjects } = this.props;

        const masonryOptions = { transitionDuration: '500ms' };
        const projectsLength = projects && Object.keys(projects).length;
        const sortedProjectsLength = sortedProjects && Object.keys(sortedProjects).length;

        const imagesLoadedOptions = {
            columnWidth: ".grid-item",
            itemSelector: ".grid-item",
            percentPosition: true,
            gutter: 10,
            fitWidth: true
        };

        return (
            <div>
                {
                    projectsLength || sortedProjectsLength
                    ? <Masonry
                        className={ 'masonry' }
                        elementType={ 'div' }
                        options={ masonryOptions }
                        disableImagesLoaded={ false }
                        updateOnEachImageLoad={ true }
                        onImagesLoaded={this.handleUpdate}
                        onLayoutComplete={this.handleUpdate}
                        imagesLoadedOptions={ imagesLoadedOptions }>
                        {
                            sortedProjectsLength
                            ? Object.keys(sortedProjects).map( projectId => {
                                return (
                                    <Link className="grid-item" to={ '/project/' + projectId } key={ projectId }>
                                        <SortedPosts projectId={ projectId }/>
                                    </Link>
                                )
                            })
                            : projectsLength
                            ? projects.map( project => {
                                return (
                                    <Link className="grid-item" to={ '/project/' + project.id } key={ project.id }>
                                        <ProjectSummary project={ project } />
                                    </Link>
                                )
                            })
                            : <Spinner/>
                        }
                      </Masonry>
                    : <NoProjectsToShow/>
                }
            </div>
        )
    }
}

export default PostsList;