import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
// import './App.css'
import LoginForm from './login-components/login'
import SignupForm from './login-components/Register'
// import Header from './login-components/Header'
import App from './App'
import Home from './containers/Home.js'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link to="/" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class OG extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user._id
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logged out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			// console.log(response)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(email, password) {
		axios
			.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		const loggedIn = this.state.loggedIn
		let userContainer= null

		if (loggedIn) {
			userContainer=<App loggedIn={this.state.loggedIn} user={this.state.user}/>
			}
			else{
			userContainer=
			<LoginForm  _logout={this._logout} _login={this._login} loggedIn={this.state.loggedIn}/>
			}
			return (

			<div className="App">


				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />

				{/* <LoginForm _logout={this._logout} _login={this._login} loggedIn={this.state.loggedIn}/> */}
					{/* <Route exact path="/home/user" render={(props)=> <App loggedIn = {this.state.loggedIn} user ={this.state.user}/>}  /> */}
				{/*  ROUTES */}
				{userContainer}




				<Route exact path="/signup" component={SignupForm} />
				{/* <LoginForm _login={this._login} /> */}
			</div>
		)
	}
}

export default OG
