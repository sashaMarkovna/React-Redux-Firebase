import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Notifications extends Component {

  render() {
    const { notifications } = this.props;

    const userProfileToggleLink = (id, name) => {
      return (<Link to={`/user/${id}`} className="pink-text" onClick={this.props.toggleShowNotifications}>{ name }</Link>);
    };

    const contentToggleLink = (id, content) => {
      return (<Link className="teal-text text-lighten-1" to={`/project/${id}`} onClick={this.props.toggleShowNotifications}> { content }</Link>);
    };

    return (
      <ReactCSSTransitionGroup
        transitionName="notifications__sidebar"
        transitionAppear transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="card notifications-card">
          <div className="card-content">
            <span className="card-title">Notifications</span>
            <ul className="notifications__list" id="notificationsList">
              { notifications.length ? notifications.map((notification) => {
                return (
                  <li key={notification.id}>
                    <div>
                      { userProfileToggleLink(notification.userId, notification.user) }
                      <span> { notification.action }</span>
                      {
                        notification.content === 'post'
                        ? contentToggleLink(notification.projectId, notification.content)
                        : <span>{ notification.content }</span>
                      }
                    </div>
                    <div className="grey-text note-date">
                      {moment(notification.time.toDate()).fromNow()}
                    </div>
                  </li>
                );
              }) : <p className="teal-text text-lighten-1">Nothing here yet...</p>}
            </ul>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Notifications;
