import React, { Component } from 'react' 
import API from "../utils/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';
import moment from 'moment';
export class Navbar extends Component {  
    constructor(props) {
        super(props);
        
    
        this.state = {
          categories: [],
          messages: [],
          
        };
      }
      componentDidMount() {
          if(API.getCurrentUser()){
      axios
      .get('http://localhost:3000/notif/allnotifications/'+API.getCurrentUser().data._id)
      .then(res => {
         
        this.setState({
          categories: res.data.data
         
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
      .get('http://localhost:3000/message/allusermessages/'+API.getCurrentUser().data._id)
      .then(res => {
         
        this.setState({
          messages: res.data.data
         
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
      }}
    render() {  
        return ( 
     
<header id="header" class="site-header">
<div class="top-header clearfix">
<div class="container">
<ul class="socials-top">
<li><a target="_Blank" href="https://www.facebook.com/"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
<li><a target="_Blank" href="https://www.twitter.com/"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
<li><a target="_Blank" href="https://www.google.com/"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
<li><a target="_Blank" href="http://www.linkedin.com/"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
<li><a target="_Blank" href="https://www.youtube.com/"><i class="fa fa-youtube" aria-hidden="true"></i></a></li>
</ul>

</div>
</div>
<div class="content-header">
<div class="container">
<div class="site-brand">
<a href="index-2.html"><img src="assets/images/assets/logo.png" alt=""/></a>

</div>
<div class="right-header">
<nav class="main-menu">
<button class="c-hamburger c-hamburger--htx"><span></span></button>
<ul>
<li>
<Link to={"/"}>
            Accueil
          </Link>
        </li>
<li>


</li>

<li>
<Link to={"/listprojects"}>
              Projets
            </Link>
</li>
<li>
<Link to={"/listcommunuates"}>
              Communautés
            </Link>
</li>








{API.getCurrentUser() ? ( 
        <React.Fragment>
          <li>
          {API.getCurrentUser().data.usertype=="investisseur"?(
            <Link to={"/dashboard-invest"}>
              {API.getCurrentUser().data.username}
            </Link>
    ):(
      <Link to={"/dashboard-user"}>
              {API.getCurrentUser().data.username}
            </Link>
    )}

          </li>
          <li>
            <a href="/login" onClick={API.logout}>
            Se déconnecter
            </a>
          </li>
          <div className="search-icon">
    <a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon"><i class="fa fa-bell" aria-hidden="true"></i></span><span className="badge-wrap"><span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse" /></span></a>
    <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
      
      <div className="notifications-nicescroll-bar">
       <ul>
         <li>Notifications</li>
       </ul>
        
        <div className="dropdown-divider" />
{this.state.categories.map(item=>
<div>
        <ul>
         <li>{item.contenu}</li>
       </ul>
       <div className="dropdown-divider" />
       </div>  )}
      </div>
    </div>
  </div>
        
 
  <div className="search-icon" >
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope" />
          
        </a>
        <ul className="dropdown-menu scale-up" tyle={{width: '280px', padding: 0, margin: 0, top: '100%',position: 'absolute', right: '5%', left: 'auto', border: '1px solid #ddd', background: '#fff',width: '280px', padding: 0, margin: 0, top: '100%'}}>
          <li style={{overflow: 'hidden', width: 'auto', height: '50px'}}>Vous avez {this.state.messages.length} messages
</li>
          <div className="dropdown-divider" />
          <li>
           
          <ul className="menu inner-content-div" style={{overflow: 'hidden', width: 'auto', height: '100px'}}>
          {this.state.messages.map(item=>
              <li>
              <a href="#" style={{margin: 0, padding: '15px'}}>
                  <div className="pull-left" style={{float: 'left'}}>
                    <img src={`${item.investID.cover_image}`}alt="" className="rounded-circle" style={{margin: 'auto 10px auto auto', width: '40px', height: '40px'}} />
                  </div>
                  <div className="mail-contnet" >
                    <h4>
                     {item.investID.username}
                      <small style={{color: '#999', fontSize: '10px', position: 'absolute', top: 0, right: 0}}><i className="fa fa-clock-o"/> {moment(item.createdAt).fromNow()}</small>
                    </h4>
                    <span style={{margin: '5px 0 0', fontSize: '10px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'list-item'}}>{item.contenu}</span>
                  </div>
              </a>
              </li>)}
              {/* end message */}
      </ul>
          </li>
          <div className="dropdown-divider" />
          <li className="footer"><a style={{fontSize: '14px', backgroundColor: '#fff', padding: '15px 10px', color: 'rgba(0, 0, 0, .5)', textAlign: 'center',  borderRadius: '0 0 4px 4px', display: 'block'}} href="#">Voir tous les messages</a></li>
        </ul>
      </div>

   
          </React.Fragment>
      ) : (
        <React.Fragment>
          <li>
          <div class="login login-button" >
<a href="/login" class="btn-primary" style={{color: '#fff'}}>Login</a>
</div>
</li>    

        
          </React.Fragment>
      )}
   

</ul>
</nav>
</div>
</div>
</div>
</header>
 

            )  
    }  
}  
  
export default Navbar ;