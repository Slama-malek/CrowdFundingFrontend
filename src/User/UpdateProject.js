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
        projectdetail:[],
        projectsuivres:[],
        projectrewards:[],
        projectcontributions:[],
        projectupdates:[],
        projectupdate:[],
    message:'',
    messageupdate:'',
    messageab:'',
    messagedelete:'',
    messagedeleteab:'',
    messagedeletenews:'',
    activePage: 1,
    projectPerPage: 2
    
    };}
    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
    }
    componentDidMount() {
        axios
        .get('http://localhost:3000/contribution/allprojectcontributions/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            projectcontributions:res.data.data
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
            messagecontribution: resMessage
          });
        })
        .catch(err => {
          console.log(err);
        })
        axios
        .get('http://localhost:3000/project/project/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            projectdetail: res.data.data,
            projectrewards:res.data.data.rewards,
            projectupdates:res.data.data.updates,
            projectcontributions:res.data.data.contributions,
            projectsuivres:res.data.data.suivres
            
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
        .get('http://localhost:3000/contribution/allprojectcontributions/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            projectcontributions:res.data.data
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
            messagecontribution: resMessage
          });
        })
        .catch(err => {
          console.log(err);
        })
        axios
        .get('http://localhost:3000/updates/allupdates/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            projectupdate:res.data.data
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
            messageupdate: resMessage
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
          onDeleteClicknews (id) {
            var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
            if(resultat){
            axios
              .delete('http://localhost:3000/updates/delete/'+id)
              .then(res => {
                const newliste = this.state.projectupdate.filter(project=> project._id !== id)
                this.setState({
                    messagedeletenews: res.data.data,
                    projectupdate:newliste
                    
                  });
                  this.props.history.push("/edit-project/"+this.props.match.params.id);
                console.log(res.data.data);
                
              })
              .catch(err => {
                console.log(err);
              })}
              
          

          }
          onDeleteClickcontribution (id) {
            var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
            if(resultat){
            axios
              .delete('http://localhost:3000/contribution/delete/'+id)
              .then(res => {
                const newliste = this.state.projectcontributions.filter(project=> project._id !== id)
                this.setState({
                    messagedeletenews: res.data.data,
                    projectcontributions:newliste
                    
                  });
                  this.props.history.push("/edit-project/"+this.props.match.params.id);
                console.log(res.data.data);
                
              })
              .catch(err => {
                console.log(err);
              })}
              
          

          }
          onvalide(id){
            const data = {
                status:"Approved"
              }; 
              axios
            .put('http://localhost:3000/contribution/updatestatus/'+id, data)
            .then(res => {
                this.setState({
                    messagestatus:"Community approved with success"
                    
                  });
               
                  
                  window.location.reload();
            })
            .catch(err => {
              console.log(err);
            })
          }
    render() {  
      const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
       // const currentTodos = this.state.usercommunities.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentrewards = this.state.projectrewards.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentupdates = this.state.projectupdate.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentcontributions = this.state.projectcontributions.slice(indexOfFirstTodo, indexOfLastTodo);

        //console.log(currentabonnement)
      /*  const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.usercommunities / this.state.projectPerPage); i++) {
          pageNumbers.push(i);
        }*/
        
      var total=0;
      for (const [index, value] of this.state.projectcontributions.filter(project=> project.status == "Approved").entries()) {
        total+=value.montant;
               }
        return (
            <main id="main" className="site-main">
      <div className="page-title background-blog">
          <div className="container">
              
            <h1>Commuanutés</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Tableau de bord</a><span>/</span></li>
                <li>Modifier un projet</li>
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

</ul>
                </nav>
              </div>
              
              <div className="col-lg-9">
              <Tabs>
                <div className="account-content my-campaigns account-table">

                <h3 class="account-title">Modifier le projet</h3>
                <TabLink to="tab1" >Détails</TabLink>
                                    
                <TabLink to="tab2">Récompenses</TabLink>
                <TabLink to="tab3">News</TabLink>
             
                <TabLink to="tab4" >Contributions</TabLink>
                
                 
                                  
                <TabContent for="tab1">
         
        <div className="account-main">
          <div className="campaign-item">
            <a className="campaign-image" href="#"><img src={`${this.state.projectdetail.cover_image}`}alt="" style={{width: '150px',height:'150px'}}/></a>
            <div className="campaign-box">
              <div className="campaign-category"><a href="#">{this.state.projectdetail.category}</a></div>
              <div className="campaign-title"><a href="#">{this.state.projectdetail.name}</a></div>
              <div className="campaign-desc">{this.state.projectdetail.headline}</div>
            </div>
          </div>
          <div className="profile-box">
            <h3>Infomations</h3>
            <ul>
              <li>
                <strong>Description:</strong>
                <div className="profile-text" dangerouslySetInnerHTML={{__html: this.state.projectdetail.description}} />
              </li>
              <li>
                <strong>Objectif:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.goal}</p></div>
              </li>
              <li>
                <strong>Collecté:</strong>
                <div className="profile-text"><p>{total}</p></div>
              </li>
              <li>
                <strong>Participants:</strong>
                <div className="profile-text"><p>{this.state.projectcontributions.length}</p></div>
              </li>
              <li>
                <strong>Suivies:</strong>
                <div className="profile-text"><p>{this.state.projectsuivres.length}</p></div>
              </li>
              <li>
                <strong>Duration:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.diration}</p></div>
              </li>
              <li>
                <strong>Location:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.location}</p></div>
              </li>
              <li>
                <strong>Lien Facebbok:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.facebook_link}</p></div>
              </li>
              <li>
                <strong>Lien Linkedin:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.linkedin_link}</p></div>
              </li>
              <li>
                <strong>Lien Twitter:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.twiter_link? (this.state.projectdetail.twiter_link):(<span>-</span>)}</p></div>
              </li>
              <li>
                <strong>Site web:</strong>
                <div className="profile-text"><p>{this.state.projectdetail.website? (this.state.projectdetail.website):(<span>-</span>)}</p></div>
              </li>
              
            </ul>
          </div>
      
          <Link class="btn-primary" to={`/update-project/${this.state.projectdetail._id}`}>Edit Projet</Link>        </div>
     
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
           
            <th>Détails</th>
            <th>Modifier</th>
            <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {currentrewards.map(item=>
            
            <tr>
                <td>
    <img src={`${item.cover_image}`}alt="" style={{width: '50px',height:'50px'}}/>
</td>
            <td>{item.titre}</td>
            <td>{moment(item.createdAt).fromNow()}</td>
            
            
            <td>
        

        <Link to={`/detail-reward/${item._id}`}><button className="btn btn-outline-success"><span className="icon-label"><i class="fa fa-eye" aria-hidden="true"></i> </span></button> </Link>
        </td>
            <td>
        

            <Link to={`/edit-reward/${item._id}`}><button className="btn btn-outline-info"><span className="icon-label"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> </span></button> </Link>
            </td>

            
            <td><a><button className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,item._id)}><span className="icon-label"><i class="fa fa-trash" aria-hidden="true"></i> </span></button> </a>
            </td>
            </tr>
           )}
           
           
            </tbody>
            </table>):<div class="alert alert-info" role="alert">
           Vous n'avez pas encore rdes recompenses
           </div>}
            
            
             <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.projectrewards.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
             </div>

         
          
        
             <Link class="btn-primary" to={`/add-reward/${this.state.projectdetail._id}`}>Ajouter Récompense</Link>        

          </div>

        </TabContent>               
               
             
        <TabContent for="tab3"> 
  <div className="account-main">
          {this.state.messagedeletenews && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagedeletenews }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
           {!this.state.messageupdate ? (
             <table>
            <thead>
            <tr>
            
            <th>Nom</th>
            <th>Date</th>
           
            <th>Détails</th>
            <th>Modifier</th>
            <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {currentupdates.map(item=>
            
            <tr>

            <td>{item.titre}</td>
            <td>{moment(item.createdAt).fromNow()}</td>
            
            
            <td>
        

        <Link to={`/detail-news/${item._id}`}><button className="btn btn-outline-success"><span className="icon-label"><i class="fa fa-eye" aria-hidden="true"></i> </span></button> </Link>
        </td>
            <td>
        

            <Link to={`/edit-news/${item._id}`}><button className="btn btn-outline-info"><span className="icon-label"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> </span></button> </Link>
            </td>

            
            <td><a><button className="btn btn-outline-danger" onClick={this.onDeleteClicknews.bind(this,item._id)}><span className="icon-label"><i class="fa fa-trash" aria-hidden="true"></i> </span></button> </a>
            </td>
            </tr>
           )}
           
           
            </tbody>
            </table>):<div class="alert alert-info" role="alert">
           Vous n'avez pas encore des updates
           </div>}
            
            
             <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.projectupdate.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
             </div>

         
          
        
             <Link class="btn-primary" to={`/add-news/${this.state.projectdetail._id}`}>Ajouter News</Link>        

          </div>

        </TabContent>               
               
        <TabContent for="tab4"> 
  <div className="account-main">

          {this.state.messagedeletecontribution && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagedeletecontribution }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
           {!this.state.messagecontribution ? (
             <table>
            <thead>
            <tr>
            
            <th>Nom</th>
            <th>Date</th>
           
            <th>Détails</th>
            <th>Valider</th>
            <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {currentcontributions.map(item=>
            
            <tr>

            <td>{item.userID.username}</td>
            <td>{moment(item.createdAt).fromNow()}</td>
            
            
            <td>
        

        <Link to={`/detail-contribution/${item._id}`}><button className="btn btn-outline-success"><span className="icon-label"><i class="fa fa-eye" aria-hidden="true"></i> </span></button> </Link>
        </td>
            <td>
        

           <a><button className="btn btn-outline-info" onClick={this.onvalide.bind(this,item._id)}><span className="icon-label"><i class="fa fa-check" aria-hidden="true"></i> </span></button></a> 
            </td>

            
            <td><a><button className="btn btn-outline-danger" onClick={this.onDeleteClickcontribution.bind(this,item._id)}><span className="icon-label"><i class="fa fa-trash" aria-hidden="true"></i> </span></button> </a>
            </td>
            </tr>
           )}
           
           
            </tbody>
            </table>):<div class="alert alert-info" role="alert">
           Vous n'avez pas encore des contributions
           </div>}
            
            
             <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.projectcontributions.length}
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
    export default UpdateProject;
