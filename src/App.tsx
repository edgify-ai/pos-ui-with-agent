import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

import store from './config/store';
import './App.css';

import PosUI from './PosUi';
import Category from './PosUi/category';
import ConfirmationScreen from './PosUi/confirmationScreen';
import DataCollectionScreen from './DataCollector/index';

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={PosUI} />
        <Route path="/category/:category" component={Category} />
        <Route path="/confirmation" component={ConfirmationScreen} />
        <Route path="/data-collector" component={DataCollectionScreen} />
      </Switch>
    </HashRouter>
    <ReduxToastr
      timeOut={2000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);
