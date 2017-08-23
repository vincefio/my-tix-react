import React from 'react'
import { FormGroup, ListGroup, FormControl, ControlLabel, Form } from 'react-bootstrap'
import { Button, Row, Col, ListGroupItem, PageHeader, Grid, Modal } from 'react-bootstrap';

import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap"
import {Route, Redirect} from 'react-router-dom'
// import CurrentEvents from "./currentEvents"
import EditOptionsList from './EditOptionsList'
import moment from 'moment'



class CurrentEvents extends React.Component{
	constructor(){
		super();

		this.state ={
			show: false,
			show2: false,
			formEditName:"",
			formEditStartDate: "",
			formEditEndDate:"",
			formEditPicture:"",
			formEditLocation:"",
			eventID: "",
			startdate: "",
			endDate: "",
			current: "",
			url: "",
			barcode: '',
			before: false

		}
		this.handleChange=this.handleChange.bind(this)
		this.handleEditSubmit=this.handleEditSubmit.bind(this)
	}

	//--------------------------------
	//--------------------------------
	//Show and Hide Modal Functions

	  showModal = () => {
	    this.setState({show: true});
	  }

	  hideModal =() => {
	    this.setState({show: false});
	  }

	  showModal2 = () => {
	    this.setState({show2: true});
	  }

	  hideModal2 =() => {
	    this.setState({show2: false});
	  }
	//--------------------------------
	//--------

	handleScanChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	handleScanSubmit = event => {
		if(event.keyCode === 13)
		{
			document.getElementById('barcode').value = '';
			console.log("This.state.barcode " + this.state.barcode);

			axios
			.get('/api/barcode/'+ this.state.barcode
			)
			.then(response => {
				console.log(response);
				alert(response.data)
			})
		}
	}

		 handleChange = (event) => {


	    var newState = {};
	    newState[event.target.id] = event.target.value
	    this.setState(newState);

  }

			handleEditSubmit(event){
			event.preventDefault()
			console.log('handlesubmit called');


			this.setState({eventID: this.props.id})
			console.log("EventId : " + this.props.id);
			this.props.editEvent(this.state.eventID, this.state.formEditName, this.state.formEditStartDate, this.state.formEditEndDate, this.state.formEditPicture)
			this.setState({
					formEditName:"",
					formEditStartDate: "",
					formEditEndDate:"",
					formEditPicture:"",
					formEditLocation: "",
					eventID: ""

			})
			console.log("posted")
		}

		componentDidMount(){
			var now = moment().format("YYYY MM DD");
			console.log(now)
			var StartDate = this.props.startdate
			var startFormated = moment(StartDate).format("MM/DD/YYYY")
			var EndDate = this.props.endDate
			var endFormated  = moment(EndDate).format("MM/DD/YYYY")
			console.log(startFormated)
			var ID = this.props.id
			console.log(ID)
			if(moment().isBefore(StartDate)){
				this.setState({
					before: true
				})
			}


			this.setState({
				eventID: this.props.id,
				startdate: startFormated,
				endDate: endFormated,
				current: now,
				url: "/events/" + ID

			})

		}

	render(){
		const before = this.state.before
		return(
					<Row bsClass="row" className="listItem">
						<Col bsClass="col" xs={8}>
							<h4>{this.props.name}</h4>
							<h5>Start Date: {this.state.startdate}</h5>
							<h5>EndDate: {this.state.endDate}</h5>
								<FormGroup controlId="scanTicket">
									<Col componentClass={ControlLabel} xs={3}>
										Scan Ticket
					        </Col>
					       	<Col xs={9}>
					       		<FormControl type="text" id="barcode" value={this.state.barcode} placeholder="Click here, then scan ticket."
					            onChange={this.handleScanChange} onKeyUp={this.handleScanSubmit}/>
					       	</Col>
					      </FormGroup>
						</Col>
						<Col bsClass="col" xs={4}>
							<Button className="homeButtons" onClick={this.showModal} block>Edit Event</Button>
								<Modal
				          show={this.state.show}
				          onHide={this.hideModal}>
									<Modal.Header>
										<Modal.Title>Edit Event</Modal.Title>
									</Modal.Header>
								<Form horizontal>
									<Modal.Body>
											<FormGroup controlId="formEditName">
												<Col componentClass={ControlLabel} xs={2}>
													Event Name
								        </Col>
								       	<Col xs={10}>
								       		<FormControl type="text" value={this.state.value} placeholder="Enter text"
								            onChange={this.handleChange}/>
								       	</Col>
								       </FormGroup>
								       <FormGroup controlId="formEditStartDate">
													<Col componentClass={ControlLabel} xs={2}>
														Start Date
									        </Col>
									       	<Col xs={10}>
									       		<FormControl type="date" value={this.state.value} placeholder=""
									            onChange={this.handleChange}/>
									       	</Col>
								       </FormGroup>
								       <FormGroup controlId="formEditEndDate">
													<Col componentClass={ControlLabel} xs={2}>
														End Date
									        </Col>
									       	<Col xs={10}>
									       		<FormControl type="date" value={this.state.value} placeholder=""
									            onChange={this.handleChange}/>
									       	</Col>
								       </FormGroup>
								       <FormGroup controlId="formEditLocation">
													<Col componentClass={ControlLabel} xs={2}>
														End Date
									        </Col>
									       	<Col xs={10}>
									       		<FormControl type="date" value={this.state.value} placeholder="Address"
									            onChange={this.handleChange}/>
									       	</Col>
								       </FormGroup>
								       <FormGroup controlId="formEditPicture">
													<Col componentClass={ControlLabel} xs={2}>
														Picture
									        </Col>
									       	<Col xs={10}>
									       		<FormControl type="file" value={this.state.value} placeholder=""
									            onChange={this.handleChange}/>
									       	</Col>
								       </FormGroup>
									     <EditOptionsList options={this.props.options} editOption={this.props.editOption}/>
													</Modal.Body>
													<Modal.Footer>
											        <Button onClick={this.hideModal} >Close</Button>
											        <Button type="submit" onClick={this.handleOptionSubmit} onClick={this.hideModal}  bsStyle="primary">Save changes</Button>
											      </Modal.Footer>

												</Form>
										</Modal>
								<Button className="homeButtons" block >View Data</Button>
								<Button className="homeButtons" block href={this.state.url}>Customer Page</Button>
						</Col>
					</Row>
		)
	}
}

export default CurrentEvents
