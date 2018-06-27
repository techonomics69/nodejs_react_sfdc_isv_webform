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

      firstName: {value:'', isValid:true, message:''},
	  lastName: {value:'', isValid:true, message:''},
	  email: {value:'', isValid:true, message:''},
	  company: {value:'', isValid:true, message:''},
	  phone: {value:'', isValid:true, message:''},
	  uname: {value:'', isValid:true, message:''},
	  countryCode: {value:'', isValid:true, message:''},
	  prefValue: {value:'', isValid:true, message:''},
	  phoneValue: {value:'', isValid:true, message:''},


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
    var e = name+'Error';

    var state = this.state;
    state[name].value = value;
    state[name].message = '';

    this.setState(state);


  }

  handleSubmit(event){
    event.preventDefault();

    var state = this.state;
    var val = true;


    Object.keys(state).map(key => {
    	if(state[key].value == ''){
    		state[key].message = 'This is a required field.'
    		val = false;
    	}
    });

    this.setState(state);

    if (!val) {
    	console.log('validation error');
    } else {


    	let myTrial = new Trial(this.state.firstName.value, 
    							this.state.lastName.value, 
    						    this.state.email.value, 
    							this.state.company.value, 
    							this.state.phone.value, 
    							this.state.uname.value, 
    							this.state.countryCode, 
    							this.state.prefValue, 
    							this.state.phoneValue);

    	if (!myTrial){
    		return;
    	}

    	this.props.onExecuteQuery({newTrial: myTrial});
	}

  }

  render() {
  	
  	var {firstName, lastName, email, company, phone, uname, countryCode, prefValue, phoneValue} = this.state;

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
	                            errorText={firstName.message}
	                            value={firstName.value}
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
	                            errorText={email.message}
	                            value={email.value}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="phone"
	                            label="Phone"
	                            required
	                            name="phone"
	                            errorText={phone.message}
	                            value={phone.value}
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
	                            errorText={company.message}
	                            value={company.value}
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
	                            errorText={uname.message}
	                            value={uname.value}
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
	                            errorText={lastName.message}
	                            value={lastName.value}
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
	                                  prefValueError: '',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Contact Preference',
	                            }}
	                            options={CPREFS}
	                            errorText={this.state.prefValueError}
	                            selection={this.state.prefSelection}
	                            value={this.state.prefValue}
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
	                                  phoneValeuError:'',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Phone Type',
	                            }}
	                            options={PTYPES}
	                            selection={this.state.phoneSelection}
	                            value={this.state.phoneValue}
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
	                                  countryCodeError: '',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Country',
	                            }}
	                            options={COUNTRIES}
	                            selection={this.state.countrySelection}
	                            value={this.state.countryValue}
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