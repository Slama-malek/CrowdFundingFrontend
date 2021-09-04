import React, { Component } from 'react'  
  
export class Footer extends Component {  
    render() {  
        return (
        <footer id="footer" class="site-footer">
        <div class="footer-menu">
        <div class="container">
        <div class="row">
        <div class="col-lg-3 col-sm-4 col-4">
        <div class="footer-menu-item">
        <h3>Notre plateforme</h3>
        <ul>
        <li><a href="#">Qu'est-ce que l'idée de plate-forme</a></li>
        <li><a href="#">À propos de nous</a></li>
        <li><a href="#">Comment ça fonctionne</a></li>
        <li><a href="#">Nous contacter</a></li>
        
        </ul>
        </div>
        </div>
        <div class="col-lg-3 col-sm-4 col-4">
        <div class="footer-menu-item">
        <h3>Projets</h3>
        <ul>
        <li><a href="#">Lancer votre projet</a></li>
        <li><a href="#">Conditions d'utilisation</a></li>
        <li><a href="#">Politique de confidentialité</a></li>
        </ul>
        </div>
        </div>
        
        <div class="col-lg-3 col-sm-12 col-12">
        <div class="footer-menu-item newsletter">
        <h3>Newsletter</h3>
        <div class="newsletter-description">Privé, sécurisé, sans spam</div>
        <form action="https://template.themeburst.com/ideapress/s" method="POST" id="newsletterForm">
        <input type="text" value="" name="s" placeholder="Enter your email..." />
        <button type="submit" value=""><span class="ion-android-drafts"></span></button>
        </form>
        <div class="follow">
        <h3>Suivez nous</h3>
        <ul>
        <li class="facebook"><a target="_Blank" href="https://www.facebook.com/"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
        <li class="twitter"><a target="_Blank" href="https://www.twitter.com/"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
        <li class="instagram"><a target="_Blank" href="https://www.instagram.com/"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
        <li class="google"><a target="_Blank" href="https://www.google.com/"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
        <li class="youtube"><a target="_Blank" href="https://www.youtube.com/"><i class="fa fa-youtube" aria-hidden="true"></i></a></li>
        </ul>
        </div>
        </div>
        </div>
        </div>
        
        </div>
        </div>
        <div class="footer-copyright">
        <div class="container">
        <a href="#" class="back-top">Back to top<span class="ion-android-arrow-up"></span></a>
        </div>
        </div>
        </footer>
         )
    }}
    export default Footer  ;
