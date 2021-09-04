
import React from "react";
import moment from 'moment'

import API from "../utils/api";
import Rating from "react-star-rating-component";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';
export class DetailInves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        invdetail:[],
        offres:[],
        contenu:"",
        messagesucess:""
  
    
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
    

}
    componentDidMount() {
       
        axios
          .get('http://localhost:3000/user/userdetail/'+this.props.match.params.id)
          .then(res => {
             
            this.setState({
              invdetail: res.data.data,
             
              
            })
            console.log(res.data.data)
            
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
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
      e.preventDefault();
      if(!API.getCurrentUser())
      {
        alert("Vous devez connecter !");
      }
      const id =API.getCurrentUser().data._id
      const data = {
          contenu: this.state.contenu,
          userID: id,
          investID:this.props.match.params.id
        };
      
  console.log(data);
  
  
      axios
      .post('http://localhost:3000/message/create',data)
        .then(res => {
          this.setState({
             
              messagesucess:"Votre message ets envoyée avec succes"
            })
           
           
  
            window.location.reload();        
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
  }
        )
        .catch(err => {
          console.log(err);
        })
        
    };

    render() {  
        
       
         return (
<body class="shop-details">
<div id="wrapper">
<main id="main" className="site-main">
        <div className="page-title background-blog">
          <div className="container">
            <h1>Détail Investisseur</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">List Investisseurs</a><span>/</span></li>
               
                <li>Détail Investisseur</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 main-content">
            {this.state.messagesucess && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

        {this.state.messagesucess }
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                          </button>
       </div>)}
              <div className="shop-details-content">
                <article className="post">
                  <span>{this.state.invdetail.secteur}</span>
                  <h2>{this.state.invdetail.username}</h2>
                  <div className="account-main">
                    <div className="author clearfix">
                      <a className="author-avatar" href="#"><img src="../images/dashboard-avatar.png" alt="" style={{width: '480px',height:'480px'}} /></a>
                    </div>
                  </div>
                  <h3>Descriptions</h3>
                  <p>{this.state.invdetail.bio}</p>
                  <div className="reviews">
                    <h3>Contacter</h3>
                    <form onSubmit={this.onSubmit}>
                      <div className="field">
                      <textarea rows={8} placeholder=" votre message"  name="contenu" id="contenu" onChange={this.onChange} required   />
                      </div>
                      
                      <div className="reviews-vote clearfix">
                        <div className="vote">
                        
                        </div>
                        <button type="submit" value="Send Review" className="btn-primary">Envoyer</button>
                      </div>
                    </form>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-4 sidebar">
              <aside>
                <div className="contact-info">
                  <h3>Contact Infomation</h3>
                  <ul>
                    <li><i className="fa fa-map-marker" aria-hidden="true" />{this.state.invdetail.location}</li>
                    <li><i className="fa fa-phone" aria-hidden="true" />{this.state.invdetail.telephone}</li>
      
                    <li><i className="fa fa-envelope-o" aria-hidden="true" />{this.state.invdetail.email}</li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
</div>
</body> )
    
    
}}
export default DetailInves  ;