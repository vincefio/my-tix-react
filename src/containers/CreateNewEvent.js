import React from 'react';
import { Button, Row, Col, PageHeader, Grid, Modal } from 'react-bootstrap';
import {  FormGroup, FormControl, ControlLabel, Form  } from 'react-bootstrap'
import axios from 'axios'
import DisplayOptions from '../components/optionsList'
import {Redirect} from 'react-router-dom'

class CreateNewEvent extends React.Component{

	constructor(){
		super();

		this.state= {
			show: false,
			newEventName: "",
			newEventStart: "",
			newEventEnd: "",
			newEventLocation: "",
			newEventPicture: "",
			newOptionName: "",
			newOptionPrice: "",
			newOptionQuantity: "",
			newOptionDescription: "",
			options: []

		}

		this.handleChange = this.handleChange.bind(this)
		this.handleOptionSubmit = this.handleOptionSubmit.bind(this)
		this.handleEventSubmit = this.handleEventSubmit.bind(this)
	}
	  showModal = () => {
	    this.setState({show: true});
	  }

	  hideModal =(event) => {
	    this.setState({show: false})


	  }

	  handleChange = (event) => {
	    var newState = {};
	    newState[event.target.id] = event.target.value;
	    this.setState(newState);
  }

  handleOptionSubmit(event) {
		event.preventDefault()
		console.log('handlesubmit called')
		this.props.makeNewOption(this.state.newOptionName, this.state.newOptionPrice, this.state.newOptionQuantity, this.state.newOptionDescription)
		this.setState({
			newOptionName: "",
			newOptionPrice: "",
			newOptionQuantity: "",
			newOptionLocation: "",
			newOptionDescription: ""
			})
			this.hideModal();
		}

		handleEventSubmit(event){
			event.preventDefault()
			console.log('handlesubmit called')
			// console.log(this.state)
			this.props.makeNewEvent(this.state.newEventName, this.state.newEventStart, this.state.newEventEnd, this.state.newEventLocation,this.state.newEventPicture, this.props.options)
			console.log("================")
			console.log(this.props.options)
			this.setState({
				newEventName: "",
				newEventStart: "",
				newEventEnd: "",
				newEventPicture: "",
				newEventLocation: "",
				options: []
				})
		}
	render(){
		return(
				<Grid fluid>
					<Row bsClass='row'>
						<Col bsClass="col" xs={12}>
						<PageHeader className="titles">Create A New Event</PageHeader>
							<form method="POST" action="/api/event" className="createForm">
								<FormGroup controlId="newEventName">
									<ControlLabel className="labels">Event Name</ControlLabel>
									<FormControl type="text" value={this.state.newEventName} onChange={this.handleChange} placeholder="Enter Name"/>
								</FormGroup>
								<Form inline>
									<FormGroup controlId="newEventStart" className="startInput">
										<ControlLabel className="labels">Start Date</ControlLabel>
										<FormControl  type="date" value={this.state.newEventStart} onChange={this.handleChange} placeholder=""/>
									</FormGroup>
									<FormGroup controlId="newEventEnd" className="endInput" >
										<ControlLabel className="labels">End Date</ControlLabel>
										<FormControl  type="date" value={this.state.newEventEnd} onChange={this.handleChange} placeholder="Enter Name"/>
									</FormGroup>
								</Form>
								<FormGroup controlId="newEventLocation">
									<ControlLabel className="labels">Location</ControlLabel>
									<FormControl type="text" value={this.state.newEventLocation} onChange={this.handleChange} placeholder="Address"/>
								</FormGroup>
								<FormGroup controlId="newEventPicture">
									<ControlLabel className="labels">Picture</ControlLabel>
									<FormControl type="file" value={this.state.newEventPicture} onChange={this.handleChange} />
								</FormGroup>
								<Button type="button" onClick={this.showModal}>Add an Option</Button>
									<Modal
						       show={this.state.show}
						       onHide={this.hideModal}>
						       <Modal.Header>
						       		<Modal.Title>Add An Event Option</Modal.Title>
						       </Modal.Header>
						       <Modal.Body>
										 <FormGroup controlId="newOptionName">
												<ControlLabel>Option Name</ControlLabel>
												<FormControl type="text" value={this.state.newOptionName} onChange={this.handleChange} placeholder="Enter Name"/>
											</FormGroup>
											<FormGroup controlId="newOptionPrice">
												<ControlLabel>Price</ControlLabel>
												<FormControl type="number" value={this.state.newOptionPrice} onChange={this.handleChange} placeholder=""/>
											</FormGroup>
											<FormGroup controlId="newOptionQuantity">
												<ControlLabel>Quantity of Tickets</ControlLabel>
												<FormControl type="integer" value={this.state.newOptionQuantity} onChange={this.handleChange} placeholder=""/>
											</FormGroup>
											<FormGroup controlId="newOptionLocation">
												<ControlLabel>Location</ControlLabel>
												<FormControl type="text" value={this.state.newOptionLocation} onChange={this.handleChange} placeholder="Address"/>
											</FormGroup>
											<FormGroup controlId="newOptionDescription">
												<ControlLabel>Description</ControlLabel>
												<FormControl type="textarea" value={this.state.newOptionDescription} onChange={this.handleChange} placeholder="Enter Description"/>
											</FormGroup>
						       	</Modal.Body>
						      	<Modal.Footer>
							        <Button onClick={this.hideModal} >Close</Button>
							        <Button type="submit" onClick={this.handleOptionSubmit}  bsStyle="primary">Save changes</Button>
							      </Modal.Footer>
							  	 </Modal>
									<DisplayOptions options={this.props.options} className="options"/>
							  <Button type="submit" onClick={this.handleEventSubmit}>Add Event</Button>
							</form>
						</Col>
					</Row>
				</Grid>
			)
	}
}



export default CreateNewEvent;
