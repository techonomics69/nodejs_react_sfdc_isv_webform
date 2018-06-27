import React, { Component } from 'react';
import { Button } from '@salesforce/design-system-react';
import '../App.css';




class TrialSubmitted extends React.Component {

  constructor(props) {
    super(props);

  }

  

  render() {

    return (
		<div className="slds-p-around--large" align="center">   
	    	<h1 className="App-body">{this.props.result}</h1>  
	    </div>
	);
   }
}

export default TrialSubmitted;