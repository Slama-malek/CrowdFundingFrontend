import React, { Component } from 'react'
import moment from 'moment'
import Pagination from "react-js-pagination";
import API from "../utils/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';
class DetailUserContribution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributions:[],
        message:'',
        activePage: 1,
        projectPerPage: 9
        
        };}

        handlePageChange(pageNumber) {
            console.log(`active page is ${pageNumber}`);
            this.setState({activePage: pageNumber});
          }
        componentDidMount() {
            const id =API.getCurrentUser().data._id
              
            axios
            .get('http://localhost:3000/detailcontribution/alldetailscontributions/'+this.props.match.params.id)
            .then(res => {
                 
                this.setState({
                  contributions: res.data.data
                 
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
          onimprimer(divName) {
            var printContents = document.getElementById(divName).innerHTML;    
         var originalContents = document.body.innerHTML;      
         document.body.innerHTML = printContents;     
         window.print();     
         document.body.innerHTML = originalContents;
         
          }
    render() {

        const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
        var currentcontributions = this.state.contributions.slice(indexOfFirstTodo, indexOfLastTodo);
        
        return (
            <main id="main" className="site-main">
        <div className="page-title background-blog">
          <div className="container">
            <h1>Rewards</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Home</a><span>/</span></li>
                <li>Rewards</li>
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
                        <li ><Link to={"/projects"}>Projets</Link></li>
                        <li><Link to={"/communities"}>Communautés</Link></li>
                        <li className="active"><Link to={"/Contributions"}>Contributions</Link></li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-9" id='sectionAimprimer'>
                <div className="account-content rewards account-table">
                  <h3 className="account-title">Détails Récompense</h3>
                  <div className="account-main">
                  {!this.state.message ?(
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
                      {currentcontributions.map(item=>
                 <tr>
                          
                          <td>{item.rewardID?(item.rewardID.titre):(<span>Contribution sans contrepartie</span>)}</td>
                          <td>{item.quantite}</td>
                          <td>{item.prix}</td>
                          <td>{item.quantite ?(parseInt(item.prix)*parseInt(item.quantite)):(<span>{item.prix}</span>)}</td>
                        </tr>)}
                     
                 </tbody>
                    </table>):<div class="alert alert-info" role="alert">
            Vous n'avez pas encore des communautés
            </div>}
            <form>
        <button id="impression" name="impression" type="button" button className="btn btn-outline-success" onClick={this.onimprimer.bind(this,'sectionAimprimer')}  >Imprimer </button>
      </form>
                    <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.contributions.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
          </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </main>
      
            )
    }
}

export default DetailUserContribution