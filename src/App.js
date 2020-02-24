import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import About from "./components/about";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Home from "./components/home/index";

import { Provider } from 'react-redux';
import store from './store'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/home" component={Home} />

          </Switch>
        </Provider>
      </Router>
    );
  }
}
export default App;
