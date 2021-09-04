import React, { Component } from 'react' 
import Home from './Home';
import API from "../utils/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
export class Header extends Component {  
    render() {  
        
        return ( <Router>
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
<div class="phone">Call Now +1 123 456 789</div>
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
<a href="#">Organismes de financement<i class="fa fa-caret-down" aria-hidden="true"></i></a>

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



<li><a href="contact_us.html">Contact</a></li>




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
              </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
              <div class="login login-button" >
<a href="/login" class="btn-primary">Login</a>
</div>
</li>    

            
              </React.Fragment>
          )}
          <div class="search-icon">
<a href="#" class="ion-ios-search-strong"></a>
<div class="form-search"></div>
<form action="#" method="POST" id="searchForm">
<input type="text" value="" name="search" placeholder="Search..." />
<button type="submit" value=""><span class="ion-ios-search-strong"></span></button>
</form>
</div>
</ul>
</nav>
</div>
</div>
</div>
</header>
</Router>

            )  
    }  
}  
  
export default Header ;