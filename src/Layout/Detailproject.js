import React from "react";


import API from "../utils/api";
import moment from 'moment'
import axios from 'axios';
export class Detailproject extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          projectdetail: [],
          contributiondetail: [],
          projectrewards:[],
          messagerewards:'',

        };
      }
      componentDidMount() {
      /*  API.getprojectdetail(this.props.match.params.id)
      .then(response => {
        this.setState({
          projectdetail: response.data
        });
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });*/
      API.getprojectcontributions(this.props.match.params.id)
      .then(response => {
        this.setState({
          contributiondetail: response.data
        });
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
      axios
        .get('http://localhost:3000/project/project/'+this.props.match.params.id)
        .then(res => {
           
          this.setState({
            projectrewards: res.data.data.contributions,
            projectdetail: res.data.data
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
            messagerewards: resMessage
          });
        })
        .catch(err => {
          console.log(err);
        })
    
    }
    render() {  
      const projectdetail = this.state.projectdetail;
      const contributiondetail = this.state.contributiondetail;
      
var total=0;
var pourcentage=0;
     /* projectdetail &&
        projectdetail.map(project =>
         total= project.contributions.reduce((sum,v) => sum += v.montant,0)
         

         )
         projectdetail &&
         projectdetail.map(project =>
          pourcentage= total*100/project.goal
          
 
          )*/

      const items = []
      const projects = []

      for (const [index, value] of projectdetail.entries()) {
        
        items.push(  <div className="container">
        <div className="campaign">
          <div className="campaign-item clearfix">
            <div className="campaign-image">
              <div id="owl-campaign" className="campaign-slider">
                <div className="item"><img src={`${value.cover_image}`} alt="" style={{width: '570px',height:'400px'}}/></div>
                
              </div>
            </div>
            <div className="campaign-box">
              <a href="#" className="category">{value.category}</a>
              <h3>{value.name}</h3>
              <div className="campaign-description"><p>{value.description}</p></div>
              <div className="campaign-author clearfix">
                <div className="author-profile">
                  <a className="author-icon" href="#"><img src="images/author-01.png" alt=""/></a>par <a className="author-name" href="#">{value.userID.username}</a>
                </div>
                <div className="author-address"><span className="ion-location" />{value.location}</div>
              </div>
              <div className="process">
              <div class="progress">
              {/*pourcentage=parseInt(total*100/value.goal)*/}
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${pourcentage}%`}}>{pourcentage}%</div>
</div>
                <div className="process-info">
                  <div className="process-funded"><span>{value.goal}TND</span>Objectif</div>
                  
                  <div className="process-pledged"><span>{total}TND</span>Collecté</div>
    
                  <div className="process-time"><span>{value.contributions.length}</span>Participants</div>
                  
                </div>
              </div>
              <div className="button">
                <form action="#" id="priceForm" className="campaign-price quantity">
              
                  <button className="btn-primary" type="submit">Financer</button>
                </form>
              </div>
              <div className="share">
                <p></p>
                <ul>
                  <li className="share-facebook"><a href={`${value.facebook_link}`}><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                  <li className="share-twitter"><a href={`${value.twiter_link}`}><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                  <li className="share-google-plus"><a href={`${value.linkedin_link}`}><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
         )
         
  }
        return (

          
          <body class="campaign-detail">
            
          <div id="wrapper">
         
       
          <main id="main" className="site-main">
        <div className="page-title background-campaign">
          <div className="container">
            <h1></h1>
            <div className="breadcrumbs">
              <ul>
                <li><a href="index-2.html">Accueil</a><span>/</span></li>
                <li>Détail projet</li>
              </ul>
            </div>
          </div>
        </div>
       
  

        <div className="campaign-content">
        
            
        {items}
        </div>
        <div className="campaign-history">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="campaign-tabs">
                  <ul className="tabs-controls">
                    <li className="active" data-tab="campaign"><a href="#">Campaign story</a></li>
                    <li data-tab="backer"><a href>Contributions</a></li>
                    
                    
                    <li data-tab="comment"><a href="#">Commentaires</a></li>
                  </ul>
                  <div className="campaign-content">
                    <div id="campaign" className="tabs active">
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                      <img src="images/campaign-tabs.jpg" alt="" />
                      <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment.</p>
                      <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved</p>
                    </div>
                    
                    <div id="backer" className="tabs">
                      <table>
                        <tbody><tr>
                            <th>Nom et Prénom</th>
                            <th>Monatnt</th>
                            <th>Date</th>
                          </tr>
                          {
              contributiondetail.map(item =>
                
                          <tr>
                            <td>{item.userID.username}</td>
                            <td>{item.montant}</td>
                            
                            <td>{moment(item.createdAt).subtract(10, 'days').calendar()}</td>
                          </tr>
                          )}
                          
                        
                        </tbody></table>
                    </div>
                 <div>
                    {projectdetail.map(project =>
                    <div id="comment" className="tabs comment-area">
                    
                      <h3 className="comments-title">{project.commentaires.length}Comment</h3>
                      <ol class="comments-list">
<li class="comment clearfix">
<div class="comment-body">
<div class="comment-avatar"><img src="images/comment.jpg" alt=""/></div>
<div class="comment-info">
<header class="comment-meta"></header>
<cite class="comment-author">Jordan B. Goodale</cite>
<div class="comment-inline">
<span class="comment-date">2 days ago</span>
<a href="#" class="comment-reply">Reply</a>
</div>
<div class="comment-content"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equidem e Cn. Sequitur disserendi ratio cognitioque naturae; Nunc vides, quid faciat. Duo Reges: constructio interrete. Memini vero, inquam; Quis Aristidem non mortuum diligit?</p></div>
</div>
</div>
</li>
</ol>
<div id="respond" class="comment-respond">
<h3 id="reply-title" class="comment-reply-title">Leave A Comment?</h3>
<form action="#" id="commentForm">
<div class="field-textarea">
<textarea rows="8" placeholder="Your Comment"></textarea>
</div>
<div class="row">
<div class="col-md-4 field">
<input type="text" value="" name="s" placeholder="Your Name" />
</div>
<div class="col-md-4 field">
<input type="text" value="" name="s" placeholder="Your Email" />
</div>
<div class="col-md-4 field">
<input type="text" value="" name="s" placeholder="Website" />
</div>
</div>
<button type="submit" value="Send Messager" class="btn-primary">Post Comment</button>
</form>
</div>
</div>


                      
                    )}</div>
    
                    </div>
                </div>
              </div>
              {!this.state.messagerewards ? (
              <div className="col-lg-4">
                <div className="support support-campaign">
                  <h3 className="support-campaign-title">Les Récompenses</h3>
                    {this.state.projectrewards.map(project =>
                  <div className="plan">
                    <a href="javascript:void(0)">
                      <h4>{project.rewards.titre}</h4>
                      <div className="plan-desc"><p>{project.description}</p></div>
                      <div className="plan-date">Date d'expiration:{project.date_exp}</div>
                      <div className="plan-author">Valeur Minimum:{project.min_value} </div>
                      <div className="backer"></div>
                    </a>
                  </div>
                  )}
                </div>
              </div>):(<div></div>)}
            </div>
          </div>
        </div>
      </main>
     
        
          </div>
          
          </body>   
        );
      
        }}
        export default Detailproject  ;
    