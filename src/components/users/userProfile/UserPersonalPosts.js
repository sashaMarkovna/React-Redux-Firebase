import React, { Component, Fragment } from 'react';
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import ProjectsMasonryLayout from "../../projects/ProjectsMasonryLayout";
import Spinner from "../../general/Spinner";
import Search from "../../general/Search";
import { cleanProjectState, searchUserPersonalProject } from "../../../store/actions/projectActions";

class UserPersonalPosts extends Component {

    componentDidMount() {
        this.props.searchUserPersonalProject(this.props.id, '');
    }

    componentWillUnmount() {
        this.props.cleanProjectState();
    }

    handleSearch = (searchText) => {
        this.props.searchUserPersonalProject(this.props.id, searchText);
    };

    render() {

        return (
            <Fragment>
                <Search handleSearch={ this.handleSearch }/>
                {
                    isLoaded(this.props.searchResults) && this.props.searchResults
                        ? <ProjectsMasonryLayout projects={this.props.searchResults}/>
                        : <Spinner/>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProjects: state.firestore.ordered.userProjects,
        searchResults: state.project.searchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchUserPersonalProject: (userId, searchText) => dispatch(searchUserPersonalProject(userId, searchText)),
        cleanProjectState: () => dispatch(cleanProjectState())
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        return [{
            collection: 'projects',
            where: ['authorId', '==', props.id],
            orderBy: ['createdAt', 'desc'],
            storeAs: 'userProjects'
        }]
    })
)(UserPersonalPosts);