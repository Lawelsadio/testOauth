import React, { Component } from "react";
import axios from 'axios';
import { Row } from 'react-bootstrap'
import FactureListe from './facture-liste.component';

export default class FList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        factures: []
    };
  }

  getFactures() {

    axios.get(`http://localhost:8080/factures/factures/`)
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