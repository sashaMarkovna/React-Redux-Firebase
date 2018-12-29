import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import ChangeUserPhoto from "./components/users/ChangeUserPhoto";
import Settings from "./components/users/settings/Settings";
import DeleteAccount from "./components/users/settings/DeleteAccount";
import UserProfile from "./components/users/UserProfile";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
         <Navbar/>
         <Switch>
             <Route exact path="/" component={Dashboard} />
             <Route exact path="/project/:id" component={ProjectDetails} />
             <Route path="/project/:id/edit" component={CreateProject} />
             <Route path="/signin" component={SignIn} />
             <Route path="/signup" component={SignUp} />
             <Route path="/create/:filePath" component={CreateProject} />
             <Route exact path="/user/:id" component={UserProfile} />
             <Route path="/user/:id/edit-file/:filePath" component={ChangeUserPhoto} />
             <Route exact path="/user/:id/settings" component={Settings} />
             <Route path="/delete-user/:id" component={DeleteAccount} />
         </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
