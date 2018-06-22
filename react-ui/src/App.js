import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import Home from './containers/Home';
import TrialSubmitted from './TrialSubmittedComponent';
import $ from 'jquery'; 


class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        result: null,
      };
      this.handleQueryExecution = this.handleQueryExecution.bind(this);
    }

    handleQueryExecution(data) {
      //event.preventDefault();
      // Send SOQL query to server
      console.log('trial= ',data.newTrial);

      $.ajax({
        url: '/newTrial',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(data.newTrial),
        method: 'POST',
        success: function(data) {
          this.setState({result: JSON.stringify(data, null, 2)});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({result: 'Failed to create trial.'});
        }.bind(this)
      });
    }
  
    render() {
      return (
        <div>
          <div className="slds-m-around--xx-large">
            <Home onExecuteQuery={this.handleQueryExecution} />
            { this.state.result ?
              <TrialSubmitted />
              :
              null
            }
          </div>
        </div>




        //<Router>
          //<Switch>
            //<Route exact path="/" component={Home} />
            //<Route path="/TrialSubmitted" component={TrialSubmitted} />
          //</Switch>
        ///</Router>
      );
    } 
}



export default App;
