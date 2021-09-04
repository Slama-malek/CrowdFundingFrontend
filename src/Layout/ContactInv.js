
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
export class ContactInv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        invdetail:[],
        offres:[],
        contenu:''
  
    
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
         
          console.log(this.state.projectID);

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
<body class="contact-us">
<div id="wrapper">
<main id="main" className="site-main">
        <div className="page-title background-blog">
          <div className="container">
            <h1>Contact</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Détail Investisseur</a><span>/</span></li>
                <li>Contact Investisseur</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="page-content contact-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 main-content">
                <div className="entry-content">
                  <div className="row">
                    <div className="col-lg-8">
                    {this.state.messagesucess && (
        <div class="alert alert-info" role="alert">
           {this.state.messagesucess}
            </div>)}
                      <div className="form-contact">
                        <h2>Laisser un message </h2>
                        <form onSubmit={this.onSubmit}>

                          <div className="field-textarea">
                          <textarea rows={8} placeholder=" votre message"  name="contenu" id="contenu" onChange={this.onChange} required   />
                          </div>
                          <button type="submit" value="Send Messager" className="btn-primary">Submit Message</button>
                        </form>
                      </div>
                    </div>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="maps">
          <div id="map" />
        </div>
        
      </main>
</div>
</body>)
    
    
}}
export default ContactInv  ;