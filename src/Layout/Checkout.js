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
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          messagesuccess:'',
          nomprenom:'',
          telephone:'',
          adresse:'',
          governorat:'',
          ville:'',
          codepostal:'',
          anonyme:false,
          typepaiment:'',
          notes:'',
          idcmd:'',
          message:''

        }
        this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInput1 = this.handleInput1.bind(this);
    }
    handleInput(event) {
     
     this.setState({
        typepaiment: event.target.id
      });
    }
    handleInput1(event) {
     
      this.setState({
         typepaiment: event.target.id
       });
     }
    handleInputChange(event) {
    
      if(this.state.anonyme== false){
        this.setState({
         anonyme: true
       });
    } else {
        this.setState({
         anonyme: false
       });
    }
    console.log(this.state.anonyme)
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
      e.preventDefault();
      var total=0
      if(JSON.parse(localStorage.getItem('panier'))){
      const itemrewards=JSON.parse(localStorage.getItem('panier'))
      for (const [index, value] of  itemrewards.entries())
      {
        total+=value.prixreward
      }
    }
  const data = {
    
    userID:API.getCurrentUser().data._id,
    projectID:this.props.match.params.id,
    montant:JSON.parse(localStorage.getItem('panierlibre'))?total+parseInt(JSON.parse(localStorage.getItem('panierlibre')).montant):total,
    typepaiement:this.state.typepaiment,
    anonymat:this.state.anonyme,
    nomprenom:this.state.nomprenom,
    telephone:this.state.telephone,
    adresse:this.state.adresse,
    governorat:this.state.governorat,
    ville:this.state.ville,
    codepostal:this.state.codepostal,
    notes:this.state.notes

  };
  console.log(data)
  var idcmd=0;
 axios
          .post('http://localhost:3000/contribution/create',data)
            .then(res => {   
              let projectID=JSON.parse(localStorage.getItem("conID"))
              if(projectID){
                localStorage.removeItem("conID")
                localStorage.setItem("conID", JSON.stringify(res.data.data._id));
  
              }
              else{
                localStorage.setItem("conID", JSON.stringify(res.data.data._id));
              } 

              if(JSON.parse(localStorage.getItem('panier'))){
                for (const [index, value] of  JSON.parse(localStorage.getItem('panier')).entries())
                {
                  const data = {
                    prix:value.prixreward,
                    quantite:value.quantite,
                    rewardID:value.rewardid ,
          
                  }
                  console.log(data)
                  axios
                    .post('http://localhost:3000/detailcontribution/create/'+JSON.parse(localStorage.getItem("conID")),data)
                      .then(ress => {
                      
                   
          
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
                        console.log(this.state.message)
  
                      }
                      )
                      .catch(err => {
                        console.log(err);
                      })
                }}
//jjjjjjjjjjjjjjjjjjjjjjjjjj
if(JSON.parse(localStorage.getItem('panierlibre'))){
  const datasimple = {
    prix:parseInt(JSON.parse(localStorage.getItem('panierlibre')).montant)
    

  }
  console.log(datasimple)
axios
  .post('http://localhost:3000/detailcontribution/create/'+JSON.parse(localStorage.getItem("conID")),datasimple)
    .then(res => {
      this.setState({
        
        messagesuccess:"Votre commande est cré avec succès"
      })
      
     // window.location.reload();
     this.props.history.push("/checkout/"+this.props.match.params.id);
      localStorage.removeItem("panierlibre")
      localStorage.removeItem("panier")
      localStorage.removeItem("conID")
   
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
    }
    )
    .catch(err => {
      console.log(err);
    })
  }
  else{
    this.setState({
        
      messagesuccess:"Votre commande est cré avec succès"
    })
    //window.location.reload();
    this.props.history.push("/checkout/"+this.props.match.params.id);
    localStorage.removeItem("panierlibre")
    localStorage.removeItem("panier")
    localStorage.removeItem("conID")
  }
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
            }
            )
            .catch(err => {
              console.log(err);
            })

          
          
          
          

console.log(idcmd)



}
    render() {
      var total=0
      if(JSON.parse(localStorage.getItem('panier'))){
      const itemrewards=JSON.parse(localStorage.getItem('panier'))
      for (const [index, value] of  itemrewards.entries())
      {
        total+=value.prixreward
      }}
        return (
            <main id="main" className="site-main">
            <div className="page-title background-cart">
              <div className="container">
                <h1>Checkout</h1>
                <div className="breadcrumbs">
                  <ul>
                    <li><a href="index-2.html">Home</a><span>/</span></li>
                    <li>Checkout</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="main-content">
                <div className="billing-detail">
                <form onSubmit={this.onSubmit}>       
                             <div className="row">
                             
                      <div className="col-lg-6">
                      {this.state.messagesuccess && (
        <div class="alert alert-success alert-dismissible fade show" role="alert">

              {this.state.messagesuccess }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
                        <h2>Détails de facturation</h2>
                        <div className="field">
                          <label htmlFor="country">Nom et Prénom:*</label>
                          <input type="text"  id="nomprenom" name="nomprenom" placeholder="Nom et Prénom" value={this.state.nomprenom} onChange={this.onChange}required/>

                          <div >
                          
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="city">Téléphone:*</label>
                          <input type="text"  id="telephone" name="telephone" placeholder="Téléphone" value={this.state.telephone} onChange={this.onChange}required/>
                        </div>
                        <div className="field">
                          <label htmlFor="address">Adresse:*</label>
                          <input type="text"  id="adresse" name="adresse" placeholder="Adresse" value={this.state.adresse} onChange={this.onChange}required/>
                        </div>
                        <div className="field">
                          <label htmlFor="city">Gouvernorat:*</label>
                          <input type="text"  id="governorat" name="governorat" placeholder="Gouvernorat" value={this.state.governorat} onChange={this.onChange}required/>
                        </div>
                       
                        <div className="field clearfix">
                          <div className="align-left">
                            <label htmlFor="state">Ville:*</label>
                            <input type="text"  id="ville" name="ville" placeholder="Ville" value={this.state.ville} onChange={this.onChange}required/>
                          </div>
                          <div className="align-right">
                            <label htmlFor="zipcode">Code postal:*</label>
                            <input type="text"  id="codepostal" name="codepostal" placeholder="Code Postal" value={this.state.codepostal} onChange={this.onChange}required/>
                          </div>
                        </div>
                      
                        <div className="different-address">
                          <label htmlFor="d-option">Anonyme</label>
                    
                          <input
            name="anonymat"
            type="checkbox"
            id="anonyme"
  name="anonyme"
  checked={ this.state.anonyme }
  value={this.state.anonyme}
            onChange={this.handleInputChange} />
                        </div>
                        <div className="order-notes">
                          <label htmlFor="order">Notes d'ordre</label>
                          <textarea rows={8} id="notes" name="notes" placeholder="Notes d'ordre" value={this.state.notes} onChange={this.onChange} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="cart-totals">
                          <h2>Votre commande</h2>
                          <ul>
                    <li><p>Sous-total du panier</p><p className="price">{JSON.parse(localStorage.getItem('panierlibre'))?total+parseInt(JSON.parse(localStorage.getItem('panierlibre')).montant):total}TND</p></li>
                    <li><p>Frais du livraison</p><p>Livraison gratuite</p></li>
                    <li><p>Total</p><p className="price">{JSON.parse(localStorage.getItem('panierlibre'))?total+parseInt(JSON.parse(localStorage.getItem('panierlibre')).montant):total}TND</p></li>
                  </ul>
                        </div>
                        <div className="payment">
                          <h2>Paiement</h2>
                       
                          <ul>
        <li>
          <input type="radio" id="p-option" name="selector" onChange={this.handleInput} required/>
          <label htmlFor="p-option">Virement bancaire direct</label>
          <div className="payment-check" />
        </li>
        <li>
          <input type="radio" id="p1-option" name="selector"onChange={this.handleInput} required/>
          <label htmlFor="p1-option">Paiement à la livraison</label>
          <div className="payment-check" />
        </li>
       
      </ul>
                        </div>
                        <button type="submit" value="Place Order" className="btn-primary">Valider</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
            );
        }
    }
    
    export default Checkout