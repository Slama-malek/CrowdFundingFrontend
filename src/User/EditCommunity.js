
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
export class EditCommunity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    usercommunity:[],
    nom:'',
    description:'',
    cover_image:''
    
    };
  
    this.onChange = this.onChange.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
this.onSubmit = this.onSubmit.bind(this);
  }
    componentDidMount() {
     
        
      axios
        .get('http://localhost:3000/commu/community/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            usercommunity: res.data.data,
            nom:res.data.data.nom,
            description:res.data.data.description
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
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        

   
      };
       handlePhoto = e => {
        this.setState({cover_image: e.target.files[0]});
      
    }
    onSubmit = e => {
      e.preventDefault();
  
      
      const formData = new FormData();
      formData.append('cover_image', this.state.cover_image);
      formData.append('nom', this.state.nom);
      formData.append('description', this.state.description);

  
      axios
      .put('http://localhost:3000/commu/update/'+this.props.match.params.id,formData)
        .then(res => {
          //this.props.history.push('/edit-category/'+this.props.match.params.id);
          this.props.history.push('/communities');
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
            <h1>Edit Commuanuté</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Mes Commuanutés</a><span>/</span></li>
                <li>Edit Commuanuté</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="campaign-form form-update">
          <div className="container">
            <div className="design-process-section" id="process-tab">
              <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                <li>
                <Link to={"/communities"}>
                      <span><img src="../images/assets/log-out.svg" alt="" /></span>
                      <p>Exit Editor</p>
                    </Link>
                  
                </li>
              </ul>
              <form onSubmit={this.onSubmit}>
              <h4>Edit Communauté</h4>
                        <div className="field">
                          <label htmlFor="uploadfile">Image</label>
                          <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={this.handlePhoto}
           required />
                        </div>
               
                <div className="field">
                  <label htmlFor="title"> Titre *</label>
               
                  <input type="text" id="nom" value={this.state.nom} name="nom" onChange={this.onChange} required />
                </div>
                <div className="field">
                  <label htmlFor="campaigndesc"> Description *</label>
                  <textarea rows={4} id="description" name="description" value={this.state.description} onChange={this.onChange} required />
                </div>
                <button type="submit" className="btn-primary">Enregistrer</button>
                                      </form>
            </div>
          </div>
        </div></main>
          )
    
    
        }}
        export default EditCommunity ;