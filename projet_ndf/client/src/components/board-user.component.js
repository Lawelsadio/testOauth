import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";



export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      users: []
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.id)

     axios.get('http://localhost:8080/users/test/allUsers', { headers: authHeader() })
    .then(
      response => {
        this.setState({ users: [...this.state.users, ...response.data] });

      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  DataTable() {
    return this.state.users.map((res, i) => {
      return <UserTableRow obj={res} key={i} />; 
    });
  }

  render() {
    return (
      <div className="row">        
    <div className="col table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>email</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
      <div
        ref={loadingRef => (this.loadingRef = loadingRef)} >
      </div>
    </div>
    </div>);
  }
};
