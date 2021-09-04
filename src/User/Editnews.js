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
export class Editnews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        titre:'',
        contenu:'',
        messagesucessreward:''
  
    
    };
    this.onChange = this.onChange.bind(this);
       
        
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorChange=this.handleEditorChange.bind(this);
    
}
handleEditorChange(e){

   this.setState({contenu: e.target.getContent()});

    console.log('Content was updateddddddddddd:',this.state.content)
  }
    
        onChange = e => {
            this.setState({ [e.target.name]: e.target.value });
          };
           
     
        onSubmit= e => {
            e.preventDefault();
        
            const data = {
                titre: this.state.titre,
                contenu: this.state.contenu
              };
           
            
    
        
           
              axios
              .put('http://localhost:3000/updates/update/'+this.props.match.params.id,data)
                .then(res => {
                  //this.props.history.push('/edit-category/'+this.props.match.params.id);
                  window.location.reload();           
                         this.setState({
                    messagesucessreward:"la news est creée  avec succès"
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
            .get('http://localhost:3000/updates/updatedetail/'+this.props.match.params.id)
            .then(res => {
               
              this.setState({
                detailreward: res.data.data,
                titre:res.data.data.titre,
                contenu:res.data.data.contenu
              })
              console.log(res.data.data)
              console.log(this.state.titre)
              console.log(res.data.data.titre)
              
              
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
                <h1>Modifier une news</h1>
                <div className="breadcrumbs">
                  <ul>
                    <li><a href="index-2.html">Dashboard</a><span>/</span></li>
                    <li>Modifier une news</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="campaign-form form-update">
              <div className="container">
                <div className="design-process-section" id="process-tab">
                  <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                    <li>
                    <Link to={"/projects"}>
                    <span><img src="../images/assets/log-out.svg" alt="" /></span>
                    <p>Exit Editor</p>
                  </Link>
                    </li>
                  </ul>
                  <form onSubmit={this.onSubmit}>
                    <h4>Créer une news</h4>
                
                    <div className="field">
                      <label htmlFor="title">Titre *</label>
                      <input type="text" id="titre" name="titre" value={this.state.titre} onChange={this.onChange} required/> 
                    </div>
                    <div className="field">
                      <label htmlFor="campaigndesc"> Description *</label>
                      <Editor
        
        initialValue={this.state.contenu}
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
    export default Editnews  ;