import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import Notifications from "./Notifications";

class NotificationsBadge extends Component {

    state = {
        showNotifications: false
    };

    toggleShowNotifications = () => {
        this.setState({ showNotifications: !this.state.showNotifications });
    };

    render() {
        const { notifications } = this.props;

        return (
            <div className="section notifications">
                <div className="notification__badge fa-stack fa-1x" onClick={ this.toggleShowNotifications }>
                    <i className="notification__badge-icon fas fa-bookmark fa-stack-2x"/>
                    <span className="notification__badge-count fa fa-stack-1x">1</span>
                </div>

                { this.state.showNotifications && isLoaded(notifications) ? <Notifications toggleShowNotifications={ this.toggleShowNotifications } notifications={ notifications }/>: null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.firestore.ordered.notifications,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => {
        return [
            {collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
        ]
    })
)(NotificationsBadge);