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
export class AddCommunity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        nom:'',
        category:'',
    categories:[],
        description:'',
        cover_image:'',
        messagesucess:''
  
    
    };
    this.onChange = this.onChange.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        
    this.onSubmit = this.onSubmit.bind(this);
    
}
    
        onChange = e => {
            this.setState({ [e.target.name]: e.target.value });
          };
           handlePhoto = e => {
            this.setState({cover_image: e.target.files[0]});
          
        }
     
        onSubmit = e => {
            e.preventDefault();
            const id =API.getCurrentUser().data._id
            const formData = new FormData();
            formData.append('cover_image', this.state.cover_image);
            formData.append('nom', this.state.nom);
            formData.append('category', this.state.category);
            formData.append('description', this.state.description);
          
            
console.log(formData);
    
        
            axios
            .post('http://localhost:3000/commu/create/'+id,formData)
              .then(res => {
                this.setState({
                   
                    messagesucess:"Votre communaute est cré avec succès,Vous dever atteindre la confirmation d'admin"
                  })
                 
                  //console.log(this.state.projectID);

                this.props.history.push('/add-community');
                
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
      
          componentDidMount() {
            axios
            .get('http://localhost:3000/categorie/allcategories')
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
            })}
    render() {  
       
        return (
            <main id="main" className="site-main">
          <div className="page-title background-blog">
              <div className="container">
                <h1>Créer une Commuanuté</h1>
                <div className="breadcrumbs">
                  <ul>
                    <li><a href="index-2.html">Dashboard</a><span>/</span></li>
                    <li>Créer une Commuanuté</li>
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
                    <h4>Créer une communauté</h4>
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
                      <label htmlFor="title">Nom *</label>
                      <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.onChange} required /> 
                    </div>
                    <div className="field">
                        <label htmlFor="field-cat">Categorie *</label>
                        <div className="field-select field-cat">
                            
                          <select name="category" onChange={this.onChange} required>
                            <option selected="selected">Choisissez une catégorie</option>
                            {this.state.categories.map(category=>
                            <option value={`${category.name}`}>{category.name}</option>
                            )}
                          </select>
                        </div>
                      </div>
                    <div className="field">
                      <label htmlFor="campaigndesc"> Description *</label>
                      <textarea rows={4} id="description" name="description" value={this.state.description} onChange={this.onChange} required />
                    </div>
                <button type="submit" className="btn-primary">Enregistrer</button>   
                                   </form>
                                   {this.state.messagesucess && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucess}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                </div>
              </div>
            </div></main> )
    
    
    }}
    export default AddCommunity  ;