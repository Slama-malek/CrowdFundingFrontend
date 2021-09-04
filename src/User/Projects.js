import React from "react";
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
export class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    userprojects:[],
    message:'',
    messageprojects:'',
    messagedelete:'',
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
        .get('http://localhost:3000/project/userbyproject/'+id)
        .then(res => {
           
          this.setState({
            userprojects: res.data.data
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
            messageprojects: resMessage
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
        .delete('http://localhost:3000/project/delete/'+id)
        .then(res => {
          const newliste = this.state.userprojects.filter(project=> project._id !== id)
          this.setState({
              messagedelete: res.data.data,
              userprojects:newliste
              
            });
            this.props.history.push("/projects");
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })}
        
    };
    onClickAjout()
    {
      if(JSON.parse(localStorage.getItem('projectID'))){
        localStorage.removeItem('projectID')
      }
     this.props.history.push("/add-project");

    }
    render() {  
      console.log("messss"+this.state.messageprojects)
      const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
        const currentTodos = this.state.userprojects.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.userprojects / this.state.projectPerPage); i++) {
          pageNumbers.push(i);
        }
        
      var pourcentage=0;
        return (
            <main id="main" className="site-main">
        <div className="page-title background-blog">
          <div className="container">
            <h1>Mes Projets</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Tableau de bord</a><span>/</span></li>
                <li>Mes Projets</li>
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
                        <li><Link to={"/communities"}>Communautés</Link></li>
                        <li ><Link to={"/Contributions"}>Contributions</Link></li>

</ul>
                </nav>
              </div>
              <div className="col-lg-9">
        <div className="account-content my-campaigns account-table">
          <h3 className="account-title">Mes projets</h3>

          <div className="account-main">
          {this.state.messagedelete && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagedelete }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
           
            {!this.state.messageprojects ?currentTodos.map(item=>
            <div className="campaign-item">
              <a className="campaign-image" href="#"><img src={`${item.cover_image}`}alt="" style={{width: '150px',height:'150px'}}/></a>
              <div className="campaign-box">
                <div style={{position: 'absolute', right: '80px', width: '200px', height: '120px'}}><Link to={`/edit-project/${item._id}`}><button className="btn btn-outline-info"><span className="icon-label"><i className="icon-trash" /> </span><span className="btn-text">Edit</span></button> </Link>
                </div>
                <div style={{position: 'absolute', right: '5px', width: '200px', height: '120px'}}><a><button className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,item._id)}><span className="icon-label"><i className="icon-trash" /> </span><span className="btn-text">Supprimer</span></button> </a>
                </div>
                <div className="campaign-category"><a href="#">{item.category}</a></div>
                <div className="campaign-title"><a href="#">{item.name}</a></div>
                <div className="campaign-desc">{item.headline}</div>
                <div style={{visibility:'hidden'}}>{ item.contributions ? pourcentage=item.contributions.filter(project=> project.status == "Approved").reduce((sum,v) => sum += v.montant,0)*100/item.goal:pourcentage=0}</div>

                <div className="process">
                <div class="progress">
              {/*pourcentage=parseInt(total*100/value.goal)*/}
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width:  `${pourcentage}%`}}>{pourcentage}%</div>
</div>
                  <div className="process-info">
                    <div className="process-pledged"><span>{item.contributions.reduce((sum,v) => sum += v.montant,0)}DT</span>Collecté</div>
                    <div className="process-funded"><span>{item.contributions.length}</span>Participants</div>
                    <div className="process-time"><span>{moment(item.createdAt).fromNow()}</span></div>
                    <div class="process-time"><span class="fa fa-clock-o"style={{position: 'center'}} ></span>{item.status=="Approved"?(<span>Approuvé</span>):item.status=="Pending"?(<span>En attente</span>):item.status=="Rejected"?(<span>Refuse</span>):<span>Réussie</span>}</div>

                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
         ):<div class="alert alert-info" role="alert">
         Vous n'avez pas encore des projets
         </div>}
             <div class="page-navigation" style={{position: 'center'}}>
             <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.userprojects.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
             </div>

          <button className="btn-primary" onClick={this.onClickAjout.bind(this)}>Ajouter un projet</button>
          
        
    
          </div>
        </div>
      </div></div>
          </div>
        </div>
      </main>
        )
    
    
    }}
    export default Projects  ;
