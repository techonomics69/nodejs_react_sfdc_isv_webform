import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import Home from './containers/Home';
import TrialForm from './containers/TrialForm';
import TrialHeader from './containers/TrialHeader';
import TrialSubmitted from './TrialSubmittedComponent';
import $ from 'jquery'; 


class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        result: false,
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
          this.setState({result: true});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({result: false});
          this.setState({error: 'Failed to create trial. '+err});
        }.bind(this)
      });
    }
  
    render() {
      const isSubmitted = this.state.result;
      console.log('isSubmitted= ',isSubmitted);
      return (
        <div>
          <div className="slds-m-around--xx-large">
            <TrialHeader/>
            <div>
              {!isSubmitted ? <Home onExecuteQuery={this.handleQueryExecution} /> : null }
            </div>
            <div>
            {!isSubmitted ? <TrialForm onExecuteQuery={this.handleQueryExecution} /> : null }
            </div>
            <div>
            {isSubmitted ? <TrialSubmitted /> : null}
            </div>
          </div>
        </div>

      );
    } 
}



export default App;
