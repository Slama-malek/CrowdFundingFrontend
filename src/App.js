import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import React, { Component } from 'react'
import Footer from './Layout/Footer';
import Navbar from './Layout/Navbar';

import Header from './Layout/Header';
import Home from './Layout/Home';
import Login from './Layout/Login';
import Register from './Layout/Register';
import Profile from './User/Profile';
import Projects from './User/Projects'
import Addproject from './User/Addproject'
import EditProject from './User/EditProject';
import UpdateProject from './User/UpdateProject';
import Addreward from './User/Addreward';
import Editreward from './User/Editreward';
import Detailreward from './User/Detailreward';
import Addnews from './User/Addnews';
import Editnews from './User/Editnews';
import Detailcontribution from './User/Detailcontribution';
import Detailuser from './Layout/Detailuser';
import Communities from './User/Communities'
import AddCommunity from './User/AddCommunity'
import EditCommunity from './User/EditCommunity'
import DetailCommunity from './User/DetailCommunity'
import DetailMember from './User/DetailMember'
import ListProjects from './Layout/ListProjects';

import DashInv from './Layout/DashInv';
import Contributions from './User/Contributions';
import DetailUserContribution from './User/DetailUserContribution';
import DashUser from './User/DashUser';
import UpdateUser from './User/UpdateUser';
import Communautes from './Layout/Communautes';
import Detailcommunitie from './Layout/Detailcommunitie';
import Detailproject from './Layout/Detailproject';
import Detaileproject from './Layout/DetaileProject';
import Cart from './Layout/Cart';
import Checkout from './Layout/Checkout';
import API from "./utils/api";
import ListInvestisseur from './Layout/ListInvestisseur';
import DetaileInves from './Layout/DetailInves';
import ContactInv from './Layout/ContactInv';
import EditProfile from './Layout/EditProfile';
import AddSociete from './Layout/AddSociete';
import Offres from './Layout/Offres';
import UpdateProfile from './Layout/UpdateProfile';


function App() {

  
  return (
    
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <Router>
      <div id="wrapper">
        
      <Route component={Navbar} />
     


<Switch>
             <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard-user" component={DashUser} />
            <Route exact path="/dashboard-invest" component={DashInv} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/edit-profile/:id" component={UpdateUser} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/add-project" component={Addproject} />
            <Route exact path="/edit-project/:id" component={UpdateProject} />
            <Route exact path="/add-reward/:id" component={Addreward} />
            <Route exact path="/edit-reward/:id" component={Editreward} />
            <Route exact path="/detail-reward/:id" component={Detailreward} />
            <Route exact path="/add-news/:id" component={Addnews} />
            <Route exact path="/edit-news/:id" component={Editnews} />
            <Route exact path="/detail-contribution/:id" component={Detailcontribution} />
            <Route exact path="/detail-user/:id" component={Detailuser} />
            <Route exact path="/update-project/:id" component={EditProject} />
            <Route exact path="/communities" component={Communities} />
            <Route exact path="/add-community" component={AddCommunity} />
            <Route exact path="/edit-community/:id" component={EditCommunity} />
            <Route exact path="/detail-community/:id" component={DetailCommunity} />
            <Route exact path="/detail-member/:id/:idc" component={DetailMember} />
            <Route exact path="/Contributions" component={Contributions} />
            
            <Route exact path="/detail-usercontributions/:id" component={DetailUserContribution} />
           
            <Route exact path="/listcommunuates" component={Communautes} />
            <Route exact path="/detailcommunity/:id" component={Detailcommunitie} />
            <Route exact path="/detailproject/:id" component={Detaileproject} />
          </Switch>
          <Route exact path="/cart/:id" component={Cart} /> 
          <Route exact path="/checkout/:id" component={Checkout} /> 
          <Route exact path="/listprojects" component={ListProjects} /> 
          <Route exact path="/listinvestiseurs" component={ListInvestisseur} />
          <Route exact path="/detailinvestisseur/:id" component={DetaileInves} /> 
          <Route exact path="/contact-investisseur/:id" component={ContactInv} /> 
          <Route exact path="/edite-profile/:id" component={EditProfile} /> 
          <Route exact path="/add-societe" component={AddSociete} /> 
          <Route exact path="/offres" component={Offres} /> 
          <Route exact path="/update-profile/:id" component={UpdateProfile} />
    <Footer />
    </div>
  
     </Router>
    
  );
}

export default App;
