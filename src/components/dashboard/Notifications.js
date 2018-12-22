import React from 'react';
import moment from "moment";
import Link from "react-router-dom/es/Link";

const Notifications = (props) => {
    const { notifications } = props;
    return (
       <div className="section">
           <div className="card z-depth-0">
               <div className="card-content">
                   <span className="card-title">Notifications</span>
                   <ul className="notifications">
                       { notifications && notifications.map( notification => {
                           return (
                               <li key={ notification.id }>
                                   <Link to={`/user/${ notification.userId }`} className="pink-text">{ notification.user } </Link>
                                   <span>{ notification.content }</span>
                                   <div className="grey-text note-date">
                                       { moment(notification.time.toDate()).fromNow() }
                                   </div>
                               </li>
                           )
                       }) }
                   </ul>
               </div>
           </div>
       </div>
    )
};

export default Notifications;