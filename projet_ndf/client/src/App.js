import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton,Dropdown } from 'react-bootstrap';

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAssistant from "./components/board-assistant.component";
import BoardAdmin from "./components/board-admin.component";
import CreateFacture from "./components/create-facture.component";
import FList from "./components/facture.component";
import UserList from "./components/user-list.component";
import EditUser from "./components/edit-user.component";
import EditFacture from "./components/edit-facture.component";
import DetailFacture from "./components/detail-facture.component";
import UsersFactures from "./components/users-facture.component"
import UploadUserFacture from "./components/upload-userFacture.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAssistantBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showAssistantBoard: user.roles.includes("ROLE_ASSISTANT"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAssistantBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            AG FACTURE
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAssistantBoard && (
              <li className="nav-item">
                <Link to={"/assistant"} className="nav-link">
                  Assistant Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                  <DropdownButton  id="dropdown-basic-button" title="User Gestion">
                  <Link to={"/user"} className="nav-link">
                      <Dropdown.Item href="#/action-1"> 
                            Users
                      </Dropdown.Item> 
                  </Link>
                  <Link to={"/userfacture/CreateUserFacture"} className="nav-link">
                  <Dropdown.Item href="#/action-3">Upload user images</Dropdown.Item>
                  </Link>
                  </DropdownButton>
              </li>
            )}

            <li className="nav-item">
              <Link to={"/userfacture/CreateUserFacture"} className="nav-link">
              Upload user images
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/facture" component={CreateFacture} />
            <Route path="/userfacture/CreateUserFacture" component={UploadUserFacture} />
            <Route path="/factures" component={FList} />
            <Route path="/test/allUsers" component={UserList} />
            <Route path="/test/update/:id" component={EditUser} />
            <Route path="/edit/:id" component={EditFacture} />
            <Route path="/userfacture/:userId" component={UsersFactures} />
            <Route path="/detail/:id" component={DetailFacture} />
            <Route path="/assistant" component={BoardAssistant} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
