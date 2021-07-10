import React, { Component } from "react";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import axios from 'axios';
let assistantId,userId,adminId,assistant,user,admin

export default class EditUser extends Component {

  constructor(props) {
    super(props)
    this.onChangeUserUsername = this.onChangeUserUsername.bind(this);
    this.onChangeUserRoles = this.onChangeUserRoles.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeRoleName = this.onChangeRoleName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      username: '',
      roles: '',
      email: '',
      name:'',
      userRoles:[]
    }
  }

  getRoles(page) {
    axios.get('http://localhost:8080/users/test/AllRoles')
    .then(resp => {
      console.log(resp)
      this.setState({ userRoles: [...this.state.userRoles, ...resp.data] });
    });  
  }

  getUsers(page){
    axios.get('http://localhost:8080/users/test/edit/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        username: res.data.username,
        roles: res.data.roles,
        email: res.data.email
      });

      var allroles = this.state.userRoles.map(r => {
        return {
          name:r.name,
          _id:r._id
        }
      }) 

      for(let i=0; i<allroles.length; i++){
        if(allroles[i].name==="assistant"){
          assistant = allroles[i].name
          assistantId = allroles[i]._id
        }else if(allroles[i].name==="admin"){
          admin = allroles[i].name
          adminId = allroles[i]._id
        }else{
          user = allroles[i].name
          userId = allroles[i]._id
        }
      };

      if(this.state.roles==userId){
        this.setState({
          name: user
        });
      }else if(this.state.roles==adminId){
        this.setState({
          name: admin
        });
      }else if(this.state.roles==assistantId){
        this.setState({
          name: assistant
        });
      }
      })
      .catch((error) => {
        console.log(error);
      })
    };

  componentDidMount() {
    this.getRoles(this.state.page);
    this.getUsers(this.state.page); 
  }

  onChangeUserUsername(e) {
    this.setState({ username: e.target.value })
  }

  onChangeUserRoles(e) {
    this.setState({ roles: e.target.value })
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeRoleName(e) {
   
    this.setState({ name: e.target.value })

    var allroles = this.state.userRoles.map(r => {
      return {
        name:r.name,
        _id:r._id
      }
    } ) 
    for(let i=0; i<allroles.length; i++){
      if(allroles[i].name==="assistant"){
        assistant = allroles[i].name
        assistantId = allroles[i]._id
      }else if(allroles[i].name==="admin"){
        admin = allroles[i].name
        adminId = allroles[i]._id
      }else{
        user = allroles[i].name
        userId = allroles[i]._id
      }
    };

    switch (e.target.value) {
      case "assistant": 
      this.setState({ roles: assistantId })
      break
      case "user": 
      this.setState({ roles: userId })
      break
      case "admin":
      this.setState({ roles: adminId })
      break  
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const userObject = {
      username: this.state.username,
      roles: this.state.roles,
      email: this.state.email
    };

    axios.put('http://localhost:8080/users/test/update/' + this.props.match.params.id, userObject)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    this.props.history.push('/test/allUsers')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label><b>Username :</b>  {this.state.username}</Form.Label>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label><b> Role : </b>{this.state.name}</Form.Label>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label><b>Email : </b>{this.state.email}</Form.Label>
        </Form.Group>
     <div class="form-group">
      <Form.Control required as="select" onChange={this.onChangeRoleName} multiple>
            {this.state.userRoles.map(r => (  
            <option 
              key={r._id} 
              value={r.name}
              >
              {r.name} 
            </option>))}
        </Form.Control>
     </div>
    <Button variant="danger" size="lg" block="block" type="submit">
       Update Role
     </Button>
      </Form>
    </div>);
  }
}
