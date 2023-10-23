import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Accueil
        </NavLink>
      </li>
      {props.utilisateur.message === "student object" ||
      props.utilisateur.message === "employer object" ? (
        <>
          {props.utilisateur.message === "student object"
            ? props.utilisateur.student.lastName + " est connecté (étudiant)"
            : props.utilisateur.employer.lastName + " est connecté (employeur)"}
          <li>
            <NavLink to="stage">Stage</NavLink>
          </li>
          <li></li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/creer-compte">Créer un comptet</NavLink>
          </li>
          <li>
            <NavLink to="/connexion">Se connecter</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
