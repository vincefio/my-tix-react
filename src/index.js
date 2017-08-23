import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Event from './event'
import OG from './Passport.js'
// import Settings from './containers/Settings'
// import { BrowserRouter } from 'react-router-dom'



ReactDOM.render(
<BrowserRouter>
	<Switch>

		<Route path="/" component={OG} />
		<Route path="/home" component={App}/>
		<Route exact path="/events/:id" component={Event} />
	</Switch>
</BrowserRouter>
,
	document.getElementById("root"));
