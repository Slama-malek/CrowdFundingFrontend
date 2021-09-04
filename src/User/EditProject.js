
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
export class EditProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    categories:[],
    projectdetail:[],
    name:'',
    location:'',
    duration:'',
    goal:'',
    description:'',
    website:'',
    facebook_link:'',
    twiter_link:'',
    linkedin_link:'',
    cover_image:'',
    category:'',
    headline:'',
    
    };
    this.handleEditorChange=this.handleEditorChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);}
    handleEditorChange(e){
      //console.log('Content was updated:', e.target.getContent());
     this.setState({description: e.target.getContent()});
     //this.setState({ [e.target.name]: e.target.value });
      console.log('Content was updateddddddddddd:',this.state.content)
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
    formData.append('name', this.state.name);
    formData.append('headline', this.state.headline);
    formData.append('location', this.state.location);
    formData.append('goal', this.state.goal);
    formData.append('description', this.state.description);
    formData.append('website', this.state.website);
    formData.append('facebook_link', this.state.facebook_link);
    formData.append('twiter_link', this.state.twiter_link);
    formData.append('linkedin_link', this.state.linkedin_link);
    formData.append('category', this.state.category);
  
    formData.append('duration', this.state.duration);
    
console.log(formData);


    axios
    .put('http://localhost:3000/project/updateproject/'+this.props.match.params.id,formData)
      .then(res => {
        this.setState({
            messagesucess:"Votre projet est cré avec succès"
          })
         
          console.log(this.state.projectID);

        this.props.history.push('/edit-project/'+this.props.match.params.id);
        
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
      })};
    componentDidMount() {
        
      axios
        .get('http://localhost:3000/categorie/allcategories')
        .then(res => {
           
          this.setState({
            categories: res.data.data
          })
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })
      
      
        axios
        .get('http://localhost:3000/project/project/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            projectdetail: res.data.data,
            name:res.data.data.name,
            location:res.data.data.location,
    goal:res.data.data.goal,
    description:res.data.data.description,
    website:res.data.data.website,
    facebook_link:res.data.data.facebook_link,
    twiter_link:res.data.data.twiter_link,
    linkedin_link:res.data.data. linkedin_link,
    cover_image:res.data.data.cover_image,
    category:res.data.data.category,
    headline:res.data.data.headline,
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

    render() {  

        return (

<main id="main" className="site-main">
<div className="page-title background-blog">     
     <div className="container">
            <h1>Edit Projet</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">MEs projets</a><span>/</span></li>
                <li>Edit Projet</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="campaign-form form-update">
          <div className="container">
            <div className="design-process-section" id="process-tab">
              <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                <li>
                  <a href="dashboard.html">
                    <span><img src="images/assets/log-out.svg" alt="" /></span>
                    <p>Exit Editor</p>
                  </a>
                </li>
              </ul>
         
              <form onSubmit={this.onSubmit}>
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
                          <label htmlFor="projecttitle">Titre du projet *</label>
                          <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChange} required /> 
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Slogan *</label>
                          <input type="text" id="headline" name="headline" value={this.state.headline} onChange={this.onChange} required /> 
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Location*</label>
                          <input type="text" id="location" name="location" value={this.state.location} onChange={this.onChange} required/> 
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Goal (TND) *</label>
                          <input type="number" id="goal" name="goal" value={this.state.goal} onChange={this.onChange} required/> 
                        </div>
                      
                      <div className="field">
                        <label htmlFor="shortblurb">Description</label>
                        <Editor
        
        initialValue={this.state.description}
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
      /> 
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
                        <label htmlFor="funding">Duration *</label>
                        <input type="date" name="duration" id="duration"onChange={this.onChange} required/>
                      </div>
                      <div className="field">
                          <label htmlFor="fundinggoal">Lien facebbok</label>
                          <input type="text"  id="facebook_link" name="facebook_link" value={this.state.facebook_link} onChange={this.onChange} /> 

                        </div>
                        <div className="field">
                          <label htmlFor="fundinggoal">Lien twiter</label>
                          <input type="text"  id="twiter_link" name="twiter_link" value={this.state.twiter_link} onChange={this.onChange} /> 

                        </div>
                        <div className="field">
                          <label htmlFor="fundinggoal">Lien linkedin</label>
                          <input type="text"  id="linkedin_link" name="linkedin_link" value={this.state.linkedin_link} onChange={this.onChange} /> 

                        </div>
                        <div className="field">
                          <label htmlFor="fundinggoal">Website </label>
                          <input type="text"  id="website" name="website" value={this.state.website} onChange={this.onChange} /> 

                        </div>
                        <button type="submit" className="btn-primary">Enregistrer</button>
                    </form>
                   
            
            </div>
          </div>
        </div></main>
        
          )
    
    
        }}
        export default EditProject ;