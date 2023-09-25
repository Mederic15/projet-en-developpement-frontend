import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink to="/creer-compte">Créer un comptet</NavLink>
      </li>
      <li>
        <NavLink to="/connexion">Se connecter</NavLink>
      </li>
      <li>
        <NavLink to="stage">Stage</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;