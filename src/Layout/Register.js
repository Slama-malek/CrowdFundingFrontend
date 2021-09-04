import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import API from "../utils/api";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce n'est pas un e-mail valide.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
Le nom d'utilisateur doit comprendre entre 3 et 20 caractères.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">

Le mot de passe doit comprendre entre 6 et 40 caractères.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsertype = this.onChangeUsertype.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      usertype:"manager",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeUsertype(e) {
    this.setState({
      usertype: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      
      API.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.usertype
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <main id="main" class="site-main">
       <div className="page-title background-blog">
      <div class="container">
      <h1>Inscription </h1>
      <div class="breadcrumbs">
      <ul>
      <li><a href="/">Accueil</a><span>/</span></li>
      <li>Inscription </li>
      </ul>
      </div>
      </div>
      </div>
      <div class="container">
      <div class="main-content">
      <div class="form-login form-register">
      <h2>Inscription </h2>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
               <div class="field">
                  
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder = "Nom Prénom"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div class="field">
                 
                  <Input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder = "Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div class="field">
                  
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder = "Mot de passe"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>


                <div class="inline clearfix">
                  <button className="btn btn-primary">S'inscrire</button>
                  <p>vous-avez déjà un compte? <a href="/login">Connectez-vous</a></p>

                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          </div>
</div>
</div>
</main>
    );
  }
}