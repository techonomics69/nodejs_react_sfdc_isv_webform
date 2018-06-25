import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from './salesforcelogo.svg';
import './App.css';
import { Button, Modal, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import TrialModal from './containers/TrialModal';
import TrialForm from './containers/TrialForm';
import TrialHeader from './containers/TrialHeader';
import TrialSubmitted from './containers/TrialSubmitted';
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
      // Send form data to server

      $.ajax({
        url: '/newtrial',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(data.newTrial),
        method: 'POST',
        success: function(data) {
          this.setState({result: 'Thank you for your interest! Please check your email for login instructions.'});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({result: 'Failed to create a trial. '+err+' status='+status+' xhr= '+xhr});
        }.bind(this)
      });
    }
  
    render() {

      // replace the word TrialForm with TrialModal if you want to add a button component to open a modal instead of a form

      return (
        <div>
          <div className="slds-m-around--xx-large">
            <TrialHeader/>
            <div>
              {this.state.result == null ? 
                <TrialForm onExecuteQuery={this.handleQueryExecution} /> 
                :
                <TrialSubmitted result={this.state.result}/> 
              }
            </div>  
         
          </div>
        </div>

      );
    } 
}



export default App;
