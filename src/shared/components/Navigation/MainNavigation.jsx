import React from "react";

import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

//import Backdrop from '../UIElements/Backdrop';
import "./MainNavigation.css";

const MainNavigation = (props) => {
  //const [setDrawerIsOpen] = useState(false);

  /*const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  */

  return (
    <React.Fragment>
      <MainHeader>
       
        <h1 className="main-navigation__title">
          <Link to="/">Collège Montmorency</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks utilisateur={props.utilisateur}/>
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
