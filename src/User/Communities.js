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
export class Communities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    usercommunities:[],
    userabonnement:[],
    message:'',
    messageab:'',
    messagedelete:'',
    messagedeleteab:'',
    activePage: 1,
    projectPerPage: 2
    
    };}
    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
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
        

    };
    onDeleteClick (id) {
      var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
      if(resultat){
      axios
        .delete('http://localhost:3000/commu/delete/'+id)
        .then(res => {
          const newliste = this.state.usercommunities.filter(project=> project._id !== id)
          this.setState({
              messagedelete: res.data.data,
              usercommunities:newliste
              
            });
            this.props.history.push("/communities");
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })}
        
    };
    onDeleterequestClick (id) {
        var resultat = window.confirm("Êtes-vous sûr de vouloir quitter cette communauté?");
        if(resultat){
        axios
          .delete('http://localhost:3000/member/delete/'+id)
          .then(res => {
            const newliste = this.state.userabonnement.filter(project=> project._id !== id)
            this.setState({
                messagedeleteab: res.data.data,
                userabonnement:newliste
                
              });
              this.props.history.push("/communities");
            console.log(res.data.data);
            
          })
          .catch(err => {
            console.log(err);
          })}
          
      };
    render() {  
      const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
        const currentTodos = this.state.usercommunities.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentabonnement = this.state.userabonnement.slice(indexOfFirstTodo, indexOfLastTodo);
        console.log(currentabonnement)
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.usercommunities / this.state.projectPerPage); i++) {
          pageNumbers.push(i);
        }
        
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
                        <li ><Link to={"/projects"}>Projets</Link></li>
                        <li className="active"><Link to={"/communities"}>Communautés</Link></li>
                        <li ><Link to={"/Contributions"}>Contributions</Link></li>

</ul>
                </nav>
              </div>
              
              <div className="col-lg-9">
              <Tabs>
                <div className="account-content my-campaigns account-table">

                <h3 class="account-title">Communautés</h3>
                <TabLink to="tab1" >Mes Communautés</TabLink>
                                    
                                    <TabLink to="tab2" style={{border: '0p',backgroundcolor:'#944'}}>Mes abonnements</TabLink>
                
                 
                                  
                <TabContent for="tab1">
                <div className="account-main">
          {this.state.messagedelete && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagedelete }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}

             {!this.state.message ?(
             <table>
            <thead>
            <tr>
            <th></th>
            <th>Nom</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Détails</th>
            <th>Edit</th>
            <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            { currentTodos.map(item=>
            
            <tr>
                <td>
    <img src={`${item.cover_image}`}alt="" style={{width: '50px',height:'50px'}}/>
</td>
            <td>{item.nom}</td>
            <td>{moment(item.createdAt).fromNow()}</td>
            <td>{item.status=="Approved"?(<span>Approuvé</span>):item.status=="Pending"?(<span>En attente</span>):item.status=="Rejected"?(<span>Refuse</span>):<span>Réussie</span>}</td>
            

            <td>
        

        <Link to={`/detail-community/${item._id}`}><button className="btn btn-outline-success"><span className="icon-label"><i class="fa fa-eye" aria-hidden="true"></i> </span></button> </Link>
        </td>
            <td>
        

            <Link to={`/edit-community/${item._id}`}><button className="btn btn-outline-info"><span className="icon-label"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> </span></button> </Link>
            </td>

            
            <td><a><button className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,item._id)}><span className="icon-label"><i class="fa fa-trash" aria-hidden="true"></i> </span></button> </a>
            </td>
            </tr>
            )}
           
           
            </tbody>
            </table>):<div class="alert alert-info" role="alert">
            Vous n'avez pas encore des communautés
            </div>}
            
            
     
             <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.usercommunities.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
             </div>

          <Link to={"/add-community"} className="btn-primary">Ajouter une communauté</Link>
          
        
    
          </div>
        </TabContent>
  <TabContent for="tab2"> 
  <div className="account-main">
          {this.state.messagedeleteab && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagedeleteab }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
           {!this.state.messageab ? (
             <table>
            <thead>
            <tr>
            <th></th>
            <th>Nom</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Détails</th>
            <th>Quiter</th>
            </tr>
            </thead>
            <tbody>
            {currentabonnement.map(item=>
            
            <tr>
                <td>
    <img src={`${item.communauteID.cover_image}`}alt="" style={{width: '50px',height:'50px'}}/>
</td>
            <td>{item.communauteID.nom}</td>
            <td>{moment(item.createdAt).fromNow()}</td>
            
            <td>{item.accepted?(<span>Accepté</span>):(<span>En attente</span>)}</td>
            
            <td>
        

            <Link to={`/edit-project/${item._id}`}><button className="btn btn-outline-info"><span className="icon-label"><i class="fa fa-eye" aria-hidden="true"></i> </span></button> </Link>
            </td><td><a><button className="btn btn-outline-danger" onClick={this.onDeleterequestClick.bind(this,item._id)}><span className="icon-label"><i class="fa fa-sign-out" aria-hidden="true"></i> </span></button> </a>
            </td>
            </tr>
           )}
           
           
            </tbody>
            </table>):<div class="alert alert-info" role="alert">
           Vous n'avez pas encore rejoindre aucune communautés
           </div>}
            
            
             <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.userabonnement.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
             </div>

         
          
        
    
          </div>
        </TabContent>               
                </div>
                </Tabs>
              </div>
             
           </div>
           </div>
          
        </div>
      </main>
        )
    
    
    }}
    export default Communities  ;
