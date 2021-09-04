import React from "react";


import API from "../utils/api";
import moment from 'moment'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

export class DetailCommunity extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
     
      usercommunity: [],
      communitymembres: [],
      nom:'',
      description:'',
      cover_image:'',
      message:"",
      messagemember:"",
      messagememberpending:'',
      communitymemberapending:[]
      
    };
  }
  componentDidMount() {
     
        
    axios
      .get('http://localhost:3000/commu/community/'+this.props.match.params.id)
      .then(res => {
         
        this.setState({
          usercommunity: res.data.data,
          nom:res.data.data.nom,
          description:res.data.data.description,
          cover_image:res.data.data.cover_image
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
      .get('http://localhost:3000/member/allmembres/'+this.props.match.params.id)
      .then(res => {
         
        this.setState({
          communitymembres: res.data.data,
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
          messagemember: resMessage
        });
      })
      .catch(err => {
        console.log(err);
      })

     

    
    axios
    .get('http://localhost:3000/member/allmembrespending/'+this.props.match.params.id)
    .then(res => {
       
      this.setState({
        communitymemberapending: res.data.data,
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
        messagememberpending: resMessage
      });
    })
    .catch(err => {
      console.log(err);
    })
  };
   

  
    onAcceptClick (id) {
        axios
        .put('http://localhost:3000/member/accept/'+id)
        .then(res => {
          const newliste = this.state.communitymemberapending.filter(project=> project._id !== id)
          this.setState({
              communitymemberapending:newliste
              
            });
            window.location.reload();
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })

        
    }
    onRejeterClick (id) {
        var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
      if(resultat){
        axios
        .delete('http://localhost:3000/member/delete/'+id)
        .then(res => {
          const newliste = this.state.communitymembres.filter(project=> project._id !== id)
          this.setState({
            communitymembres:newliste
              
            });
            window.location.reload();
          console.log(res.data.data);
          
        })
        .catch(err => {
          console.log(err);
        })

    }
    }
    
    render() {  
        const memberPending=this.state.communitymembres.filter(project => project.accepted ==false)
        const memberApproved=this.state.communitymembres.filter(project => project.accepted ==true)
        return (
          <main id="main" class="site-main">
           <div className="page-title background-blog">
          <div class="container">
          <h1>Détail Commuanuté</h1>
          <div class="breadcrumbs">
          <ul>
          <li><a href="index-2.html">Mes Commuanutés</a><span>/</span></li>
          <li>Détail communautés</li>
          </ul>
          </div>
          </div>
          </div>
          <div class="account-wrapper">
          <div class="container">
          <div class="row">
          <div class="col-lg-3">
          <nav class="account-bar">
          <ul>
          <li className="active"><Link
                to={"/dashboard-user"}>Tableau de bord</Link></li>
                        <li><Link to={"/profile"}>Profil</Link></li>
                        <li><Link to={"/projects"}>Projets</Link></li>
                        <li><Link to={"/communities"}>Communautés</Link></li>
                        <li ><Link to={"/Contributions"}>Contributions</Link></li>
                    
       
          </ul>
          </nav>
          </div>

          <div class="col-lg-9">
          <div class="account-content my-campaigns account-table">
          <h3 class="account-title">Détail Communauté</h3>
          <div class="author-title">< Link to={"/communities"} class="edit-profile">Retour</Link></div>


          <div class="account-main">
          
          <div class="dashboard-latest">
<ul>
<li>
<img src={`${this.state.cover_image}`}alt="" style={{width: '150px',height:'150px'}}/>
<div className="dashboard-latest-box">
  <h4><div className="category">{this.state.nom}</div></h4>
  {this.state.description}
</div>
</li>
</ul></div>
            
            
          <h3>Les demandes des membres</h3>
         
          {!this.state.messagememberpending?(
             <table>
            <thead>
            <tr>
            <th></th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Accepter</th>
            <th>Rejeter</th>
            </tr>
            </thead>
            <tbody>
            { this.state.communitymemberapending.map(item=>
            
            <tr>
                <td>
    <img src={`${item.userID.cover_image}`}alt="" style={{width: '50px',height:'50px'}}/>
</td>
            <td><Link to={`/detail-member/${item.userID._id}/${this.props.match.params.id}`}>{item.userID.username}</Link></td>
            <td>{item.userID.email}</td>
            <td>{item.userID.telephone}</td>
            <td><a><button className="btn btn-outline-success" onClick={this.onAcceptClick.bind(this,item._id)}><span className="icon-label"><i class="fa fa-check" aria-hidden="true"></i> </span></button> </a>
            </td>
            <td><a><button className="btn btn-outline-danger" onClick={this.onRejeterClick.bind(this,item._id)}><span className="icon-label"><i class="fa fa-times" aria-hidden="true"></i> </span></button> </a>
            </td>
            

    
            </tr>
            )}
           
           
            </tbody>
            </table>):<div class="alert alert-info" role="alert">
            Vous n'avez pas encore des demandes
            </div>}

            <h3>Les membre de la communauté</h3>
         
         {!this.state.messagemember?(
            <table>
           <thead>
           <tr>
           <th></th>
           <th>Nom</th>
           <th>Email</th>
           <th>Téléphone</th>
           <th>Supprimer</th>
           
           </tr>
           </thead>
           <tbody>
           { memberApproved.map(item=>
           
           <tr>
               <td>
   <img src={`${item.userID.cover_image}`}alt="" style={{width: '50px',height:'50px'}}/>
</td>
           <td>{item.userID.username}</td>
           <td>{item.userID.email}</td>
           <td>{item.userID.telephone}</td>
           <td><a><button className="btn btn-outline-danger" onClick={this.onRejeterClick.bind(this,item._id)}><span className="icon-label"><i class="fa fa-times" aria-hidden="true"></i> </span></button> </a>
            </td>           

   
           </tr>
           )}
          
          
           </tbody>
           </table>):<div class="alert alert-info" role="alert">
           Vous n'avez pas encore des membres
           </div>}

           
            
          
         
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          </main>
            )
        }}
        export default DetailCommunity  ;
    