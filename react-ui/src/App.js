import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import Home from './containers/Home';
import TrialSubmitted from './TrialSubmittedComponent';


class App extends React.Component {

  
    render() {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/TrialSubmitted" component={TrialSubmitted} />
          </Switch>
        </Router>
      );
    } 
}



export default App;
