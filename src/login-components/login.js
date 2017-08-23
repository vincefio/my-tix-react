import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// import './App.css'
import App from '../App'
import SignupForm from './Register'
import { Redirect, Switch } from 'react-router-dom'

import Register from './Register'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.email, this.state.password)
		// clean up the form
		// this.setState({
		// 	email: '',
		// 	password: ''
		// })
		// redirect - will clean form
		this.setState({
			redirectTo: '/home/user'
		})
		// axios
		// 	.post('/auth/login', {
		// 		email: this.state.email,
		// 		password: this.state.password
		// 	})
		// 	.then(response => {
		// 		if (response.status === 200) {
		// 			// update the state
		// 		}
		// 		console.log(response)
		// 	})
	}

	render(){
			if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
			}
			return (
				{/*<ListGroup>
								{this.props.currentEvents.map((obj, index) =>

									<ListGroupItem key={index}>
										<CurrentEvents  />
									</ListGroupItem>
									)}

								</ListGroup>	*/},

				<div id="loginContainer">



				<div className="container">
				  <div className="wrapper">
				    <form action="" method="post" className="form-signin login">
				      <h2 className="form-signin-heading">Please login</h2>

				      <label htmlFor="username">Email</label>
				      <input
				       type="email"
				       className="form-control"
				       id="email-input"
				       name="email"
				       placeholder="Email Address" required=""
				       value={this.state.email}
								onChange={this.handleChange}>
				      </input>

				      <label htmlFor="password">Password</label>
				      <input
				      type="password"
				      className="form-control"
				      id="password-input"
				      name="password"
				      placeholder="Password"
				      required=""
				      value={this.state.password}
							onChange={this.handleChange}>
				      </input>


				      {/*<label className="checkbox">
				        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Remember me</input>
				      </label>*/}
				      <button onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block" id="loginSubmit">Login</button>

				          <p className="text-center register-link">New to our App? <Link to="/register">Register</Link></p>
				    </form>
				  </div>

				 	<Route exact path="/home/user" render={(props)=><App loggedIn = {this.state.loggedIn}/>} />
					<Route path="/register" component={Register} />

				</div>
			</div>

		)
	}
}

export default LoginForm
