import React, { Component } from 'react';
import { Button } from '@salesforce/design-system-react';
import '../App.css';




class TrialSubmitted extends React.Component {

  constructor(props) {
    super(props);

  }

  

  render() {

    return (
		<div className="slds-p-around--large">   
	    	<h1 className="slds-form-element slds-m-bottom--large">{this.props.result}</h1>  
	    </div>
	);
   }
}

export default TrialSubmitted;