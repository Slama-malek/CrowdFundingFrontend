import React from "react";
import moment from 'moment'

import API from "../utils/api";
import 'react-notifications/lib/notifications.css';
import Rating from "react-star-rating-component";
import ReactNotifications from 'react-notifications-component';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    FacebookShareCount,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WhatsappIcon,

    FacebookMessengerIcon,
    WorkplaceShareButton
  } from "react-share";
  import axios from 'axios';
export class DetaileProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        projectdetail:[],
        
        projectrewards:[],
        userproject:[],
        projectupdates:[],
        projectcontributions:[],
        projectnotes:[],
        messagedelete:'',
        messagesucess:'',
        messagenote:'',
        messagesuivre:'',
        messagesuivie:'',
        messagecom:'',
        contenu:'',
        messageverife:'',
        messagecontribution:'',
        messagecontribution:'',
        projectcoms:[],
        rating3:0,
        setRating3:0,
        communaute:'',
        communuateid:'',

        rating: 1
  
    
    };
   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

}
    componentDidMount() {
      
      if(API.getCurrentUser()){
      axios
      .get('http://localhost:3000/project/verifier/'+API.getCurrentUser().data._id)
      .then(res => {
        
        this.setState({
          messagesuivie: res.data.data._id
        });
      
        console.log("gggjjo,rlf"+res.data.data)
      }
      ,
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      
      })
      .catch(err => {
        console.log(err);
      })}

          
        axios
          .get('http://localhost:3000/project/project/'+this.props.match.params.id)
          .then(res => {
             
            this.setState({
              projectdetail: res.data.data,
              communaute:res.data.data.communauteID.nom,
              communuateid:res.data.data.communauteID._id,
              userproject:res.data.data.userID,
              projectrewards:res.data.data.rewards,
              projectupdates:res.data.data.updates
              
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
          .get('http://localhost:3000/commentaire/allprojectcoms/'+this.props.match.params.id)
          .then(res => {
             
            this.setState({
              projectcoms:res.data.data
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
              messagecom: resMessage
            });
          })
          .catch(err => {
            console.log(err);
          })
          
          axios
          .get('http://localhost:3000/note/allnotes/'+this.props.match.params.id)
          .then(res => {
             
            this.setState({
              projectnotes:res.data.data
              
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

      };
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.contenu)
      };
      onStarClick(nextValue) {
        this.setState({rating: nextValue});
        
        const data = {

          note: nextValue,
          projectID:this.props.match.params.id
        };
        console.log(data);
       
        if(!API.getCurrentUser())
              {
                alert("Connectez-vous pour noter ce projet ")
                this.props.history.push("/login")
              }

              const id =API.getCurrentUser().data._id
        axios
        .post('http://localhost:3000/note/create/'+id,data)
          .then(res => {
            this.setState({
              messagesucess:'votre note est enregister avec succés'
              })
             
             

              window.location.reload();
            
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
    messagenote: resMessage
  });
  
}
          )
          .catch(err => {
            console.log(err);
          })
  }
      onSubmit = e => {
        e.preventDefault();
    
        const data = {

          contenu: this.state.contenu,
          projectID:this.props.match.params.id
        };
        console.log(data);
        if(!API.getCurrentUser())
              {
                alert("Connectez-vous pour laisser un commentaire")
                this.props.history.push("/login")
              }

        const id =API.getCurrentUser().data._id
        axios
            .post('http://localhost:3000/commentaire/create/'+id,data)
              .then(res => {
                this.setState({
                    messagesucesscom:"Votre commentaire est cré avec succès"
                  })
                 
                 

                  window.location.reload();
                
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
         /* let localrewards=panier.filter(project=> project.rewardid!=rewarditem.rewardid)
          rewarditem.quantite+=1
          localrewards.push(rewarditem)
          localStorage.setItem("panier", JSON.stringify(localrewards));*/



          var  item=panier[indexitem]
      item.quantite+=1
      item.prixreward+=item.prixreward
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
       
       
       //localStorage.setItem("panier",JSON.stringify( [{rewardid:id,quantite:1}]));
        this.props.history.push("/cart/"+this.props.match.params.id);
      }

      createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
      onNeSuivreClick(){
        if(API.getCurrentUser()){
          var resultat = window.confirm("Êtes-vous sûr de ne plus suivre cet projet?");
          if(resultat){
          axios
            .delete('http://localhost:3000/project/deletesuivie/'+API.getCurrentUser().data._id+"/"+this.props.match.params.id)
            .then(res => {
        
              this.setState({
                  messagedelete: res.data.data,
                  
                  
                });
                window.location.reload();
                
              
            })
            .catch(err => {
              console.log(err);
            })}
        }
      }
      onSuivreClick(){

        if(!API.getCurrentUser())
        {
          alert("Connectez-vous pour suivre ce projet")
        this.props.history.push("/login")
        }
        else if(API.getCurrentUser().data._id==this.state.projectdetail.userID._id){
          alert("Vous ne pouvez pas suivre votre propre projet !");
        }
        else{

  axios
        .post('http://localhost:3000/project/suivre/'+API.getCurrentUser().data._id+"/"+this.props.match.params.id)
          .then(res => {
           
            const data={
              contenu:"Un nouveau utlisateur commence a suivre votre projet",
              titre:"ggg"
            }
            axios
            .post('http://localhost:3000/notif/create/'+this.state.userproject._id,data)
              .then(res => {
               
                 
                 
    
                  window.location.reload();
                
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
        messagenotif: resMessage
      });
      
    }
              )
              .catch(err => {
                console.log(err);
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
    messagesuivre: resMessage
  });
  
}
          )
          .catch(err => {
            console.log(err);
          })
  

      }}
    render() {  
      console.log("messageee"+this.state.messagesuivie)
      var date1 = new Date(this.state.projectdetail.duration);
      var date2 = Date.now();
         var time_diff = date1 - date2;
         console.log("date2",date2)
         var days_Diff = time_diff / (1000 * 3600 * 24);
         console.log("datediff",days_Diff)
       var pourcentage=0;
       var total=0
       var totalNote=0;
       var totalnotes=0;
       var note=0;
       for (const [index, value] of this.state.projectnotes.entries()) {
        totalNote+=value.note;
        totalnotes+=1;
               }
              note=parseInt(totalNote/totalnotes); 
       for (const [index, value] of this.state.projectcontributions.filter(project=> project.status == "Approved").entries()) {
total+=value.montant;
       }
       pourcentage=parseInt(total*100/this.state.projectdetail.goal)
       const shareUrl = window.location.href; 
      
        return (
            <body class="campaign-detail">
            
          <div id="wrapper">
    <main id="main" className="site-main">
    <div className="page-title background-blog">
          <div className="container">
            <h1>Détail Projet</h1>
            <div className="breadcrumbs">
              <ul>
                <li><Link to={"/listcommunuates"}>Liste des projets</Link><span>/</span></li>
                <li>Détail Projet</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="campaign-content">
        <div className="container">
        <div className="campaign">
        {this.state.messagesuivre && (<div class="alert alert-danger alert-dismissible fade show" role="alert">
{this.state.messagesuivre}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button></div>)}
                                
                                  {this.state.messagedelete && (<div class="alert alert-danger alert-dismissible fade show" role="alert">
{this.state.messagedelete}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button></div>)}
          <div className="campaign-item clearfix">
            <div className="campaign-image">
              <div id="owl-campaign" className="campaign-slider">
                <div className="item"><img src={`${this.state.projectdetail.cover_image}`} alt="" style={{width: '570px',height:'400px'}}/></div>
 
              </div>
              <span> Voter pour ce projet </span>  <Rating
        name="rate1"
        starCount={10}
        value={note}
        onStarClick={this.onStarClick.bind(this)}
    />
            </div>
            <div className="campaign-box">
              <Link to={"/detailcommunity/" +this.state.communuateid} className="category">{this.state.communaute}</Link>
              <h3>{this.state.projectdetail.name}</h3>
              <div className="campaign-description"><p>{this.state.projectdetail.headline}</p></div>
              <div className="campaign-author clearfix">
                <div className="author-profile">
                  <Link className="author-icon" to={"/detail-user/" +this.state.userproject._id}><img src={`${this.state.userproject.cover_image}`} alt="" style={{width: '35px',height:'35px'}}/></Link>par <Link className="author-name" to={"/detail-user/" +this.state.userproject._id}>{this.state.userproject.username}</Link>
                </div>
                <div className="author-address"> <span><i class="fa fa-tag" aria-hidden="true">{this.state.projectdetail.category}</i></span><span className="ion-location" />{this.state.projectdetail.location}</div>
              </div>
              <div className="process">
              <div class="progress">
              {/*pourcentage=parseInt(total*100/value.goal)*/}
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${pourcentage}%`}}>{pourcentage}%</div>
</div>
                <div className="process-info">
                  <div className="process-funded"><span>{this.state.projectdetail.goal}TND</span>Objectif</div>
                  
                  <div className="process-pledged"><span>{total}TND</span>Collecté</div>
    
                  <div className="process-time"><span>{this.state.projectcontributions.length}</span>Participants</div>
                  <div className="process-time"><span>{parseInt((new Date(this.state.projectdetail.duration)-Date.now())/ (1000 * 3600 * 24))}</span>Jours restant</div>

                </div>
              </div>
              <div class="button">
<form action="#" id="priceForm" class="campaign-price quantity">
  <Link  class="btn-primary" to={"/cart/"+this.props.match.params.id}>Contribuer au projet</Link>

</form>
{API.getCurrentUser() && this.state.messagesuivie ? (<button class="btn-secondary"
         onClick={this.onNeSuivreClick.bind(this)}>Ne Plus Suivre</button>)
:( <button class="btn-secondary"
         onClick={this.onSuivreClick.bind(this)}><i class="fa fa-heart" ></i>Suivre</button>)}
        
       
</div>
<div class="share">
<p>Partagez pour aider ce projet à aller plus loin</p>

<ul>
<li class="share-facebook"> <FacebookShareButton
               url={"www.google.com"}
               imageURL={this.state.projectdetail.cover_image}
               quote={this.state.projectdetail.name} 
               className="m-2">
               <FacebookIcon size={32} round={true} />
             </FacebookShareButton></li>
             <li class="share-facebook"> <FacebookMessengerShareButton
               url={"www.google.com"}
               imageURL={this.state.projectdetail.cover_image}
               quote={this.state.projectdetail.name} 
               className="m-2">
               <FacebookMessengerIcon size={32} round={true} />
             </FacebookMessengerShareButton></li>

             <li class="share-twitter"> 
             <TwitterShareButton
               url={"www.google.com"}
               imageURL={this.state.projectdetail.cover_image}
               quote={this.state.projectdetail.name} 
               className="m-2">
               <TwitterIcon size={32} round={true} />
             </TwitterShareButton></li>

             <li class="share-linkedin"> 
             <LinkedinShareButton
               url={"www.google.com"}
               imageURL={this.state.projectdetail.cover_image}
               quote={this.state.projectdetail.name} 
               className="m-2">
               <LinkedinIcon size={32} round={true} />
             </LinkedinShareButton></li>
             <li class="share-linkedin"> 
             <WhatsappShareButton
               url={"www.google.com"}
               imageURL={this.state.projectdetail.cover_image}
               quote={this.state.projectdetail.name} 
               className="m-2">
               <WhatsappIcon size={32} round={true} />
             </WhatsappShareButton></li>

</ul>
</div>
              
           
            </div>
          </div>
        </div>
      </div>
      
      </div>
         
        <div className="campaign-history">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="campaign-tabs">
                  <ul className="tabs-controls">
                    <li className="active" data-tab="campaign"><a href="#">Description</a></li>
                    <li data-tab="backer"><a href="#">Contributions</a></li>
                    <li data-tab="updates"><a href="#">News</a></li>
                    <li data-tab="comment"><a href="#">Commentaires</a></li>
                  </ul>
                  <div className="campaign-content">
                    <div id="campaign" className="tabs active">
                    <div dangerouslySetInnerHTML={{__html: this.state.projectdetail.description}} />
                    <div class="share">
<p>Suivez Nous </p>
<ul>
<li class="share-facebook"><a href={this.state.projectdetail.facebook_link}><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
<li class="share-twitter"><a href={this.state.projectdetail.twiter_link}><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
<li class="share-linkedin"><a href={this.state.projectdetail.linkedin_link}><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
</ul>
</div>
                      
                    </div>
                    <div id="backer" className="tabs">
                    {!this.state.messagecontribution? (
                      <table>
                      
                        <tbody><tr>
                            <th>Nom et Prénom</th>
                            <th>Montant</th>
                            <th>Date</th>
                          </tr>
                          {this.state.projectcontributions.map(item=>
                          <tr>
                            <td>{!item.anonymat? (item.userID.username):(<spn>Anonyme</spn>)}</td>
                            <td>{item.montant}TND</td>
                            <td>{moment(item.createdAt).format("MMM Do YY")}</td>
                          </tr>)}
                    </tbody></table>):(<div>Il n'a pas encore des contributions</div>)}
                    </div>
                    <div id="updates" className="tabs">
        <ul>
        {this.state.projectupdates.map(item=>
          <li>
          
            <p className="date">{moment(item.createdAt).format('L')}</p>
            <h3>{item.titre}</h3>
            <div className="desc" dangerouslySetInnerHTML={{__html: item.contenu}} />
     
            </li>)}
     </ul>
      </div>
             <div id="comment" className="tabs comment-area">
                      <h3 className="comments-title">{this.state.projectcoms.length} Commentaire</h3>
                      {!this.state.messagecom ? (this.state.projectcoms.map(item=>
                      <ol className="comments-list">
                        <li className="comment clearfix">
                          <div className="comment-body">
                            <div className="comment-avatar"><img src={`${item.userID.cover_image}`} alt="" style={{width: '70px',height:'70px'}}/></div>
                            <div className="comment-info">
                              <header className="comment-meta" />
                              <cite className="comment-author">{item.userID.username}</cite>
                              <div className="comment-inline">
                                <span className="comment-date">{moment(item.createdAt).fromNow()}</span>
                                
                              </div>
                              <div className="comment-content"><p>{item.contenu}</p></div>
                            </div>
                          </div>
                        </li>
                      </ol>)):(<div> Aucun commentaire pour l'instant 
                        <p>Soyer le premier à commenter</p> </div>)}
                      <div id="respond" className="comment-respond">
                        <h3 id="reply-title" className="comment-reply-title">Laissez un commentaire?</h3>

                        <form onSubmit={this.onSubmit}>
                          <div className="field-textarea">
                            <textarea rows={8} placeholder="Votre commentaire"  name="contenu" id="contenu" onChange={this.onChange} required   />
                          </div>
                          <span> Votre Note </span>
                        <Rating
        name="rate1"
        starCount={10}
        value={note}
        onStarClick={this.onStarClick.bind(this)}
    />
                          <button style={{position: 'absolute', right: '80px'}} type="submit" value="Send Messager" className="btn-primary">Poster un commentaire</button>
                        </form>
     
                      </div>
                      <div id="respond" className="comment-respond">
                        <h3 id="reply-title" className="comment-reply-title"></h3>

  
      
      {this.state.messagenote && (<div class="alert alert-danger alert-dismissible fade show" role="alert">
{this.state.messagenote}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
{this.state.messagesucess && (<div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucess}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="support support-campaign">
                  <h3 className="support-campaign-title">Contreparties</h3>
                  <p>Soutenez le projet et recevez des contreparties en échange.</p>
                  {this.state.projectrewards.map(item =>
               <div class="plan">
                <a href="javascript:void(0)">
                  <h4>{item.min_value}TND ou plus</h4>
                  <img src={`${item.cover_image}`} alt="" style={{width: '570px',height:'400px'}}/>
                  <h4>{item.titre}</h4>
                  <div className="plan-desc" dangerouslySetInnerHTML={{__html: item.description}} />
               
                  <div className="plan-date"><i className="fa fa-calendar" aria-hidden="true" /> <span>{moment(item.date_expiration).format('L')} </span> <span style={{float: 'right'}}>{item.contributions.length} contributions </span></div>
                  <div className="widget-content">
                  <button value className="btn-primary" onClick={this.onajoutPanier.bind(this,item)}><span className="ion-bag" />Ajouter au panier</button>

                    
                  </div>
                </a>
              </div>
                  )}
            </div>
              </div>
            </div>
          </div>
        </div>
        <ReactNotifications />
      </main>
      </div>
      </body>
      )
    
    
    }}
    export default DetaileProject  ;