// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import AlertsCounter from '../alertsCounter';
import logo from '../../images/logo-4@3x.png';
import './header.scss';

const renderBackButton = () => (
  <Link to={`/${window.location.search}`}>
    <div className="returnButton">Back</div>
  </Link>
);

const Header = ({ showBackButton }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logoImage" src={logo} alt="Edgify" />
      </Link>
      <AlertsCounter classname="counter" />
      {showBackButton ? renderBackButton() : ''}
    </div>
  );
};

export default Header;
