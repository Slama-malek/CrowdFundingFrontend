

import React from "react";


import API from "../utils/api";
import moment from 'moment'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

export class DetailMember extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
     
      userdetail: [],
      useradresses:[],
      userprojects:[],
      usercommunity:[]
     
      
    };
  }
  componentDidMount() {
     
        
    axios
      .get('http://localhost:3000/user/userdetail/'+this.props.match.params.id)
      .then(res => {
         
        this.setState({
          userdetail: res.data.data,
          userprojects:res.data.data.projects,
          usercommunity:res.data.data.communautes
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
      
     
      axios
      .get('http://localhost:3000/user/adressesbyuser/'+this.props.match.params.id)
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
<main id="main" className="site-main">
<div className="page-title background-blog">
  <div className="container">
    <h1>Détail membre</h1>
    <div className="breadcrumbs">
      <ul>
        <li><a href="index-2.html">Détail Commuanuté</a><span>/</span></li>
        <li>Détail Membre</li>
      </ul>
    </div>
  </div>
</div>
<div className="account-wrapper">
  <div className="container">
    <div className="row">
      <div className="col-lg-3">
        <nav className="account-bar">
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
      <div className="col-lg-9">
        <div className="account-content profile">
          <h3 className="account-title">Détaile membre</h3>
          <div class="author-title">< Link to={`/detail-community/${this.props.match.params.idc}`} class="edit-profile">Retour</Link></div>

          <div className="account-main">
          <div class="author clearfix">
<a class="author-avatar" href="#"><img src={`${this.state.userdetail.cover_image}`} alt="" style={{width: '120px',height:'120px'}}/></a>
<div class="author-content">
<div class="author-title"><h3><a href="#">{this.state.userdetail.username}</a></h3></div>
<div class="author-info">
<p>{this.state.userdetail.email}</p>
<p> Membre depuis {moment(this.state.userdetail.createdAt).format('MMMM Do YYYY')}</p>
</div>
</div>
</div>
<div class="profile-box">
<h3>Profile Infomations</h3>
<ul>
<li>
<strong>Bio:</strong>
<div class="profile-text"><p>{this.state.userdetail.bio? (this.state.userdetail.bio):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Profession:</strong>
<div class="profile-text"><p>{this.state.userdetail.profession? (this.state.userdetail.profession):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Lien Facebook :</strong>
<div class="profile-text"><p>{this.state.userdetail.facebook_link? (this.state.userdetail.facebook_link):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Lien Twiter :</strong>

<div class="profile-text"><p>{this.state.userdetail.twiter_link? (this.state.userdetail.twiter_link):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Lien Linkedin :</strong>
<div class="profile-text"><p>{this.state.userdetail.linkedin_link? (this.state.userdetail.linkedin_link):(<span>-</span>)}</p></div>
</li>
<li>
<strong>Mobile:</strong>
<div class="profile-text"><p>{this.state.userdetail.telephone? (this.state.userdetail.telephone):(<span>-</span>)}</p></div>
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

<hr></hr>

<div className="dashboard-latest">
        <h3>Projets Informations</h3>
        <ul>
        {this.state.userprojects.map(item=>
          <li>
            <Link
                to={"/detailproject/" + item._id}><img src={`${item.cover_image}`}alt="" style={{width: '150px',height:'150px'}} /></Link>
            <div className="dashboard-latest-box">
              <div className="category">{item.category}</div>
              <h4><Link to={"/detailproject/" + item._id}>{item.name}</Link></h4>
            </div>
          </li>
        )}
        </ul>
      </div>
      <hr></hr>
      <div className="dashboard-latest">
        <h3>Communautés Informations</h3>
        <ul>
        {this.state.usercommunity.map(item=>
          <li>
            <Link to={"/detailcommunity/" + item._id}><img src={`${item.cover_image}`}alt="" style={{width: '150px',height:'150px'}} /></Link>
            <div className="dashboard-latest-box">
              <div className="category">{item.nom}</div>
              <h4><Link to={"/detailcommunity/" + item._id}>{item.description}</Link></h4>
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
export default DetailMember  ;