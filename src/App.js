import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./AppHeader";
import TopStatus from './TopStatus';
import MyStorage from './utils/MyStorage';
import {
  SalePage,
  LoginPage,
  UserPage,
} from './pages';

class App extends Component {
  constructor(props) {
    super(props);
    MyStorage.init();
  }
  render() {
    return (
      <Router>
      { !MyStorage.user ? <LoginPage /> :
        <div className="App">
          <AppHeader />
          <div className="App-main">
            <Switch>
              <Route path="/" exact component={TopStatus} />
              <Route path="/sale/" component={SalePage} /> 
              <Route path="/user/" component={UserPage} />   
            </Switch>
          </div>
        </div>
      }
    </Router>
    );
  }
}
export default App;
