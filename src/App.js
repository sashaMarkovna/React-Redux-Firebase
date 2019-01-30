import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/layout/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import PostDetails from './components/posts/PostDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreatePost from './components/posts/CreateProject';
import Settings from './components/users/settings/Settings';
import DeleteAccount from './components/users/settings/DeleteAccount';
import UserProfile from './components/users/userProfile/UserProfile';
import UpdatePost from './components/posts/UpdatePost';
import NotificationsBadge from './components/layout/notifications/NotificationsBadge';
import PageNotFound from './components/general/PajeNotFound';
import UsersList from './components/users/UsersList';

class App extends Component {

  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          { auth.uid ? <NotificationsBadge /> : null }
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/post/:id" component={PostDetails} />
            <Route path="/post/:id/edit" component={UpdatePost} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create/:filePath" component={CreatePost} />
            <Route path="/community" component={UsersList} />
            <Route exact path="/user/:id" component={UserProfile} />
            <Route exact path="/user/:id/settings" component={Settings} />
            <Route path="/user/:id/:profileContent" component={UserProfile} />
            <Route path="/delete-user/:id" component={DeleteAccount} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(App);
