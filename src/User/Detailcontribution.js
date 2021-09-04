
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
export class Detailcontribution  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        contributions:[],
        detailscontributions:[],
    }}
    componentDidMount() {
        axios
        .get('http://localhost:3000/contribution/contributiondetail/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            
            contributions:res.data.data
            
            
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
        axios
        .get('http://localhost:3000/detailcontribution/alldetailscontributions/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            
            detailscontributions:res.data.data
            
            
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

    };
    render() {
        return (
<main id="main" className="site-main">
        <div className="page-title background-page">
          <div className="container">
            <h1>Profile</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Home</a><span>/</span></li>
                <li>Profile</li>
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
                <div className="account-content profile">
                  <h3 className="account-title">Détail Contribution</h3>
                  <div className="account-main">
                 
                    <div className="profile-box">
                      <h3>Informations de paiement</h3>
                      <ul>
                        <li>
                          <strong>Nom et Prénom:</strong>
                          <div className="profile-text"><p>{this.state.contributions.nomprenom}</p></div>
                        </li>
                        <li>
                          <strong>Adresse:</strong>
                          <div className="profile-text"><p>{this.state.contributions.adresse}</p></div>
                        </li>
                        <li>
                          <strong>Governorat:</strong>
                          <div className="profile-text"><p>{this.state.contributions.governorat}</p></div>
                        </li>
                        <li>
                          <strong>Ville:</strong>
                          <div className="profile-text"><p>{this.state.contributions.ville}</p></div>
                        </li>
                        <li>
                          <strong>Code postal:</strong>
                          <div className="profile-text"><p>{this.state.contributions.codepostal}</p></div>
                        </li>
                        <li>
                          <strong>Téléphone:</strong>
                          <div className="profile-text"><p>(+256) {this.state.contributions.telephone}</p></div>
                        </li>
                        <li>
                          <strong>Type de paiement:</strong>
                          <div className="profile-text"> {this.state.contributions.typepaiement=="p1-option"?(<p>Paiement à la livraison</p>):(<p>Virement bancaire direct</p>)}</div>
                        </li>
                      </ul>
                    </div>
                
                  </div>
                </div>
                <div className="account-content rewards account-table">
                  <h3 className="account-title">Détails</h3>
                  <div className="account-main">
                    <table>
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Quantité</th>
                          <th>Prix</th>
                          <th>Total</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                          {this.state.detailscontributions.map(item=>
                        <tr>
                          
                          <td>{item.rewardID?(item.rewardID.titre):(<span>Contribution sans contrepartie</span>)}</td>
                          <td>{item.quantite}</td>
                          <td>{item.prix}</td>
                          <td>{item.quantite ?(parseInt(item.prix)*parseInt(item.quantite)):(<span>{item.prix}</span>)}</td>
                        </tr>)}
                        <tr>
                          
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><p>Toatl:</p>{this.state.contributions.montant}</td>
                        </tr>
                </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
 )
    
    
}}
export default Detailcontribution  ;