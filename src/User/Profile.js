import React from "react";
import moment from 'moment'

import API from "../utils/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    username:'',
    bio:'',
    profession:'',
    adresse:'',
    telephone:'',
    facebook_link:'',
    twiter_link:'',
    linkedin_link:'',
    cover_image:'',
    numero:'',
    code_secret:'',
    proprietaire:'',
    date_exp:'',
    ville:'',
    governoment:'',
    code_postal:'',
    pays:'',
    user:[],
     usercarts:[],
     useradresses:[]
    };}
    componentDidMount() {
      const id =API.getCurrentUser().data._id
        
      axios
        .get('http://localhost:3000/user/user/'+id)
        .then(res => {
           
          this.setState({
            user: res.data.data
          })
          
          
        })
        .catch(err => {
          console.log(err);
        })

        axios
        .get('http://localhost:3000/user/cartsbyuser/'+id)
        .then(res => {
           
          this.setState({
            usercarts: res.data.data
          })
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })
        axios
        .get('http://localhost:3000/user/adressesbyuser/'+id)
        .then(res => {
           
          this.setState({
            useradresses: res.data.data
          })
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })

    };
    render() {  

        return (
<main id="main" class="site-main">
<div className="page-title background-blog">
<div class="container">
<h1>Profil</h1>
<div class="breadcrumbs">
<ul>
<li><a href="index-2.html">Dashboard</a><span>/</span></li>
<li>Profil</li>
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
<li><Link
                to={"/dashboard-user"}>Tableau de bord</Link></li>
                        <li className="active"><Link to={"/profile"}>Profil</Link></li>
                        <li><Link to={"/projects"}>Projets</Link></li>
                        <li><Link to={"/communities"}>Communautés</Link></li>
                        <li ><Link to={"/Contributions"}>Contributions</Link></li>

</ul>
</nav>
</div>
<div class="col-lg-9">
<div class="account-content profile">
<h3 class="account-title">Profil</h3>
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

<div class="profile-box">
<h3> Address Informations</h3>
{this.state.useradresses.map(item=>
<ul>
<li>
<strong>Adresse:</strong>
<div class="profile-text"><p>{item.adresse? (item.adresse):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Ville:</strong>
<div class="profile-text"><p>{item.ville? (item.ville):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Governoment:</strong>
<div class="profile-text"><p>{item.governoment? (item.governoment):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Code postal:</strong>
<div class="profile-text"><p>{item.code_postal? (item.code_postal):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Pays:</strong>
<div class="profile-text"><p>{item.pays? (item.pays):(<span>-</span>)}</p></div>
</li>

</ul>
)}
</div>

<div class="profile-box">
<h3>Payment Infomation</h3>
{this.state.usercarts.map(item=>
<ul>
<li>
<strong>Proprietaire:</strong>
<div class="profile-text"><p>{item.proprietaire? (item.proprietaire):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Numéro:</strong>
<div class="profile-text"><p>{item.numero? (item.numero):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Date d'expiration:</strong>
<div class="profile-text"><p>{item.date_exp? (item.date_exp):(<span>-</span>)}</p></div>
</li>
<hr></hr></ul>
)}
</div>
<Link class="btn-primary" to={`/edit-profile/${this.state.user._id}`}>Edit Profil</Link>

</div>
</div>
</div>

</div>
</div>
</div>
</main>
 )
}}
export default Profile  ;
