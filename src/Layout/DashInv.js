import React from "react";


import API from "../utils/api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import moment from "moment";

export class DashInv extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      user: [],
      message:"",
      messagedelete:""
      
    };
  }
  componentDidMount() {
    
    axios
              .get('http://localhost:3000/user/userdetail/'+API.getCurrentUser().data._id)
              .then(res => {
                 
                this.setState({
                 user: res.data.data
                 
                })
                
                
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
              .catch(err => {
                console.log(err);
              })
      
              
              
      
          };
    render() {  
        return (
          <main id="main" class="site-main">
          <div class="page-title background-blog">
          <div class="container">
          <h1>Dashboard</h1>
          <div class="breadcrumbs">
          <ul>
          <li><a href="index-2.html">Accueil</a><span>/</span></li>
          <li>Tableau de bord</li>
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
                
                  
                    
          </ul>
          </nav>
          </div>
          <div class="col-lg-9">
<div class="account-content profile">
<h3 class="account-title">Profile</h3>
<div class="account-main">
<div class="author clearfix">
<a class="author-avatar" href="#"><img src={`${this.state.user.cover_image}`} alt="" style={{width: '120px',height:'120px'}}/></a>
<div class="author-content">
<div class="author-title"><h3><a href="#">{this.state.user.username}</a></h3></div>
<div class="author-info">
<p>{this.state.user.email}</p>
<p> Membre depuis {moment(this.state.user.createdAt).format('MMMM Do YYYY')}</p>
</div>
</div>
</div>
<div class="profile-box">
<h3>Profile Infomations</h3>
<ul>
<li>
<strong>Bio:</strong>
<div class="profile-text"><p>{this.state.user.bio? (this.state.user.bio):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Profession:</strong>
<div class="profile-text"><p>{this.state.user.profession? (this.state.user.profession):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Lien Facebook :</strong>
<div class="profile-text"><p>{this.state.user.facebook_link? (this.state.user.facebook_link):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Lien Twiter :</strong>

<div class="profile-text"><p>{this.state.user.twiter_link? (this.state.user.twiter_link):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Lien Linkedin :</strong>
<div class="profile-text"><p>{this.state.user.linkedin_link? (this.state.user.linkedin_link):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Mobile:</strong>
<div class="profile-text"><p>{this.state.user.telephone? (this.state.user.telephone):(<span>-</span>)}</p></div>
</li>

</ul>
</div>

<Link class="btn-primary" to={`/update-profile/${this.state.user._id}`}>Edit Profile</Link>

</div>
</div>
</div>


         
          </div>
          </div>
          </div>
          </main>
            )
        }}
        export default DashInv  ;
    