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
class ListInvestisseur extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listinvestisseurs: [],
            message: "",
            activePage: 1,
            projectPerPage: 9
          };
        }
        handlePageChange(pageNumber) {
          console.log(`active page is ${pageNumber}`);
          this.setState({activePage: pageNumber});
        }
        componentDidMount() {
          axios
          .get('http://localhost:3000/user/allusers')
        .then(response => {
          this.setState({
            listinvestisseurs: response.data.data
          });
          console.log(response.data);
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
        .catch(e => {
          console.log(e);
        });}
        render() {
          var listinv=[]
          
         listinv =this.state.listinvestisseurs.filter(user => user.role == "investisseur")
          const indexOfLastTodo = this.state.activePage * this.state.projectPerPage;
          const indexOfFirstTodo = indexOfLastTodo - this.state.projectPerPage;
          var investisseurs=[];
          if(this.state.listinvestisseurs){
           investisseurs = listinv.slice(indexOfFirstTodo, indexOfLastTodo);}
            return (
<body class="shop-grid">
<div id="wrapper">
<main id="main" className="site-main">
<div className="page-title background-blog">
          <div className="container">
            <h1>List Investisseurs</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Accueil</a><span>/</span></li>
                <li>List Investisseurs</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 main-content">
              <div className="shop-grid-fillter clearfix">
                
                
              </div>
              {!this.state.message ?(
              <div className="grid-product">
                {investisseurs.map(item=>
                <div className="product">
                  <a href="shop-details.html"> <img src={`${item.cover_image}`}alt="" style={{width: '270px',height:'180px'}}/></a>
                  <div className="product-info">
                    <h3 className="product-title"><Link to={"/detail-user/"+ item._id}>{item.username}</Link></h3>
                    <p className="product-price">{item.secteur}</p>
                  </div>
                </div>)}
            </div>):(<div> Il n a pas encore des investisseurs</div>)}
              <div className="page-navigation">
              <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.projectPerPage}
            totalItemsCount={listinv? listinv.length:0}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
              </div>
            </div>
          </div>
        </div>
      </main>
</div>
</body> );
    }
}

export default ListInvestisseur