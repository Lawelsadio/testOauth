import React, { Component } from "react";
import { Button,Form} from 'react-bootstrap';

import axios from 'axios';

export default class EditFacture extends Component {

  constructor(props) {
    super(props)

    this.onChangeFactureName = this.onChangeFactureName.bind(this);
    this.onChangeFactureMontant = this.onChangeFactureMontant.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      montant: '',
      image:"",
      userId:""
        }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/factures/edit/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          montant: res.data.montant,
          image: res.data.image,
          userId: res.data.userId
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeFactureName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeFactureMontant(e) {
    this.setState({ montant: e.target.value })
  }


  onSubmit(e) {
    e.preventDefault()

    const factureObject = {
      name: this.state.name,
      montant: this.state.montant
        };
    axios.put('http://localhost:8080/factures/' + this.props.match.params.id, factureObject)
      .then((res) => {
        console.log(res.data)
        console.log('Facture successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to User List 
    this.props.history.push('/userfacture/'+this.state.userId)
  }


  render() {
    return (<div className="form-wrapper">
      <img src={`http://localhost:8080/${this.state.image}`} class="rounded mx-auto d-block" alt="le nom"/>

      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeFactureName} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Montant</Form.Label>
          <Form.Control type="text" value={this.state.montant} onChange={this.onChangeFactureMontant} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Facture
        </Button>
      </Form>

      
    </div>);
  }
}
