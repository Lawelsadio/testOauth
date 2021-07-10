import React, { Component } from "react";
import { Card, Button, ListGroup,Form} from 'react-bootstrap';
import axios from 'axios';
export default class DetailFacture extends Component {

  constructor(props) {
    super(props)
    this.onChangeFactureName = this.onChangeFactureName.bind(this);
    this.onChangeFactureMontant = this.onChangeFactureMontant.bind(this);

    // State
    this.state = {
      name: '',
      montant: '',
      image:''
        }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/factures/detail/' + this.props.match.params.id)
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

// href={"/userfacture/"+this.state.userId}

  render() {
    return (<div className="form-wrapper">
      <Card style={{ width: '30rem' }}>
  <Card.Img variant="top" src={`http://localhost:8080/${this.state.image}`} />
 
  <ListGroup className="list-group-flush">
    <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Label type="text"  > {this.state.name} </Form.Label>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Montant</Form.Label>
          <Form.Label>{this.state.montant} </Form.Label>
      </Form.Group>
  
  </ListGroup>
  <Card.Body>
  <Button variant="danger" href={`/userfacture/${this.state.userId}`} size="lg" block="block" type="submit">
       ok
        </Button>
  </Card.Body>
</Card>

 </div>);
  }
}
