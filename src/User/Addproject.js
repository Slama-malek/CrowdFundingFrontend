


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
export class Addproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        userabonnement:[],
        usercommunities:[],
        location:'',
        goal:'',
        description:'',
        website:'',
        facebook_link:'',
        twiter_link:'',
        linkedin_link:'',
        cover_image:'',
        category:'',
        communauteID:'',
        duration:'',
        projectID:'',
        titre:'',
        headline:'',
        descriptionreward:'',
        max_contribution:'',
        cover_imagereward:'',
        min_value:'',
        date_exp:'',
        numero:'',
        bank:'',
        message:'',
        messagesucess:'',
        messagesucessreward:'',
        messagesucessaccount:'',
    userprojects:[],
    categories:[],
    communities:[]
    
    };
    this.onChange = this.onChange.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handlePhotoreward = this.handlePhotoreward.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitaccount = this.onSubmitaccount.bind(this);
    this.onSubmitreward = this.onSubmitreward.bind(this);
    this.handleEditorChange=this.handleEditorChange.bind(this);
    this.handleEditorRewardChange=this.handleEditorRewardChange.bind(this);}
    handleEditorChange(e){
      
     this.setState({description: e.target.getContent()});
    
    }
    handleEditorRewardChange(e){
      
      this.setState({descriptionreward: e.target.getContent()});

     
     }

    componentDidMount() {
      const id =API.getCurrentUser().data._id
      axios
      .get('http://localhost:3000/commu/allusercomm/'+id)
      .then(res => {
         
        this.setState({
          usercommunities: res.data.data
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
      .get('http://localhost:3000/member/allcommunities/'+id)
      .then(res => {
         
        this.setState({
          userabonnement: res.data.data
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
          messageab: resMessage
        });
      })
      .catch(err => {
        console.log(err);
      })
     
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
          .get('http://localhost:3000/commu/allusercomm/'+id)
          .then(res => {
             
            this.setState({
              communities: res.data.data
            })
            console.log(res.data.data);
            
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
        handlePhotoreward = e => {
            this.setState({cover_imagereward: e.target.files[0]});
          
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
            if(this.state.communauteID){
            formData.append('communauteID', this.state.communauteID);}
            formData.append('duration', this.state.duration);
            
console.log(formData);
    
        
            axios
            .post('http://localhost:3000/project/create/'+id,formData)
              .then(res => {
                this.setState({
                    projectID: res.data.data._id,
                    messagesucess:"Votre projet est cré avec succès"
                  })
                 
                  let projectID=JSON.parse(localStorage.getItem("projectID"))
            if(projectID){
              localStorage.removeItem("projectID")
              localStorage.setItem("projectID", JSON.stringify(res.data.data._id));

            }
            else{
              localStorage.setItem("projectID", JSON.stringify(res.data.data._id));
            }
                  console.log(this.state.projectID);

                this.props.history.push('/add-project');
                
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
          onSubmitreward= e => {
            e.preventDefault();
        
            const formData = new FormData();
            formData.append('cover_image', this.state.cover_imagereward);
            formData.append('titre', this.state.titre);
            formData.append('min_value', this.state.min_value);
            formData.append('max_contribution', this.state.max_contribution);
            formData.append('description', this.state.descriptionreward);
            formData.append('date_exp', this.state.date_exp);
           
            
    
        if(JSON.parse(localStorage.getItem('projectID'))){
           
              axios
              .post('http://localhost:3000/reward/create/'+JSON.parse(localStorage.getItem('projectID')),formData)
                .then(res => {
                  //this.props.history.push('/edit-category/'+this.props.match.params.id);
                  this.props.history.push('/add-project');
                  this.setState({
                    messagesucessreward:"la recompense est creée avec avec succès"
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
                })}
                else{
                  {
                    alert("Remplir les informations général d un projet d abord");
                  }
                }
              
          };
          onSubmitaccount= e => {
            e.preventDefault();
        
            const data = {
              numero: this.state.numero,
              bank: this.state.bank
            };
            console.log(data);
            
    
            if(JSON.parse(localStorage.getItem('projectID'))){
           
              axios
              .post('http://localhost:3000/account/create/'+JSON.parse(localStorage.getItem('projectID')),data)
                .then(res => {
                  //this.props.history.push('/edit-category/'+this.props.match.params.id);
                  this.props.history.push('/add-project');
                  this.setState({
                    messagesucessaccount:"le compte est creé avec succès,Vous devez atteindre la confiramtion d'admin."
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
                else{
                  
                    alert("Remplir les informations général d un projet d abord");
                  }
                
              
          };

    render() {  
      console.log("ggggggggggggggggggg"+this.state.userabonnement)
      console.log("jjjjjjjjjjjjjj"+this.state.usercommunities)
    
       console.log(this.state.projectID);
        const communitiesApproved=this.state.communities.filter(community => community.status == "Approved")
        return (
<main id="main" className="site-main">
<div className="page-title background-blog">
          <div className="container">
            <h1>Lancer un projet</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Dashboard</a><span>/</span></li>
                <li>Créer projet</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="container">
            <div className="design-process-section" id="process-tab">
              <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                <li>
                <Link to={"/projects"}>
                    <span><img src="images/assets/log-out.svg" alt="" /></span>
                    <p>Exit Editor</p>
                  </Link>
                </li>
                <li data-tab="basics" className="pm-option active">
                  <a href="#">
                    <span><img src="../images/assets/single-folded.svg" alt="" /></span>
                    <p>Description</p>
                  </a>
                </li>
                <li data-tab="rewards" className="pm-option">
                  <a href="#">
                    <span><img src="../images/assets/award.svg" alt="" /></span>
                    <p>Récompenses</p>
                  </a>
                </li>
                
               
                <li data-tab="account" className="pm-option">
                  <a href="#">
                    <span><img src="../images/assets/single-02.svg" alt="" /></span>
                    <p>Compte</p>
                  </a>
                </li>
                <li>
                  {JSON.parse(localStorage.getItem('projectID'))?(  <Link to={"/detailproject/" +JSON.parse(localStorage.getItem('projectID'))}>
                    <span><img src="images/assets/eye-17.svg" alt="" /></span>
                    <p>Aperçu</p>
                  </Link>):( <Link to={"/add-project"}>
                    <span><img src="images/assets/eye-17.svg" alt="" /></span>
                    <p>Aperçu</p>
                  </Link>)}
                 
                </li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="basics">
                  <div className="start-form">
                  {this.state.message && (
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
{this.state.message}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}

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
                          <label htmlFor="projecttitle">Titre du projet <span>*</span></label>
                          <input type="text" id="name" name="name" value={this.state.name} onChange={this.onChange} required /> 
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Slogan <span>*</span></label>
                          <input type="text" id="headline" name="headline" value={this.state.headline} onChange={this.onChange} required /> 
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Location <span>*</span></label>
                          <input type="text" id="location" name="location" value={this.state.location} onChange={this.onChange} required/> 
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Goal (TND) <span>*</span></label>
                          <input type="number" id="goal" name="goal" value={this.state.goal} onChange={this.onChange} required/> 
                        </div>
                      
                      <div className="field">
                        <label htmlFor="shortblurb">Description</label>
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
       /> 
                      </div>
                      <div className="field">
                        <label htmlFor="field-cat">Categorie <span>*</span></label>
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
                        <label htmlFor="field-cat">Communauté <span></span></label>
                        <div className="field-select field-cat">
                            
                          <select name="communauteID" onChange={this.onChange}>
                            <option selected="selected">Choisissez une communauté</option>
                            {communitiesApproved.map(item=>
                            <option value={`${item._id}`}>{item.nom}</option>
                            )}
                          </select>
                        </div>
                      </div>
                    
                      <div className="field">
                        <label htmlFor="funding">Duration</label>
                        <input type="date" name="duration" id="duration"onChange={this.onChange} />
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
                    {this.state.messagesucess && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucess}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="rewards">
                {this.state.message && (
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
{this.state.message}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}

                <form onSubmit={this.onSubmitreward}>
                    <div id="itemform">
                      <div className="start-form">
                        <div className="reward-top">
                          <h2 className="reward-title"></h2>
                          
                        </div>
                        <div className="field">
                          <label htmlFor="uploadfile">Image</label>
                          <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={this.handlePhotoreward}
                required/>
                        </div>
                        <div className="field">
                          <label htmlFor="rewardtitle">Titre <span>*</span></label>
                          <input type="text" id="titre" name="titre" value={this.state.titre} onChange={this.onChange} required/> 
                        </div>
                       
                        <div className="field">
                          <label htmlFor="rewarddesc">Description<span>*</span> </label>
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
        onChange={this.handleEditorRewardChange}
      />                         </div>
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
                 </div>
                    </div>
                   
                    <button type="submit" className="btn-primary">Enregistrer</button>
                  </form>
                  {this.state.messagesucessreward && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucessreward}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                </div>
            <div role="tabpanel" className="tab-pane" id="account">
                  <div className="start-form">
                  {this.state.message && (
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
{this.state.message}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                  <form onSubmit={this.onSubmitaccount}>
                  <div className="field">
                          <label htmlFor="pledge">Numéro <span>*</span></label>
                          <input type="number" id="numero" name="numero" value={this.state.numero} onChange={this.onChange} required /> 
                        </div>
                        <div className="field">
                          <label htmlFor="pledge">Bank</label>
                          <input type="text" id="bank" name="bank" value={this.state.bank} onChange={this.onChange} required/> 
                        </div>
                  <button type="submit" className="btn-primary">Enregistrer</button> 
                    </form>
                    {this.state.messagesucessaccount && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucessaccount}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
       )
    
    
    }}
    export default Addproject  ;
