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
class ListProjects extends Component {
    constructor(props) {
        super(props);
        
    
        this.state = {
          projects: [],
          projectsfilter: [],
          categories:[],
          category:'',
          name:'',
          activePage: 1,
          projectPerPage: 9
        };

        this.onChange = this.onChange.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

      componentDidMount() {
        API.getAllprojects()
      .then(response => {
        this.setState({
          projects: response.data,
          projectsfilter:response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
      axios
      .get('http://localhost:3000/categorie/allcategories')
      .then(res => {
         
        this.setState({
          categories: res.data.data
         
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

      
    
    
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });

      
if( e.target.value!='tout'){
      const newliste = this.state.projectsfilter.filter(project=> project.category == e.target.value)
      this.setState({
    projects:newliste
        
      })
    }
    if( e.target.value=='tout'){
      this.setState({
        projects: this.state.projectsfilter
            
          })
    }
    
    };
    onChangename = e => {
      this.setState({ [e.target.name]: e.target.value });

      
if( e.target.value!=''){
      const newliste = this.state.projectsfilter.filter(project=> project.name == e.target.value)
      this.setState({
    projects:newliste
        
      })
    }
    if( e.target.value==''){
      this.setState({
        projects: this.state.projectsfilter
            
          })
    }
    
    };
    onSubmit = e => {
      e.preventDefault();
      console.log(this.state.category)
      
    
    
    }

    render() {

        const {projects } = this.state;
        const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
        var currentcommunities = this.state.projects.slice(indexOfFirstTodo, indexOfLastTodo);
      currentcommunities=currentcommunities.filter(project=> project.status == "Approved")
        var pourcentage=0;
        return (
            <main id="main" class="site-main">
            <div className="page-title background-blog">
            <div class="container">
            <h1>
      Liste des projets</h1>
            <div class="breadcrumbs">
            <ul>
            <li><a href="/">Accueil</a><span>/</span></li>
            <li>Liste des projets</li>
            </ul>
            </div>
            </div>
            </div>
            <div className="campaigns-action clearfix">
        <div className="container">
          
          <div className="filter">
            <span>Filtrer par:</span>
            <form onSubmit={this.onSubmit}>
              <div className="field-select">
                <select  name="category" onChange={this.onChange} required >
                  <option value='tout'>Toutes les catégories</option>
                  {this.state.categories.map(category=>
                 <option value={`${category.name}`}>{category.name}</option>)}
                  
                </select>
              </div>
              <div className="field-select" >
              <input type="text" id="name" placeholder="titre" name="name" value={this.state.name} onChange={this.onChangename} required /> 

              </div>
            </form>
          </div>
        </div>
      </div>
            <div class="campaigns">
<div class="container">
<div class="campaign-content">
<div class="row">
{currentcommunities &&
              currentcommunities.map(project => 
<div class="col-lg-4 col-sm-6 col-6">
<div class="campaign-item">
<Link class="overlay" to={"/detailproject/" + project._id}>
<img  src={`${project.cover_image}`}alt="" style={{width: '370px',height:'240px'}}/>
<span class="ion-ios-search-strong"></span>
</Link>
<div class="campaign-box">
<Link to={"/detailproject/" + project._id} class="category">{project.category}</Link>
<h3><Link
                to={"/detailproject/" + project._id}
                
              >
                {project.name}
              </Link></h3>

<div class="campaign-description">{project.headline}</div>
<div class="campaign-author"><Link class="author-icon"  to={"/detail-user/" +project.userID._id}><img  src={`${project.userID.cover_image}`}alt="" style={{width: '35px',height:'35px'}}/></Link>par <Link class="author-name" to={"/detail-user/" +project.userID._id}>{project.userID.username}</Link></div>
<div class="process">
<div style={{visibility:'hidden'}}>{ project.contributions ? pourcentage=project.contributions.filter(project=> project.status == "Approved").reduce((sum,v) => sum += v.montant,0)*100/project.goal:pourcentage=0}</div>

<div class="progress">

  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width:  `${pourcentage}%`}}>{pourcentage}%</div>
</div>
<div class="process-info">
<div class="process-pledged"><span>{project.goal}DT</span>Objectif</div>

<div class="process-funded"><span>{project.contributions.reduce((sum,v) => sum += v.montant,0)}DT</span>Collecté</div>
<div class="process-funded"><span>{project.contributions.length}</span>Participants</div>
<hr></hr>
<div class="process-time"><span class="fa fa-clock-o"style={{position: 'center'}} >{parseInt((new Date(project.duration)-Date.now())/ (1000 * 3600 * 24))}</span>Jours Restant</div>
</div>
</div>
</div>

</div>
</div>

)}
</div>
</div>
<div class="page-navigation">
<Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.projects.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
      </div>
</div>
</div>
</main>

        );
    }
}

export default ListProjects