import React, { Component } from 'react' 
import API from "../utils/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import axios from 'axios';
export class Home extends Component {  
    constructor(props) {
        super(props);
        
    
        this.state = {
          categories: [],
          
        };
      }
      componentDidMount() {
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
      })}
    render() {  
        return ( 
  <main id="main" class="site-main">
            <div class="sideshow">
            <div class="container">
            <div class="sideshow-content">
            <h1 class="wow fadeInUp" data-wow-delay=".1s">Donnez vie à des nouvelles idées, où que vous soyez</h1>
            
            <div class="button wow fadeInUp" data-wow-delay="0.1s">
            
            <Link to={"/listprojects"} class="btn-primary">Contribuer maintenant</Link>
            </div>
            </div>
            </div>
            </div>
            <div class="project-love">
            <div class="container">
            
            <h2 class="title">Découvrez dans quels types de projets contribuer.</h2>
            <div class="tab-menu tab-row">
            <ul id="bx-pager" class="menu-category">
                {this.state.categories.map(item=>
            <li class="mc-option" data-tab="pp0"><a href="#" data-slide-index="0">{item.name}</a></li>
            )}
            </ul>
            </div>
        </div>
            </div>
            <div class="how-it-work">
            <div class="container">
            <h2 class="title">Voyez comment ça marche</h2>
            <div class="row">
            <div class="col-lg-4">
            <div class="item-work">
            <div class="item-icon"><span>01</span><i class="fa fa-flask" aria-hidden="true"></i></div>
            <div class="item-content">
            <h3 class="item-title">Découvrez des idées</h3>
            <div class="item-desc"><p>Découvrez la liste des commuanutés et suivez les projets proposés par la plateforme.</p></div>
            </div>
            </div>
            </div>
            <div class="col-lg-4">
            <div class="item-work">
            <div class="item-icon"><span>02</span><i class="fa fa-leaf" aria-hidden="true"></i></div>
            <div class="item-content">
            <h3 class="item-title">Lancer votre projet</h3>
            <div class="item-desc"><p>Pour soumettre un projet sur la plateforme, remplissez le formulaire disponible sur le portail web et envoyez les éléments nécessaires à la validation.</p></div>
            </div>
            </div>
            </div>
            <div class="col-lg-4">
            <div class="item-work">
            <div class="item-icon"><span>03</span><i class="fa fa-money" aria-hidden="true"></i></div>
            <div class="item-content">
            <h3 class="item-title">Obtenez du financement</h3>
            <div class="item-desc"><p>Votre projet est prêt à être financé.</p></div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div class="latest campaign">
            <div class="container">
            <h2 class="title">Découvrez les projets</h2>
            
            <div class="campaign-content grid">
            <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular filterlatest">
            <div class="campaign-item">
            <a class="overlay" href="campaign_detail.html">
            <img src="images/latest-01.jpg" alt=""/>
            <span class="ion-ios-search-strong"></span>
            </a>
            <div class="campaign-box">
            <a href="#" class="category">Crafts</a>
            <h3><a href="campaign_detail.html">The Oreous Pillow</a></h3>
            <div class="campaign-description">A watch designed to be an heirloom to be passed down to the next generation.</div>
            <div class="campaign-author"><a class="author-icon" href="#"><img src="images/author-01.png" alt=""/></a>by <a class="author-name" href="#">Sabato Alterio</a></div>
            <div class="process">
            <div class="raised"><span></span></div>
            <div class="process-info">
            <div class="process-pledged"><span>630 TND</span>Objectif</div>
            <div class="process-funded"><span>26%</span>funded</div>
            <div class="process-time"><span>2</span>days ago</div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterlatest">
            <div class="campaign-item">
            <a class="overlay" href="campaign_detail.html">
            <img src="images/latest-02.jpg" alt=""/>
            <span class="ion-ios-search-strong"></span>
            </a>
            <div class="campaign-box">
            <a href="#" class="category">Book</a>
            <h3><a href="campaign_detail.html">The Everlast Notebook</a></h3>
            <div class="campaign-description">One smart, reusable notebook to last the rest of your life? That's not magic, that's the Everlast.</div>
            <div class="campaign-author"><a class="author-icon" href="#"><img src="images/author-02.png" alt=""/></a>by <a class="author-name" href="#">Samino</a></div>
            <div class="process">
            <div class="raised"><span></span></div>
            <div class="process-info">
            <div class="process-pledged"><span>370 TND</span>Objectif</div>
            <div class="process-funded"><span>9%</span>funded</div>
            <div class="process-time"><span>9</span>days ago</div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular">
            <div class="campaign-item">
            <a class="overlay" href="campaign_detail.html">
            <img src="images/latest-03.jpg" alt=""/>
            <span class="ion-ios-search-strong"></span>
            </a>
            <div class="campaign-box">
            <a href="#" class="category">Perfomances</a>
            <h3><a href="campaign_detail.html">Uncompromising Ski Gear</a></h3>
            <div class="campaign-description">The Orsden Slope Pants don't compromise delivering performance, fit, and value directly to you</div>
            <div class="campaign-author"><a class="author-icon" href="#"><img src="images/author-03.png" alt=""/></a>by <a class="author-name" href="#">Andrew Noah</a></div>
            <div class="process">
            <div class="raised"><span></span></div>
            <div class="process-info">
            <div class="process-pledged"><span>610 TND</span>Objectif</div>
            <div class="process-funded"><span>73%</span>funded</div>
            <div class="process-time"><span>14</span>days ago</div>
            </div>
            </div>
            </div>
            </div>
            </div>
        
            </div>
            </div>
            <div class="latest-button"><Link to={"/listprojects"} class="btn-primary">View all Campaigns</Link></div>
            </div>
            </div>
      
            </main>
           

            )  
    }  
}  
  
export default Home ;