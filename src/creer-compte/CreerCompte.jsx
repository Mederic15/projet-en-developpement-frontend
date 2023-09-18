import React, { Component } from 'react';

class FormulaireCreationCompte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeCompte: '', // Cette variable d'état stockera la valeur sélectionnée (étudiant ou compagnie)
      nom: '',
      prenom: '',
      adresse: '',
      numeroTelephone: '',
      nomCompagnie: '',
      adresseCompagnie: '',
      prenomGerant: '',
      nomGerant: '',
      numeroTelephoneCompagnie: '',
      posteGerant: '',
      courriel: '', // Champ courriel
      motDePasse: '', // Champ mot de passe
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
    console.log('Type de compte sélectionné :', this.state.typeCompte);
    console.log('Nom :', this.state.nom);
    console.log('Prénom :', this.state.prenom);
    console.log('Adresse :', this.state.adresse);
    console.log('Numéro de téléphone :', this.state.numeroTelephone);

    // Si le type de compte est "compagnie"
    if (this.state.typeCompte === 'compagnie') {
      console.log('Nom de la compagnie :', this.state.nomCompagnie);
      console.log('Adresse de la compagnie :', this.state.adresseCompagnie);
      console.log('Prénom du gérant :', this.state.prenomGerant);
      console.log('Nom du gérant :', this.state.nomGerant);
      console.log('Numéro de téléphone de la compagnie :', this.state.numeroTelephoneCompagnie);
      console.log('Poste du gérant :', this.state.posteGerant);
    }

    // Champ courriel et mot de passe
    console.log('Courriel :', this.state.courriel);
    console.log('Mot de passe :', this.state.motDePasse);

    // Ajoutez ici la logique pour créer le compte en fonction des données saisies
  };

  render() {
    return (
      <div>
        <h2>Créer un compte</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                name="typeCompte"
                value="etudiant"
                checked={this.state.typeCompte === 'etudiant'}
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
                checked={this.state.typeCompte === 'compagnie'}
                onChange={this.handleTypeCompteChange}
              />
              Compagnie
            </label>
          </div>

          {this.state.typeCompte === 'etudiant' && (
            <div>
              <label>
                Nom :
                <input
                  type="text"
                  name="nom"
                  value={this.state.nom}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'etudiant' && (
            <div>
              <label>
                Prénom :
                <input
                  type="text"
                  name="prenom"
                  value={this.state.prenom}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'etudiant' && (
            <div>
              <label>
                Adresse :
                <input
                  type="text"
                  name="adresse"
                  value={this.state.adresse}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'etudiant' && (
            <div>
              <label>
                Numéro de téléphone :
                <input
                  type="text"
                  name="numeroTelephone"
                  value={this.state.numeroTelephone}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'compagnie' && (
            <div>
              <label>
                Nom de la compagnie :
                <input
                  type="text"
                  name="nomCompagnie"
                  value={this.state.nomCompagnie}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'compagnie' && (
            <div>
              <label>
                Adresse de la compagnie :
                <input
                  type="text"
                  name="adresseCompagnie"
                  value={this.state.adresseCompagnie}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'compagnie' && (
            <div>
              <label>
                Prénom du gérant :
                <input
                  type="text"
                  name="prenomGerant"
                  value={this.state.prenomGerant}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'compagnie' && (
            <div>
              <label>
                Nom du gérant :
                <input
                  type="text"
                  name="nomGerant"
                  value={this.state.nomGerant}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'compagnie' && (
            <div>
              <label>
                Numéro de téléphone de la compagnie :
                <input
                  type="text"
                  name="numeroTelephoneCompagnie"
                  value={this.state.numeroTelephoneCompagnie}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {this.state.typeCompte === 'compagnie' && (
            <div>
              <label>
                Poste du gérant :
                <input
                  type="text"
                  name="posteGerant"
                  value={this.state.posteGerant}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          )}

          {/* Champ courriel */}
          {this.state.typeCompte && (
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
          )}

          {/* Champ mot de passe */}
          {this.state.typeCompte && (
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
          )}

          <button type="submit">Créer le compte</button>
        </form>
      </div>
    );
  }
}

export default FormulaireCreationCompte;
