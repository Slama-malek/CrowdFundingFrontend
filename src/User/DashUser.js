import React from "react";


import API from "../utils/api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

export class DashUser extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      user: [],
      username:'',
      email:'',
      createdAt:'',
      id:'',
      cover_image:'',
      projects: [],
      message:"",
      messagedelete:""
      
    };
  }
  componentDidMount() {
    const id =API.getCurrentUser().data._id
   console.log(id);
    axios
    .get('http://localhost:3000/user/user/'+id)
    .then(res => {
       
      this.setState({
        username:res.data.data.username,
        email:res.data.data.email,
      id:res.data.data._id,
        createdAt:res.data.data.createdAt,
        cover_image:res.data.data.cover_image,
        user: res.data.data
      })
      console.log(res.data);
      
    })
    .catch(err => {
      console.log(err);
    })





  axios
    .get('http://localhost:3000/user/projectsbyuser/'+id)
  .then(response => {
    this.setState({
      projects: response.data.data
    });
    console.log(response.data);
  }
  ,
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        message: resMessage
      });
    })
  .catch(e => {
    console.log(e);
  });


}
    render() {  
      const userdetail = this.state.user;
      const projects = this.state.projects;
        return (
          <main id="main" class="site-main">
          <div className="page-title background-blog">
          <div class="container">
          <h1>Tableau de bord</h1>
          <div class="breadcrumbs">
          <ul>
          <li><a href="index-2.html">Accueil</a><span>/</span></li>
          <li>Dashboard</li>
          </ul>
          </div>
          </div>
          </div>
          <div class="account-wrapper">
          <div class="container">
          <div class="row">
          <div class="col-lg-3">
          <nav class="account-bar">
          <ul>
          <li className="active"><Link
                to={"/dashboard-user"}>Tableau de bord</Link></li>
                        <li><Link to={"/profile"}>Profil</Link></li>
                        <li><Link to={"/projects"}>Projets</Link></li>
                        <li><Link to={"/communities"}>Communautés</Link></li>
                        <li ><Link to={"/Contributions"}>Contributions</Link></li>
                    
         
          </ul>
          </nav>
          </div>

          <div class="col-lg-9">
          <div class="account-content dashboard">
          <h3 class="account-title">Dashboard</h3>
          <div class="account-main">
          
          <div class="author clearfix">
          <a class="author-avatar" href="#"><img src={`${this.state.cover_image}`} alt="" style={{width: '120px',height:'120px'}}/></a>
          <div class="author-content">
          <div class="author-title"><h3><a href="#">{this.state.username}</a></h3><Link class="edit-profile" to={`/edit-profile/${this.state.id}`}>Edit Profile</Link></div>
          <div class="author-info">
          <p>{this.state.email}</p>
          <p> Membre depuis{this.state.createdAt}</p>
          </div>
          </div>
          </div>
            
            <div class="dashboard-latest">
          <h3>Mes derniers projets</h3>
          <ul>
            {projects.map(item =>
          <li>
          <a href="#"><img src={`${item.cover_image}`} alt="" style={{width: '150px',height:'150px'}}/></a>
          <div class="dashboard-latest-box">
          <div class="category"><a href="#">{item.category}</a></div>
          <h4><a href="#">{item.name}</a></h4>
          </div>
          </li>
         )}
         
          </ul>
          </div>
         
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          </main>
            )
        }}
        export default DashUser  ;
    