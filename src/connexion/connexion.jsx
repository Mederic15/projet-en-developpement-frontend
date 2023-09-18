import React, { Component } from 'react';

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courriel: '',
      motDePasse: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez maintenant utiliser this.state pour obtenir les données du formulaire
    console.log('Courriel :', this.state.courriel);
    console.log('Mot de passe :', this.state.motDePasse);
    // Ajoutez ici la logique pour traiter la connexion
  };

  render() {
    return (
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
          <button type="submit">Se connecter</button>
        </form>
      </div>
    );
  }
}

export default Connexion;
