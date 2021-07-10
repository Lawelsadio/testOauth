import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';
export default class UserList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  getUsers(page) {
    this.setState({ loading: true });
    axios.get(`http://localhost:8080/users/test/allUsers`)
      .then(res => {
        this.setState({ users: [...this.state.users, ...res.data] });
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.getUsers(this.state.page);
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPhoto = this.state.users[this.state.users.length - 1];
      const curPage = lastPhoto
      this.getUsers(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }


  DataTable2() {
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable2()}
        </tbody>
      </Table>
      <div
        ref={loadingRef => (this.loadingRef = loadingRef)} >
      </div>
    </div>
    </div>);
  }

  
}