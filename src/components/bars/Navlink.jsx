import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
//import './NavLinks.css';

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
        <NavLink to="/Employeur">Employeur</NavLink>
      </li>
      <li>
        <NavLink to="/Etudiant">Etudiant</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;