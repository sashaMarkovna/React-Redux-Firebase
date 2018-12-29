import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link, Redirect} from 'react-router-dom';
import Spinner from "../general/Spinner";
import Masonry from 'react-masonry-component';
import ProjectSummary from "../projects/ProjectSummary";

class Dashboard extends Component {



    render() {
        const { projectsByData, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
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
            <div className="dashboard container containerInfo">
                { projectsByData && projectsByData.length ? (
                    <Masonry
                        className={'masonry'} // default ''
                        elementType={'div'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={imagesLoadedOptions} // default {}
                    >
                        { projectsByData ? projectsByData.map(project => {
                            return (
                                <Link className="grid-item" to={ '/project/' + project.id } key={ project.id }>
                                    <ProjectSummary project={ project } />
                                </Link>
                            )
                        }) : null }
                    </Masonry>

                ) : <Spinner/> }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectsByData: state.firestore.ordered.projects,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    ])
)(Dashboard);