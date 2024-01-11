import React from 'react';
import './App.css';
//import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListUserComponent from './components/ListUserComponent';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import ViewUserSuscriptionComponent from './components/ViewUserSuscriptionComponent';


function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListUserComponent}></Route>
            <Route path="/users" component={ListUserComponent}></Route>
            <Route path="/add-user" component={CreateUserComponent}></Route>
            <Route path="/update-user/:id" component={UpdateUserComponent}></Route>
            <Route path="/view-user/:id" component={ViewUserComponent}></Route>
            <Route path="/view-user-suscription/:id" component={ViewUserSuscriptionComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
