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
class Detailcommunitie extends Component {
    constructor(props) {
        super(props);
        this.state = {
        communitie:[],
        usercommunitie:[],
        projectcommunitie:[],
        communitymembres:[],
        communitiecoms:[],
        messagerejoerr:'',
        message:'',
        activePage: 1,
        projectPerPage: 9
        
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

        componentDidMount() {
       
   if(API.getCurrentUser()){
    const data = {
    
      userID:API.getCurrentUser().data._id
    };
          axios
          .get('http://localhost:3000/member/verifer/'+this.props.match.params.id+'/'+API.getCurrentUser().data._id)
            .then(res => {
              this.setState({messageverife: res.data.message});
              console.log("mesage"+res.data.message)
              console.log("mesage"+this.state.messageverife)
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
              
            }
            )
            .catch(err => {
              console.log(err);
            })
            
          }
            axios
              .get('http://localhost:3000/commu/community/'+this.props.match.params.id)
              .then(res => {
                 
                this.setState({
                  communitie: res.data.data,
                  usercommunitie:res.data.data.userID,
                  projectcommunitie:res.data.data.projects
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
              .get('http://localhost:3000/post/allcommunautecoms/'+this.props.match.params.id)
              .then(res => {
                 
                this.setState({
                  communitiecoms: res.data.data
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

          onChange = e => {
            this.setState({ [e.target.name]: e.target.value });
            console.log(this.state.contenu)
          };
          onSubmit = e => {
            e.preventDefault();
        
            const data = {
    
              contenu: this.state.contenu,
              communauteID:this.props.match.params.id
            };
            console.log(data);
            const id =API.getCurrentUser().data._id
            axios
                .post('http://localhost:3000/post/create/'+id,data)
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
          onRejoindreClick (id) {
        
              if(!API.getCurrentUser())
              {
                alert("Connectez-vous pour rejoindre cette communauté")
        this.props.history.push("/login")
              }
              else{
                const data = {
    
                  userID: id,
                  communauteID:this.props.match.params.id
                };
              
              axios
                  .post('http://localhost:3000/member/create',data)
                    .then(res => {
                      this.setState({
                          messagesucessrejoindre:"Votre demande est envoyée avec succès.Vous devez atteindre la confiramtion d admin"
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
              messagerejoerr: resMessage
            });
            
          }
                    )
                    .catch(err => {
                      console.log(err);
                    })}



          }
        render() {
            var id=0;
            if(API.getCurrentUser()){
                id=API.getCurrentUser().data._id;
            }
var membres=this.state.communitymembres.filter(project=> project.accepted == 1)

            return ( <main id="main" className="site-main">
            <div className="page-title background-blog">
              <div className="container">
                <h1>Détail Communauté</h1>
                <div className="breadcrumbs">
                  <ul>
                    <li><Link to={"/listcommunuates"}>Communautés</Link><span>/</span></li>
                    <li>Détail Communauté<span></span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
              {this.state.messagesucessrejoindre && (<div class="alert alert-success alert-dismissible fade show" role="alert">
{this.state.messagesucessrejoindre}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>)}
                <div className="col-lg-8 main-content">
                  <article className="post">
                    <div className="entry-content">
                    <img src={`${this.state.communitie.cover_image}`}alt="" style={{width: '690px',height:'412.2px'}}/>
                      <ul className="post-meta">
                        <li><i className="fa fa-calendar-check-o" aria-hidden="true" /><a href="#">{moment(this.state.communitie.createdAt).format('LL')}</a></li>
                        <li><i className="fa fa-user-o" aria-hidden="true" /><span>par</span><Link to={"/detail-user/" +this.state.usercommunitie._id}>{this.state.usercommunitie.username}</Link></li>
                      
                      </ul>
                      <p>{this.state.communitie.description}</p>
                      
                    </div>
                  
                  </article>
                  <div id="comment" className="comment-area">
                    <h3 className="comments-title">{this.state.communitiecoms.length}Commentaire(s)</h3>
                    <ol className="comments-list">
                        {this.state.communitiecoms.map(item=>
                      <li className="comment clearfix">
                        <div className="comment-body">
                          <div className="comment-avatar"><img src="images/comment.jpg" alt="" /></div>
                          <div className="comment-info">
                            <header className="comment-meta" />
                            <cite className="comment-author">{item.userID.username}</cite>
                            <div className="comment-inline">
                              <span className="comment-date">{moment(item.createdAt).fromNow}</span>
                              
                            </div>
                            <div className="comment-content"><p>{item.contenu}?</p></div>
                          </div>
                        </div>
                      </li>)}
                    </ol>
                    <div id="respond" className="comment-respond">
                      <h3 id="reply-title" className="comment-reply-title">Laissez un commentaire?</h3>
                      <form onSubmit={this.onSubmit}>
                        <div className="field-textarea">
                        <textarea rows={8} placeholder="Votre commentaire"  name="contenu" id="contenu" onChange={this.onChange} required   />
                        </div>
                       
                        <button type="submit" value="Send Messager" className="btn-primary">Poster un commentaire</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 sidebar">
                  <aside style={{marginBottom:'40px'}}>
                    {this.state.messageverife=="Membre" ?(           
         <span value="Send Messager" className="btn-primary">Membre</span>
):this.state.messageverife=="En attente" ?(<span value="Send Messager" className="btn-primary">En Attente</span>):<button value="Send Messager" onClick={this.onRejoindreClick.bind(this,id)} className="btn-primary">Rejoindre cette Communauté</button>}
                  

                  </aside>
                  <aside className="widget widget-category">
                    <h3 className="widget-title">Projets</h3>
                    <ul>
                        {this.state.projectcommunitie.map(item=>
                      <li><a href="#">{item.name}</a></li>
                      )}
                    </ul>
                  </aside>
                  <aside className="widget widget-popular">
                    <h3 className="widget-title">Les Membres</h3>
                    <ul>
                        {membres.map(item=>
                      <li>
                        <a href="#"><img src={`${item.userID.cover_image}`}alt="" style={{width: '60px',height:'60px'}}/></a>
                        <h4><a href="#">{item.userID.username}</a></h4>
                      </li>)}
                </ul>
                  </aside>
                  {this.state.messagerejoerr &&
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">

{this.state.messagerejoerr }
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
</div>}
                </div>
              </div>
            </div>
          </main> )
        }
    }
    
    export default Detailcommunitie