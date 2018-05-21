import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Home} from "./containers/Home";
import { IconSettings} from '@salesforce/design-system-react';

const Routes = () => {
	return (
		  <Router>
		    <Route exact path="/" component={Home} />
		  </Router>
	);
}
export default Routes;