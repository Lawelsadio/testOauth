import React, { Component } from "react";
import axios from 'axios';
import { Row } from 'react-bootstrap'
import FactureListe from './facture-liste.component';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";



export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      factures: []
    };
  }
  /*
  getFactures() {
    axios.get(`http://localhost:8080/factures/factures/`)
      .then(res => {
        this.setState({ factures: [...this.state.factures, ...res.data] });
      });
  }
  componentDidMount() {
    this.getFactures(this.state.page);
    
  }

*/
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.id)

     axios.get('http://localhost:8080/factures/factures/', { headers: authHeader() })
    .then(
      response => {
        this.setState({ factures: [...this.state.factures, ...response.data] });

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
    return this.state.factures.map((res, i) => {
      return <FactureListe obj={res} key={i} />;
    });
  }

  render() {
    return (
        <Row md={3}>

           
     {this.DataTable()}
     </Row>
    
  );
  }
}
