import React, { Component } from "react";
import { Navigate } from "react-router-dom";
class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courriel: "",
      motDePasse: "",
      typeCompte: "",
      authentificated: false,
    };
  }

  handleTypeCompteChange = (e) => {
    this.setState({ typeCompte: e.target.value });
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez maintenant utiliser this.state pour obtenir les données du formulaire
    console.log("Courriel :", this.state.courriel);
    console.log("Mot de passe :", this.state.motDePasse);

    const courriel = this.state.courriel,
      motDePasse = this.state.motDePasse;

    fetch(
      "https://development-project-0105-api-zdnf.onrender.com/users" +
        (this.state.typeCompte === "etudiant" ? "/students" : "/employers"),
      {
        method: "PATCH",
        body: JSON.stringify({ email: courriel, password: motDePasse }), // body data type must match "Content-Type" header
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (
          json.message === "student object" ||
          json.message === "employer object"
        ) {
          this.setState({ authentificated: true });
          this.props.setUtilisateurFunction(json);
        } else {
          alert("Le courriel ou le mot de passe est invalide!");
        }
        console.log(json);
      });
  };

  render() {
    return !this.state.authentificated ? (
      <div>
        <h2>Connexion</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Courriel :
              <input
                type="text"
                name="courriel"
                value={this.state.courriel}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Mot de passe :
              <input
                type="password"
                name="motDePasse"
                value={this.state.motDePasse}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="typeCompte"
                value="etudiant"
                checked={this.state.typeCompte === "etudiant"}
                onChange={this.handleTypeCompteChange}
              />
              Étudiant
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="typeCompte"
                value="compagnie"
                checked={this.state.typeCompte === "compagnie"}
                onChange={this.handleTypeCompteChange}
              />
              Compagnie
            </label>
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    ) : (
      <Navigate replace to="/" />
    );
  }
}

export default Connexion;
