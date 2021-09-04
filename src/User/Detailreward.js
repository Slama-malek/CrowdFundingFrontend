import React from "react";
import moment from 'moment'
import Pagination from "react-js-pagination";
import {Tabs,TabLink,TabContent }from 'react-tabs-redux';
import API from "../utils/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';
export class UpdateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        detailreward:[],
        contributions:[]
        
    
    };}
    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
    }
    componentDidMount() {
        axios
        .get('http://localhost:3000/reward/rewarddetail/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            detailreward: res.data.data,
            contributions:res.data.data.contributions
            
            
          })
          console.log(res.data.data)
          console.log(this.state.contributions.length)
          
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
    
 
        onDeleteClick (id) {
            var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
            if(resultat){
            axios
              .delete('http://localhost:3000/reward/delete/'+id)
              .then(res => {
                const newliste = this.state.projectrewards.filter(project=> project._id !== id)
                this.setState({
                    messagedelete: res.data.data,
                    projectrewards:newliste
                    
                  });
                  this.props.history.push("/edit-project/"+this.props.match.params.id);
                console.log(res.data.data);
                
              })
              .catch(err => {
                console.log(err);
              })}
              
          };
      
    render() {  
     
        
      var pourcentage=0;
        return (
            <main id="main" className="site-main">
      <div className="page-title background-blog">
          <div className="container">
              
            <h1>Commuanutés</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Dashboard</a><span>/</span></li>
                <li>Mes communautés</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="account-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <nav className="account-bar">
                  <ul>
                  <li><Link
                to={"/dashboard-user"}>Tableau de bord</Link></li>
                        <li ><Link to={"/profile"}>Profil</Link></li>
                        <li className="active"><Link to={"/projects"}>Projets</Link></li>
                        <li ><Link to={"/communities"}>Communautés</Link></li>
                        <li ><Link to={"/Contributions"}>Contributions</Link></li>

</ul>
                </nav>
              </div>
              
              <div className="col-lg-9">
           
                <div className="account-content my-campaigns account-table">

                <h3 class="account-title">Détail Récompense</h3>
               
                
                 
                                  
                
         
        <div className="account-main">
          <div className="campaign-item">
            <a className="campaign-image" href="#"><img src={`${this.state.detailreward.cover_image}`}alt="" style={{width: '150px',height:'150px'}}/></a>
            <div className="campaign-box">
              <div className="campaign-title"><a href="#">{this.state.detailreward.titre}</a></div>
             
            </div>
          </div>
          <div className="profile-box">
            <h3>Infomations</h3>
            <ul>
              <li>
                <strong>Description:</strong>
                <div className="profile-text" dangerouslySetInnerHTML={{__html: this.state.detailreward.description}} />
              </li>
              <li>
                <strong>Prix:</strong>
                <div className="profile-text"><p>{this.state.detailreward.min_value}</p></div>
              </li>
              <li>
                <strong>Max_contribution:</strong>
                <div className="profile-text"><p>{this.state.detailreward.max_contribution}</p></div>
              </li>
              <li>
                <strong>Date d'expiration:</strong>
                <div className="profile-text"><p>{this.state.detailreward.date_exp}</p></div>
    
              </li>
              <li>
                <strong>Contributions:</strong>
                <div className="profile-text"><p>{this.state.contributions.length}</p></div>

              </li>
        
            </ul>
          </div>
      
          <Link class="btn-primary" to={`/edit-reward/${this.state.detailreward._id}`}>Edit Récompense</Link>        </div>
     
       
                </div>
             
              </div>
             
           </div>
           </div>
          
        </div>
      </main>
        )
    
    
    }}
    export default UpdateProject;
