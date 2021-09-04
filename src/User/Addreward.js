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
  import { Editor } from '@tinymce/tinymce-react';
export class Addreward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        nom:'',
        category:'',
    categories:[],
        descriptionreward:'',
        
        max_contribution:'',
        cover_imagereward:'',
        min_value:'',
        date_exp:'',
        messagesucessreward:''
  
    
    };
    this.onChange = this.onChange.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorChange=this.handleEditorChange.bind(this);
    
}
handleEditorChange(e){

   this.setState({descriptionreward: e.target.getContent()});

    console.log('Content was updateddddddddddd:',this.state.content)
  }
    
        onChange = e => {
            this.setState({ [e.target.name]: e.target.value });
          };
           handlePhoto = e => {
            this.setState({cover_imagereward: e.target.files[0]});
          
        }
     
        onSubmit= e => {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append('cover_image', this.state.cover_imagereward);
            formData.append('titre', this.state.titre);
            formData.append('min_value', this.state.min_value);
            formData.append('max_contribution', this.state.max_contribution);
            formData.append('description', this.state.descriptionreward);
            formData.append('date_exp', this.state.date_exp);
           
            
    
        
           
              axios
              .post('http://localhost:3000/reward/create/'+this.props.match.params.id,formData)
                .then(res => {
                  //this.props.history.push('/edit-category/'+this.props.match.params.id);
                  window.location.reload();           
                         this.setState({
                    messagesucessreward:"la recompense est creée  avec succès"
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
                <h1>Créer une Récompense</h1>
                <div className="breadcrumbs">
                  <ul>
                    <li><a href="index-2.html">Dashboard</a><span>/</span></li>
                    <li>Créer une Récompense</li>
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
                    <h4>Créer une Récompense</h4>
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
                      <label htmlFor="title">Titre *</label>
                      <input type="text" id="titre" name="titre" value={this.state.titre} onChange={this.onChange} required/> 
                    </div>
                    <div className="field">
                      <label htmlFor="campaigndesc"> Description *</label>
                      <Editor
        
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={this.handleEditorChange}
      />                    </div>
         <div className="field">
                          <label htmlFor="pledge">Min valeur</label>
                          <input type="number" id="min_value" name="min_value" value={this.state.min_value} onChange={this.onChange} /> 
                        </div>
                        <div className="field">
                          <label htmlFor="pledge">Max contributions</label>
                          <input type="number" id="max_contribution" name="max_contribution" value={this.state.max_contribution} onChange={this.onChange} /> 
                        </div>
                        <div className="field">
                          <label htmlFor="pledge">Date d'expiration</label>
                          <input type="date" id="date_exp" name="date_exp" value={this.state.date_exp} onChange={this.onChange} /> 
                        </div>
                <button type="submit" className="btn-primary">Enregistrer</button>   
                                   </form>
                                   {this.state.messagesucess && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucessreward}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                </div>
              </div>
            </div></main> )
    
    
    }}
    export default Addreward  ;