import React from 'react';
import { Button, Row, Col, ListGroupItem, PageHeader, Grid, Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap'
import helper from "../utils/helpers"
import CurrentEventsList from "../components/CurrentEventsList"
import PastEventsList from "../components/pastEventsList"

class Home extends React.Component{

	constructor(){
		super();

		this.state= {
			currentEvents: [],
			pastEvents: [],
			userID: ""
		}
	}

	componentWillMount(){
		console.log("Component Mounted");
		this.setState({userID: this.props.user})
		console.log(this.state.userID)
}

componentDidMount(){
	var userID = this.state.userID
	console.log(userID)
		helper.getCurrentEvents(userID)
			.then(function(response){
					this.setState({
						currentEvents: response.data
					});
				console.log(response)
			}.bind(this));


		helper.getPastEvents(userID)
			.then(function(response){
					this.setState({
						pastEvents: response.data
					});
				console.log(response)
			}.bind(this));

		}


	render(){
		return(
				<Grid fluid>
					<Row bsClass="row">
						<Col bsClass="col" xs={12}>
							<PageHeader><small className="titles">Current Events</small></PageHeader>
							<CurrentEventsList currentEvents={this.state.currentEvents} editEvent={this.props.editEvent} editOption={this.props.editOption}/>
						</Col>
					</Row>
					<Row bsClass="row">
						<Col bsClass="col" xs={12}>
							<PageHeader><small className="titles">Past Events</small></PageHeader>
							<PastEventsList pastEvents={this.state.pastEvents}/>
						</Col>
					</Row>
					<Row bsClass='row'>

					</Row>
				</Grid>

		)
	}
}

export default Home;
