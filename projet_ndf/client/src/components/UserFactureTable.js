import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class Facture extends Component {

    render() {
        return (
          <tr>
{/* <Card.Img src={`http://localhost:8080/${this.props.obj.image}`} variant='top' /> */}

<td>{this.props.obj.name}</td>
<td>{this.props.obj.montant}</td>
<td>
<Link className="edit-link" to={"/edit/" + this.props.obj._id}>
    < Button size="sm" variant="danger">Edit</Button> 

    </Link>
    <Link className="edit-link" to={"/detail/" + this.props.obj._id}>
      < Button size="sm" variant="danger">Detail</Button> 
    </Link>
    <Link className="edit-link" to={"/detail-facture/" + this.props.obj._id}>

    <Button onClick={this.deleteFacture} size="sm" variant="danger">Delete</Button>
    </Link>
</td>
</tr>
        );
    }
}

