import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './config/store';
import './App.css';

import PosUI from './PosUi';
import Category from "./PosUi/category"
import ConfirmationScreen from "./PosUi/confirmationScreen"

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={PosUI} />
        <Route path="/category/:category" component={Category} />
        <Route path="/confirmation" component={ConfirmationScreen} />

      </Switch>
    </HashRouter>
  </Provider>
);
