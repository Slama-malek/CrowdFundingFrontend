import React from "react";


import API from "../utils/api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

export class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        bio:'',
        profession:'',
        adresse:'',
        telephone:'',
        facebook_link:'',
        twiter_link:'',
        linkedin_link:'',
        cover_image:'',
        secteur:'',
        numero:'',
        code_secret:'',
        proprietaire:'',
        date_exp:'',
        ville:'',
        governoment:'',
        code_postal:'',
        pays:'',
        user:[],
         usercarts:[]
        };
        this.onChange = this.onChange.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

      }
      componentDidMount() {
        
        axios
          .get('http://localhost:3000/user/user/'+this.props.match.params.id)
          .then(res => {
             
            this.setState({
                username:res.data.data.username,
                bio:res.data.data.bio,
                profession:res.data.data.profession,
                adresse:res.data.data.adresse,
                telephone:res.data.data.telephone,
                facebook_link:res.data.data.facebook_link,
                twiter_link:res.data.data.twiter_link,
                linkedin_link:res.data.data.linkedin_link,
                code_secret:res.data.data.carts.code_secret,
                proprietaire:res.data.data.carts.proprietaire,
                numero:res.data.data.carts.numero,
                date_exp:res.data.data.carts.date_exp,
                secteur:res.data.data.carts.secteur,
              user: res.data.data
            })
            console.log(res.data.data.username);
            
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
    
        const data = {
          numero: this.state.numero,
          date_exp:this.state.date_exp,
          proprietaire: this.state.proprietaire,
          code_secret: this.state.code_secret
        };
        console.log(data);
        const formData = new FormData();
        formData.append('cover_image', this.state.cover_image);
        formData.append('username', this.state.username);
        formData.append('bio', this.state.bio);
        formData.append('profession', this.state.profession);
        formData.append('telephone', this.state.telephone);
        formData.append('secteur', this.state.secteur);
        formData.append('facebook_link', this.state.facebook_link);
        formData.append('twiter_link', this.state.twiter_link);
        formData.append('linkedin_link', this.state.linkedin_link);

    
        axios
        .put('http://localhost:3000/user/update/'+this.props.match.params.id,formData)
          .then(res => {
            //this.props.history.push('/edit-category/'+this.props.match.params.id);
            this.props.history.push('/dashboard-invest');
          })
          .catch(err => {
            console.log(err);
          })
          
      };


   
    
    render() { 
        

        return (
<main id="main" className="site-main">
        <div className="page-title background-campaign">
          <div className="container">
          <h1>Edit Profile</h1>
              <div className="breadcrumbs">
                <ul>
                  <li><a href="index-2.html">Profile</a><span>/</span></li>
                  <li>Edit Profile</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="campaign-form form-update">
          <div className="container">
            <div className="design-process-section" id="process-tab">
              <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                <li>
                <Link to={"/dashboard-invest"}>
                    <span><img src="../images/assets/log-out.svg" alt="" /></span>
                    <p>Exit Editor</p>
                  </Link>
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
            />
                        </div>
                        <div className="field">
                          <label htmlFor="projecttitle">Nom et Pr??nom*</label>
                          <input type="text" id="username" name="username" value={this.state.username} onChange={this.onChange} /> 
                        </div>
                        <div className="field">
                          <label htmlFor="shortblurb">Bio *</label>
                          <input type="text"  id="bio" name="bio" value={this.state.bio} onChange={this.onChange} /> 
                        </div>
                        <div className="field">
                          <label htmlFor="field">Profession *</label>
                          <input type="text" id="profession" name="profession" value={this.state.profession} onChange={this.onChange} /> 
                        
                        </div>
                        <div className="field">
                          <label htmlFor="field">Secteur *</label>
                          <input type="text" id="secteur" name="secteur" value={this.state.secteur} onChange={this.onChange} /> 
                        
                        </div>
                        
                        <div className="field">
                          <label htmlFor="funding">Num??ro du T??l??phone</label>
                          <input type="text" defaultValue id="telephone" name="telephone" value={this.state.telephone} onChange={this.onChange} /> 

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
                      
                        <button type="submit" className="btn-primary">Enregistrer</button>
                        
                      </form>
                    </div>
          </div>
        </div></main>

)
}}
export default UpdateProfile  ;
