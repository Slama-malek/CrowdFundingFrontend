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
class Communautes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        communities:[],
        message:'',
        activePage: 1,
        projectPerPage: 9
        
        };}

        handlePageChange(pageNumber) {
            console.log(`active page is ${pageNumber}`);
            this.setState({activePage: pageNumber});
          }
        componentDidMount() {
            
              
            axios
              .get('http://localhost:3000/commu/allcommus')
              .then(res => {
                 
                this.setState({
                  communities: res.data.data
                 
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
    render() {

        const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
        var currentcommunities = this.state.communities.slice(indexOfFirstTodo, indexOfLastTodo);
       currentcommunities=currentcommunities.filter(project=> project.status == "Approved")
        return (
            
            <body class="blog-grid full-width">
<div id="wrapper">
            <main id="main" className="site-main">
            <div className="page-title background-blog">
              <div className="container">
                <h1>Liste des Commuanutés</h1>
                <div className="breadcrumbs">
                  <ul>
                    <li><a href="index-2.html">Accueil</a><span>/</span></li>
                    <li>Liste des communautés</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
              
                <div className="col-lg-12 main-content">
                {!this.state.message ?(
                  <div className="grid-post">
                     
                      {currentcommunities.map(item=>
                    <article className="post">
                      <Link className="overlay" Link to={`/detailcommunity/${item._id}`} >
                      <img src={`${item.cover_image}`}alt="" style={{width: '380px',height:'197.14px'}}/>
                        <span className="ion-ios-search-strong" />
                      </Link>
                      <div className="post-info">
                        <h3 className="post-title"><Link to={`/detailcommunity/${item._id}`}>{item.nom}</Link></h3>
                        <ul className="post-meta">
                          <li><i className="fa fa-calendar-check-o" aria-hidden="true" /><a href="#">{moment(item.createdAt).format('ll')}</a></li>
                          <li><i className="fa fa-user-o" aria-hidden="true" /><span>par</span><Link to={"/detail-user/" +item.userID._id}>{item.userID.username}</Link></li>
                        </ul>
                        <div className="post-desc"><p></p></div>
                      </div>
                    </article>)}
             </div>):(
                    <div class="alert alert-info" role="alert">
                    Il n'y a pas encores des communautés!
                    </div> )}
                  <div className="page-navigation">
                  <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={this.state.communities.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
                  </div>
                </div>
               
              </div>
            </div>
          </main>
          </div>
          </body>
        )
    }
}

export default Communautes