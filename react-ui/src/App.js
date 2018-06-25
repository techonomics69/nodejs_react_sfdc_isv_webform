import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import TrialModal from './containers/TrialModal';
import TrialForm from './containers/TrialForm';
import TrialHeader from './containers/TrialHeader';
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
          this.setState({result: 'Success'});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({result: 'Failed'});
          //this.setState({error: 'Failed to create trial. '+err});
        }.bind(this)
      });
    }
  
    render() {

      return (
        <div>
          <div className="slds-m-around--xx-large">
            <TrialHeader/>
           // replace TrialForm with TrialModal if you want to add a button component to open a modal instead of a form
            <div>
              {this.state.result == null ? 
                <TrialForm onExecuteQuery={this.handleQueryExecution} /> 
                :
                <TrialSubmitted /> 
              }
            </div>  
         
          </div>
        </div>

      );
    } 
}



export default App;
