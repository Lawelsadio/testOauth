import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class UserTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        axios.delete('http://localhost:8080/users/test/delete/' + this.props.obj._id)
            .then((res) => {
                console.log('User successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })

    }

    render() {
        return (

            <tr>
                <td>
                    <Link className="edit-link" to={"/userfacture/" + this.props.obj._id}>
                     {this.props.obj.username} 
                     </Link>
                </td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj._id}</td>
                <td>
                <Link className="edit-link" to={"/test/update/" + this.props.obj._id}>
    < Button size="sm" variant="danger">EditUser</Button> 
    </Link>
 
    <Link className="edit-link" to={"/detail-facture/" + this.props.obj._id}>

    <Button onClick={this.deleteFacture} size="sm" variant="danger">Delete</Button>
    </Link>
</td>
                
            </tr>
           
        );
    }
}