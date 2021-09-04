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
export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      montant:'',
      messagemember:'',
      communateid:'',
      category:'',
        panier :[],
        rewarddetail:[],
        projectrewards:[],
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
   
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    let item={
      
      montant:this.state.montant
 
      
              }
             let panier=JSON.parse(localStorage.getItem("panierlibre"))
            if(panier){
              localStorage.removeItem("panierlibre")
              localStorage.setItem("panierlibre", JSON.stringify(item));

            }
            else{
              localStorage.setItem("panierlibre", JSON.stringify(item));
            }
            window.location.reload();
  }

    componentDidMount() {

       
     this.setState({
        panier: JSON.parse(localStorage.getItem('panier'))
      });
      axios
      .get('http://localhost:3000/project/project/'+this.props.match.params.id)
      .then(res => {
         
        this.setState({
          communateid:res.data.data.communauteID._id,
          projectrewards:res.data.data.rewards,
          category:res.data.data.category
          
          
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
      
     
    }
    onDeleteClick(id){
      var localProduct = JSON.parse(localStorage.getItem('panier'));
     
      //console.log(localProduct[id])
    var  item=localProduct[id]
    if(item.quantite>1){
    item.quantite-=1
    item.prixreward-=item.prixunitaire
  localProduct=localProduct.filter(project=> project.rewardid!=item.rewardid)
    localProduct.push(item)

    localStorage.setItem("panier", JSON.stringify(localProduct));}
    else{
      var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer cette récompense?");
        if(resultat){
          localProduct=localProduct.filter(project=> project.rewardid!=item.rewardid)
          localStorage.setItem("panier", JSON.stringify(localProduct));
        }
    }
      window.location.reload();

    }
    onAddClick(id){
      var localProduct = JSON.parse(localStorage.getItem('panier'));
     
        //console.log(localProduct[id])
      var  item=localProduct[id]
      item.quantite+=1
      item.prixreward+=item.prixunitaire
    localProduct=localProduct.filter(project=> project.rewardid!=item.rewardid)
      localProduct.push(item)

      localStorage.setItem("panier", JSON.stringify(localProduct));


       // console.log(JSON.parse(localStorage.getItem('panier')))
        window.location.reload();

        
    }
    onDeleteitemreward(id){
      var localProduct = JSON.parse(localStorage.getItem('panier'));
      var  item=localProduct[id]
      localProduct=localProduct.filter(project=> project.rewardid!=item.rewardid)
      localStorage.setItem("panier", JSON.stringify(localProduct));
      window.location.reload();
    }
    onDeleteitempanierlibre(){
      localStorage.removeItem("panierlibre")
      window.location.reload();
    }
    onvalideClick(){
    
if(!JSON.parse(localStorage.getItem('panier'))&&!JSON.parse(localStorage.getItem('panierlibre'))){
  alert("Vous devez remplir panier !");
}
      else if(!API.getCurrentUser())
      {
        alert("Connectez-vous pour continuer")
        this.props.history.push("/login")
      }
      else{
       
       
          const data = {
    
            userID:API.getCurrentUser().data._id,
          };
console.log("connnnn"+this.state.communateid)
          axios
          .get('http://localhost:3000/member/verife/'+this.state.communateid+"/"+API.getCurrentUser().data._id)
            .then(res => {

              this.props.history.push("/checkout/"+this.props.match.params.id);
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
                messagemember: resMessage
              });
              alert("Vous n'etes pas un membre de la communaute !! Vous devez la rejoindre");
              this.props.history.push("/detailcommunity/"+this.state.communateid)
            }
            )
            .catch(err => {
              console.log(err);
            })
        

      }
    }
    onajoutPanier (item) {
     let rewarditem={
rewardid:item._id,
cover_image:item.cover_image,
titre:item.titre,
quantite:1,
prixreward:item.min_value,
prixunitaire:item.min_value

      }
     let panier=JSON.parse(localStorage.getItem("panier"))
    if(panier){
     let localProduct=panier.filter(project=> project.rewardid==rewarditem.rewardid)
     let indexitem=-1
     
      console.log(localProduct)
      if(localProduct.length!=0 ){
        console.log("hhhhhhhhhhhhhhh")
        for (const [index, value] of panier.entries()) {
          if(value.rewardid==rewarditem.rewardid){
            indexitem=index
            break;
          }
                 }
      


        var  item=panier[indexitem]
    item.quantite+=1
    item.prixreward+=item.prixunitaire
  localProduct=panier.filter(project=> project.rewardid!=rewarditem.rewardid)
    localProduct.push(item)

    localStorage.setItem("panier", JSON.stringify(localProduct));

      }
      else{

     panier.push(rewarditem)
     localStorage.setItem("panier", JSON.stringify(panier));
    }
    }
    else{
      panier=[];
      panier.push(rewarditem)
      localStorage.setItem("panier", JSON.stringify(panier));

    }
     
    
      this.props.history.push("/cart/"+this.props.match.params.id);
    }
    render() {
      var total=0
      if(JSON.parse(localStorage.getItem('panier'))){
      const itemrewards=JSON.parse(localStorage.getItem('panier'))
      for (const [index, value] of  itemrewards.entries())
      {
        total+=value.prixreward
      }
    }
        console.log(this.state.panier)
        return (
            <body class="cart">
                 <div id="wrapper">
                 <main id="main" className="site-main">
        <div className="page-title background-cart">
          <div className="container">
            <h1>Cart</h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Home</a><span>/</span></li>
                <li>Cart</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="main-content">
            <div className="product-table">
              <table>
                <thead>
                  <tr>
                    <th>Produits</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                    {JSON.parse(localStorage.getItem('panier')) && JSON.parse(localStorage.getItem('panier')).map((item,index)=>
                    <tr>
                    <td>
                    <img src={`${item.cover_image}`} alt="" style={{width: '100px',height:'100px'}}/>
                      <h3>{item.titre}</h3>
                    </td>
                    <td>{item.prixunitaire}</td>
                    <td>
                    <button className="number-quatity" onClick={this.onDeleteClick.bind(this,index)}><span class="btn-icon-wrap">-</span></button>
                      <span className="number-quatity">{item.quantite}</span>
                      <button className="number-quatity" onClick={this.onAddClick.bind(this,index)}><span class="btn-icon-wrap">+</span></button>
                    </td>
                    <td>{item.prixreward}</td>

                    <td><button onClick={this.onDeleteitemreward.bind(this,index)}><span className="ion-ios-close-empty" /></button></td>
                  </tr>)}
               
                  {JSON.parse(localStorage.getItem('panierlibre'))&&(
                    <tr>
                    <td>
                      <h3>Contribution libre sans contrepartie</h3>
                    </td>
                    <td>{JSON.parse(localStorage.getItem('panierlibre')).montant}</td>
                    <td>
                    -
                    </td>
                    <td>{JSON.parse(localStorage.getItem('panierlibre')).montant}</td>
                    
                    <td><button onClick={this.onDeleteitempanierlibre.bind(this)}><span className="ion-ios-close-empty"/></button></td>
                    </tr>

                  )}
               
                </tbody></table>
            </div>
            
                        <div class="row"> 
                        {this.state.projectrewards.map(item =>
<div  class="col-6">

<div className="support support-campaign">
                 
                 
                <div className="plan">
                <a href="javascript:void(0)">
                  <h4>{item.min_value}TND ou plus</h4>
                  <img src={`${item.cover_image}`} alt="" style={{width: '150px',height:'150px'}}/>
                  <div className="plan-desc" dangerouslySetInnerHTML={{__html: item.description}} />

                  <div className="plan-date"><i className="fa fa-calendar" aria-hidden="true" /> <span>{moment(item.date_expiration).format('L')} </span> <span style={{float: 'right'}}>{item.contributions.length} contributions </span></div>
                  <div className="widget-content">
                  <button  value className="btn-primary" onClick={this.onajoutPanier.bind(this,item)}><span className="ion-bag"/>Ajouter au panier</button>

                    
                  </div>
                </a>
              </div>
                  
            </div>
  </div>
  )}
  </div>
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-6">
                <div className="calculate-shipping">
                  <h3>Contribution libre sans contrepartie</h3>
                  <form onSubmit={this.onSubmit}>               
                       <div className="field field-select">
                    <input type="text" id="montant" placeholder="0TND" name="montant"value={this.state.montant} onChange={this.onChange}/> 

                    </div>
                   
                    {this.state.category=="Solidaire & Citoyen" ? (<button type="submit" value="Send Messager" className="btn-primary" disabled >Ajouter</button>):(<button type="submit" value="Send Messager" className="btn-primary">Ajouter</button>)}
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 col-6">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>
                  <ul>
                    <li><p>Sous-total du panier</p><p className="price">{JSON.parse(localStorage.getItem('panierlibre'))?total+parseInt(JSON.parse(localStorage.getItem('panierlibre')).montant):total}TND</p></li>
                    <li><p>Frais du livraison</p><p>Livraison gratuite</p></li>
                    <li><p>Total</p><p className="price">{JSON.parse(localStorage.getItem('panierlibre'))?total+parseInt(JSON.parse(localStorage.getItem('panierlibre')).montant):total}TND</p></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="coupon-form" style={{backgroundColor: 'white'}}>
              <div className="row">
               
                <div className="col-lg-12">
                  <div className="button">
                    <button onClick={this.onvalideClick.bind(this)} value="Send Messager" className="btn-primary">Valider</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
                 </div>
            </body>
            )
    
    
        }}
        export default Cart  ;