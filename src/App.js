import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import TopStatus from './TopStatus';
import {
  SalePage
} from './pages';

const App = () => (
  <Router>
    <div className="App">
      <AppHeader />
      <div className="App-main">
        <Switch>
          <Route path="/" exact component={TopStatus} />
          <Route path="/sale/" component={SalePage} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
