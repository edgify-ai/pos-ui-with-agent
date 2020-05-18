// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo-4@3x.png';
import './header.scss';


const renderBackButton = () => (
  <Link to={'/' + window.location.search}>
    <div className="returnButton">Back</div>
  </Link>
);

const Header = ({
  resetImage,
  location,
  getConainersList,
  showBackButton,
  containers,
}) => {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="logoImage"
          onClick={getConainersList}
          src={logo}
          alt="Edgify"
        />
      </Link>
      {showBackButton ? renderBackButton () : ''}
    </div>
  );
};

export default Header;
