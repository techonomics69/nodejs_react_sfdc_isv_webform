import React, { Component } from 'react';
import { Button, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import {COUNTRIES} from '../data/combodata';
import {PTYPES} from '../data/combodata';
import {CPREFS} from '../data/combodata';
import {Trial} from './Trial';

var $ = require('jquery');




class TrialForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      
      redirect: false,

      firstName: '',
	  lastName: '',
	  email: '',
	  company: '',
	  phone: '',
	  uname: '',
	  countryCode: '',
	  prefValue: '',
	  phoneValue: '',

	  firstNameError: '',
	  lastNameError: '',
	  emailError: '',
	  companyError: '',
	  phoneError: '',
	  unameError: '',
	  countryValueError: '',
	  prefValueError: '',
	  phoneValueError: '',

	  trial: {

	  	  firstName: '',
		  lastName: '',
		  email: '',
		  company: '',
		  phone: '',
		  uname: '',
		  countryCode: '',
		  prefValue: '',
		  phoneValue: '',

	  }


    };

    let newTrial = new Trial('','','','','','','','','');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('redirect:',this.state.redirect);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var e = '';

    //this.setState({
    //  [name]: value,
    //  [e]: '',
    //});


    Object.keys(this.state.trial).map((i) => {
    	e = [i]+'Error';
    	this.setState({ [i]: value,})
    	console.log('i= ',i);
    	console.log('value= ',value);
	});

	if ( e != '') {
		this.setState({
			[e]: '',
		});
	}

  }

  handleSubmit(event){
    event.preventDefault();

    var e = '';

    this.setState({
      isOpen: false,
    });

    Object.keys(this.state.trial).map((key) => {
    	if(this.state.trial[key] == ''){
    		console.log('key='+key+' value= '+this.state.trial[key]);
    		e = [key]+'Error';
    	}
    });

    if (e != '') {
    	this.setState({[e]: 'This is a required field.',});
    		console.log('error= ',e);
    }


    //let myTrial = new Trial(this.state.firstName, 
    //							 this.state.lastName, 
    //							 this.state.email, 
    //							 this.state.company, 
    //							 this.state.phone, 
    //							 this.state.uname, 
    //							 this.state.countryCode, 
    //							 this.state.prefValue, 
    //							 this.state.phoneValue);

    //if (!myTrial){
    //	return;
    //}

    //this.props.onExecuteQuery({newTrial: myTrial});

  }

  render() {
  	

    return (
		<div>
	            <IconSettings iconPath="/icons">
	              <div>
	                <form onSubmit={this.handleSubmit}>
	                  <section className="slds-p-around--large">
	                    <div className="slds-grid slds-gutters">
	                      <div className="slds-col">
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="firstName"
	                            label="First Name"
	                            required
	                            name="firstName"
	                            type="text"
	                            errorText={this.state.firstNameError}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="email"
	                            label="Email"
	                            required
	                            name="email"
	                            type="email"
	                            errorText={this.state.emailError}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="phone"
	                            label="Phone"
	                            required
	                            name="phone"
	                            errorText={this.state.phoneError}
	                            type="tel"
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="company"
	                            label="Company"
	                            required
	                            name="company"
	                            type="text"
	                            errorText={this.state.companyError}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="uname"
	                            label="Please enter a username of your choice in the form of an email"
	                            required
	                            name="uname"
	                            type="text"
	                            errorText={this.state.unameError}
	                            onChange={this.handleInputChange}
	                            placeholder="example: sara@trial.user or mike@my.trial"
	                          />
	                        </div>
	                      </div>                
	                      <div className="slds-col">
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="lastName"
	                            label="Last Name"
	                            required
	                            name="lastName"
	                            type="text"
	                            errorText={this.state.lastNameError}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="contactPrefs"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', event, data);
	                                }
	                                this.setState({
	                                  prefValue: data.selection[0].id,
	                                  prefSelection: data.selection,
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Contact Preference',
	                            }}
	                            options={CPREFS}
	                            errorText={this.state.prefValueError}
	                            selection={this.state.trial.prefSelection}
	                            value={this.state.trial.prefValue}
	                            variant="readonly"
	                            required
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="phoneType"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', event, data);
	                                }
	                                this.setState({
	                                  phoneValue: data.selection[0].id,
	                                  phoneSelection: data.selection,
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Phone Type',
	                            }}
	                            options={PTYPES}
	                            selection={this.state.trial.phoneSelection}
	                            value={this.state.trial.phoneValue}
	                            variant="readonly"
	                            errorText={this.state.phoneValueError}
	                            required
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="country"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', data);
	                                }
	                                this.setState({
	                                  countryValue: data.selection[0].label,
	                                  countrySelection: data.selection,
	                                  countryCode: data.selection[0].id,
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Country',
	                            }}
	                            options={COUNTRIES}
	                            selection={this.state.trial.countrySelection}
	                            value={this.state.trial.countryValue}
	                            variant="readonly"
	                            errorText={this.state.countryCodeError}
	                            required
	                          />
	                        </div>
	                      </div>
	                    </div>  
	                    <div align="right">
	                    	<Button label="Submit" variant="brand" type="submit" onClick={this.handleSubmit.bind(this)}></Button> 
	                    </div> 
	                  </section>
	                </form>
	              </div>
	            </IconSettings>
	          </div>
	        );
		}
	}

export default TrialForm;