import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form'
import "../styles/Menu.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import '../styles/Pagination.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Loading from './Loading'


const cookies = new Cookies();
const urlAPI = "https://api-users-1.herokuapp.com/api/users/" ;
const urlPOST = "https://api-users-1.herokuapp.com/api/users/add";

class Menu extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    data: [],
    searchTerm: '',
    allData: true,
    offset: 0,
    orgtableData: [],
    perPage: 4,
    currentPage: 0,
    modalInsert: false,
    modalDelete: false,
    form: {
      _id: "",
      name: "",
      username: "",
      password: "",
      modalType: ""
    },
  };
  this.handlePageClick = this.handlePageClick.bind(this);
};


getRequest () {
  axios.get(urlAPI)
  .then(res=>{
    const data = res.data;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

    this.setState({
      pageCount : Math.ceil(data.length / this.state.perPage),
      orgtableData : res.data,
      data : slice,
      allData: false
    })
  })
}

  postPetition = async () => {
    delete this.state.form._id;
    await axios.post(urlPOST,this.state.form).then(response => {
      this.modalInsert();
      this.getRequest();
    }).catch(error => {
      console.log(error.message);
    })
  }

  putPetition = () => {
    axios.put(urlAPI + this.state.form._id, this.state.form).then(response=> {
      this.modalInsert();
      this.getRequest();
    }).catch(error => {
      console.log(error.message);
    });
  }

  deletePetition = () => {
    axios.delete(urlAPI + this.state.form._id).then(response=>{
      this.setState({modalDelete:false});
      this.getRequest();
    }).catch(error => {
      console.log(error.message);
    });
  }

  closeSession = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("name", { path: "/" });
    window.location.href = "/";
  };

  componentDidMount() {
    if (!cookies.get("username")) {
      window.location.href = "./";
    }
    this.getRequest();
  }

  loadMoreData() {
    const data = this.state.orgtableData;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount : Math.ceil(data.length / this.state.perPage),
      data: slice
    })
  }

  modalInsert = () => {
    this.setState({ modalInsert: !this.state.modalInsert });
  };

  handleChange = async e => {
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,[e.target.name]: e.target.value
      }
    })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
  
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.loadMoreData();
    })
  }


  selectUser = (users) => {
    this.setState({
      modalType: 'edit',
      form:{
        _id: users._id,
        name: users.name,
        username: users.username,
        password: users.password
      }
    })
  }

  render() {
    const { form } = this.state;
    return (
      <div className="principal-container">
        <h1 className="title-page">Users in this Page: {this.state.data.length}</h1>
        <div className="secondary-container">
          <Button
            id="add-btn"
            className="btn btn-success"
            onClick={() => {this.setState({form:null, modalType:'insert'}); this.modalInsert()}}
          >
            Add new user
          </Button>

      <div className="search-container">
        <Form id="search">
          <Form.Group>
            <Form.Control
              type="search"
              placeholder="Search by name..🔍"
              onChange={(event) => {
                this.setState({searchTerm: event.target.value})
                // setSearchTerm(event.target.value);
              }}
            />
            <br />
          </Form.Group>
        </Form>
      </div>

      {this.state.allData ? (
            <Loading />
          ) : (
          <div className="table-container">
            <Table id="dale" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th id="first-th">#</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>

              {this.state.data.filter((item) => {
                if(this.state.searchTerm === ""){
                  return item;
                }else if(item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                  return item;
                }else{
                  return null;
                }
              } 
              ).map((user) => (
                <tr>
                <td id="first-td">{user._id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <AiFillEdit 
                  className="icons" 
                  id="edit"
                  onClick={() => {this.selectUser(user); this.modalInsert()}}/>

                  <AiTwotoneDelete 
                  className="icons" 
                  id="delete" 
                  onClick={()=>{this.selectUser(user); this.setState({modalDelete:true})}}/>
                </td>
              </tr>
              ))}
              </tbody>
            </Table>
                <ReactPaginate
                previousLabel={<FaArrowLeft className="fa-arrow"/>}
                nextLabel={<FaArrowRight className="fa-arrow"/>}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                />
          </div>
          )}
          
          <p className="text-hidden">
            The ID of each user is not visible on small devices
          </p>
          

        </div>
        <br />
        <div className="button-logout-container">
          <Button
            onClick={() => this.closeSession()}
            className="btn btn-danger btn-logout"
          >
            Logout
          </Button>
        </div>

        {/*Modals*/}

        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader style={{ display: "block" }}>
            <span
              id="X"
              onClick={() => this.modalInsert()}
              style={{ float: "right" }}
            >
              X
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="_id">ID</label>
              <input
                style={{backgroundColor:'#D6D6D6'}}
                className="form-control"
                type="text"
                name="_id"
                id="_id"
                value={form?form._id : "6088a1e66"+Math.random()}
                onChange={this.handleChange}
                readOnly
              ></input>
              <br />
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={form?form.name : ''}
                onChange={this.handleChange}
              ></input>
              <br />
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                value={form?form.username : ''}
                onChange={this.handleChange}
              ></input>
              <br />
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={form?form.password : ''}
                onChange={this.handleChange}
              ></input>
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.modalType==='insert'? 
            <button 
            className="btn btn-success"
            onClick={() => this.postPetition()}>
            Add
            </button>
               : 
            <button 
            className="btn btn-primary" 
            onClick={() => this.putPetition()}>
            Update
            </button> } 
            
            <button
            className="btn btn-danger"
            onClick={() => this.modalInsert()}>
            Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
          Are you sure what you want to delete the user {form && form.name}? 
          </ModalBody>
          <ModalFooter>
          <button className="btn btn-danger" onClick={() => this.deletePetition()}>Yes</button>
          <button className="btn btn-info" onClick={() => this.setState({modalDelete:false})}>No</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Menu;
