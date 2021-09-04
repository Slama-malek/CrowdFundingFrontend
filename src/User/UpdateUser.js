import React from "react";


import API from "../utils/api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

export class UpdateUser extends React.Component {
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
    this.onSubmitadresse = this.onSubmitadresse.bind(this);
    this.onSubmitcarte= this.onSubmitcarte.bind(this);

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
              user: res.data.data
            })
            console.log(res.data.data.username);
            
          })
          .catch(err => {
            console.log(err);
          })

          axios
          .get('http://localhost:3000/user/cartsbyuser/'+this.props.match.params.id)
          .then(res => {
             
            this.setState({
                code_secret:res.data.data.code_secret,
                proprietaire:res.data.data.proprietaire,
                numero:res.data.data.numero,
                date_exp:res.data.data.date_exp,
              usercarts: res.data.data
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
        //formData.append('adresse', this.state.adresse);
        formData.append('facebook_link', this.state.facebook_link);
        formData.append('twiter_link', this.state.twiter_link);
        formData.append('linkedin_link', this.state.linkedin_link);

    
        axios
        .put('http://localhost:3000/user/update/'+this.props.match.params.id,formData)
          .then(res => {
            //this.props.history.push('/edit-category/'+this.props.match.params.id);
            this.props.history.push('/dashboard-user');
          })
          .catch(err => {
            console.log(err);
          })
          
      };


      onSubmitcarte= e => {
        e.preventDefault();
    
        const data = {
          numero: this.state.numero,
          date_exp:this.state.date_exp,
          proprietaire: this.state.proprietaire,
          code_secret: this.state.code_secret
        };
        console.log(data);
        

    
       
          axios
          .post('http://localhost:3000/cart/create/'+this.props.match.params.id,data)
            .then(res => {
              //this.props.history.push('/edit-category/'+this.props.match.params.id);
              this.props.history.push('/dashboard-user');
            })
            .catch(err => {
              console.log(err);
            })
          
      };
      onSubmitadresse= e => {
        e.preventDefault();
    
        const data = {
          adresse: this.state.adresse,
          ville:this.state.ville,
          pays: this.state.pays,
          code_postal: this.state.code_postal,
          governoment: this.state.governoment
        };
        console.log(data);
        

    
       
          axios
          .post('http://localhost:3000/adresse/create/'+this.props.match.params.id,data)
            .then(res => {
              //this.props.history.push('/edit-category/'+this.props.match.params.id);
              this.props.history.push('/dashboard-user');
            })
            .catch(err => {
              console.log(err);
            })
          
      };
    render() { 
        const usercarts=this.state.usercarts;

        return (
          <main id="main" className="site-main">
 <div className="page-title background-blog">        
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
          <div className="main-content">
            <div className="container">
              <div className="design-process-section" id="process-tab">
                <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                  <li>
                  <Link to={"/dashboard-user"}>
                      <span><img src="../images/assets/log-out.svg" alt="" /></span>
                      <p>Exit Editor</p>
                    </Link>
                  </li>
                  <li data-tab="basics" className="pm-option active">
                    <a href="#">
                      <span><img src="../images/assets/single-02.svg" alt="" /></span>
                      <p>Basics</p>
                    </a>
                  </li>
                  <li data-tab="rewards" className="pm-option">
                    <a href="#">
                      <span><img src="../images/assets/icons8-carte-de-crédit-mastercard-80.png" alt="" /></span>
                      <p>Cart Crédit</p>
                    </a>
                  </li>
                  <li data-tab="story" className="pm-option">
                    <a href="#">
                      <span><img src="../images/assets/icons8-adresse-50.png" alt="" /></span>
                      <p>Adresse</p>
                    </a>
                  </li>
                
                
                 
                  <li>
                  <Link to={"/profile"}>
                      <span><img src="../images/assets/eye-17.svg" alt="" /></span>
                      <p>Preview</p>
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="basics">
                    <div className="start-form">
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
                          <label htmlFor="projecttitle">Nom et Prénom <span>*</span></label>
                          <input type="text" id="username" name="username" value={this.state.username} onChange={this.onChange} /> 
                        </div>
                        <div className="field">
                          <label htmlFor="shortblurb">Bio <span>*</span></label>
                          <input type="text"  id="bio" name="bio" value={this.state.bio} onChange={this.onChange} /> 
                        </div>
                        <div className="field">
                          <label htmlFor="field">Profession <span>*</span></label>
                          <input type="text" id="profession" name="profession" value={this.state.profession} onChange={this.onChange} /> 
                        
                        </div>
                        
                        <div className="field">
                          <label htmlFor="funding">Numéro du Téléphone</label>
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
                  <div role="tabpanel" className="tab-pane" id="story">
                  <form onSubmit={this.onSubmitadresse}>
                      
                        <div className="start-form">
                         
                          <div className="field">
                            <label htmlFor="rewardtitle">Adresse</label>
                            <input type="text" name="adresse" id="adresse" placeholder="Adresse"  onChange={this.onChange} />
                          </div>
                          <div className="field">
                            <label htmlFor="pledge">Ville</label>
                            <input type="text" name="ville" id="ville" placeholder="Ville"  onChange={this.onChange} />
                          </div>
                          <div className="field">
                            <label htmlFor="rewarddesc">Governoment</label>
                            <input type="text" name="governoment" id="Governoment" placeholder="Governoment"  onChange={this.onChange} />

                          </div>
                          <div className="field">
                            <label htmlFor="rewarddesc">Code postal</label>
                            <input type="text" name="code_postal" id="code_postal" placeholder="Code postal"  onChange={this.onChange} />

                          </div>
                          <div className="field">
                            <label htmlFor="rewarddesc">Pays</label>
                            <input type="text" name="pays" id="pays" placeholder="Pays"  onChange={this.onChange} />

                          </div>
                          

                     
                      </div>
                     
                      <button type="submit" className="btn-primary">Enregistrer</button>                    </form>
                  </div>
                  <div role="tabpanel" className="tab-pane" id="rewards">
                  <form onSubmit={this.onSubmitcarte}>
                      <div id="itemform">
                        
                        <div className="start-form">
                          <div className="reward-top">
                            <h2 className="reward-title">Détails du carte </h2>
                            
                          </div>
                          <div className="field">
      <label htmlFor="fname">Numéro</label>
      <input type="text" name="numero" id="numero" placeholder="Numéro"  onChange={this.onChange} />
    </div>
    <div className="field">
      <label htmlFor="lname">Code secret</label>
      <input type="text" name="code_secret" id="code_secret" placeholder="Code secret"  onChange={this.onChange}/>
    </div>
    <div className="field">
      <label htmlFor="birthday">Propriétaire</label>
      <input type="text" name="proprietaire" id="proprietaire" placeholder="Propriétaire"  onChange={this.onChange}/>
    </div>
    <div className="field">
      <label htmlFor="address">Date d'expiration</label>
      <input type="date" name="date_exp" id="date_exp" placeholder="Date d'expiration"  onChange={this.onChange} />
    </div> 

                     </div>
                  
                      </div>
                      <div id="import" />
                      
                      <button type="submit" className="btn-primary">Enregistrer</button>                    </form>
                  
                  </div>
              </div>
              </div>
            </div>
          </div>
        </main>
)
}}
export default UpdateUser  ;
