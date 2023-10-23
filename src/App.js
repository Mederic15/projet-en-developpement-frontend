import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import PageAccueil from "./Accueil";
import FormulaireCreationCompte from "./creer-compte/CreerCompte";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Connexion from "./connexion/connexion";
import NewStage from "./stage/pages/NewStage";

function App() {
  const [utilisateur, setUtilisateur] = useState({
    message: "unauthentificated",
  });

  return (
    <div className="App">
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route
              path="/creer-compte"
              element={<FormulaireCreationCompte utilisateur={utilisateur} />}
            />
            <Route
              path="/connexion"
              element={<Connexion setUtilisateurFunction={setUtilisateur} />}
            />
            <Route path="/stage" element={<NewStage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
