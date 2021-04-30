import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "../styles/Login.css";
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'

const baseUrl = 'http://localhost:3001/users'
const cookies = new Cookies();
var nameLogin = "";

class Login extends React.Component {
  state={
    form:{
      username:'',
      password:''
    }
  }

  constructor() {
    super();
    this.state = { 
      showmodal: false,
      showalert: false,
    };
  }

  notFound = () => {
    this.setState({ showalert: !this.state.showalert });
  };

  notFound2 = () => {
    this.setState({ showalert: !this.state.showalert });
  };

  handleModalSuccess() {
    this.setState({ showmodal: !this.state.showmodal });
  }

  handleChange = e  => {
    this.setState({
      form:{
        ...this.state.form,[e.target.name]: e.target.value
      }
    })
  }

  startLogin = async() => {
    await axios.get(baseUrl, 
      {params: {
        username:this.state.form.username, 
        password:md5(this.state.form.password,
    )}})

    .then(response => {
      return response.data;
    })

    .then(response => {
      if(response.length > 0){

        this.handleModalSuccess();
        document.getElementById("form-username").style.backgroundColor = "#36C625";
        document.getElementById("form-username").style.color = "#fff";

        document.getElementById("form-password").style.backgroundColor = "#36C625";
        document.getElementById("form-password").style.color = "#fff";
        document.getElementById("failed").style.display = "none";
        var answer = response[0];

        cookies.set('id', answer.id, {path:"/"})
        cookies.set('username', answer.username, {path:"/"})
        cookies.set('name', answer.name, {path:"/"})
        nameLogin = this.answer.name;

    } else {
      document.getElementById("form-username").style.backgroundColor = "#FF3333";
      document.getElementById("form-username").style.color = "#FFF";

      document.getElementById("form-password").style.backgroundColor = "#FF3333";
      document.getElementById("form-password").style.color = "#FFF";
      document.getElementById("failed").style.display = "block";
      }
    })

    .catch(err=>{
      return err;
    })
  }

  componentDidMount() {
    if(cookies.get('username')){
      window.location.href="./menu"
    }
  }
  

  render() {
    return (
      <div className="principal-container">
          <div className="alert-container">
          <Alert show={this.state.showalert} variant="success">
            <p>
              I'd love to be able to help you with the registration, but it's
              just a JSON Mockup😭
              <button
                id="btn-notfound"
                onClick={this.notFound2}
                variant="outline-danger"
              >
                X
              </button>
            </p>
          </Alert>
        </div>

        <Modal show={this.state.showmodal}>
          <Modal.Header>
            Welcome {nameLogin}!
          </Modal.Header>
          <Modal.Body>Please click on the button to continue.</Modal.Body>
          <Modal.Footer />
          <Button className="btn btn-success" style={{ borderRadius: "0%" }}>
            <Link className="link" to="/menu">
              Continue
            </Link>
          </Button>
        </Modal>
        
        <h1 className="title-page">Login</h1>
        <div className="form-container">

          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Username:</Form.Label>
              <Form.Control
              id="form-username"
              name="username"
              onChange={this.handleChange}
              type="text" 
              placeholder="Username.." />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
            <Form.Label>Password:</Form.Label>

              <Form.Control 
              name="password" 
              id="form-password"
              onChange={this.handleChange}
              type="password" 
              placeholder="Password.." />
            </Form.Group>
            <p id="failed" style={{display:'none'}}>Username or password are incorrects</p>

              <Button 
              onClick={() => {this.startLogin()}}
              className="btn btn-light butt-login">
                Login</Button>
            <Button 
            onClick={() => this.notFound()}
            className="btn btn-secondary butt-login">
              Register</Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default Login;
