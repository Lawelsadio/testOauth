import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserFactureTable from './UserFactureTable';

export default class UsersFactures extends Component {

  constructor(props) {
    super(props)
    this.state = {
        factures: []
    };
  }

  getFactures() {
    axios.get(`http://localhost:8080/factures/userfacture/${this.props.match.params.userId}`)
      .then(res => {
        console.log(res)

        this.setState({ factures: [...this.state.factures, ...res.data] });
      });
  };

  componentDidMount() {
    console.log("componentDidMount")
    this.getFactures(this.state.page);  
  }

  DataTable() {
    return this.state.factures.map((res, i) => {
      if(res.montant!=0 && res.montant!=null){
      return <UserFactureTable obj={res} key={i} />
      }
    });
  }

  DataTable2() {
    return this.state.factures.map((res, i) => {
      if(res.montant==0 || res.montant== null ){  
      return <UserFactureTable obj={res} key={i} />
    }
    });
  }

  render() {
    return (
      <div className="row">        
      <div className="col table-wrapper">
      <b>Facture traité</b>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Montant</th>
              <th>Action</th>
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
  
  
      <div className="col table-wrapper">
      <b>Facture Non traité</b>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Name</th>
              <th>Montant</th>
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
      </div>
    
  );
  }

  
}