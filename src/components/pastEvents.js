import React from 'react'
import { FormGroup, ListGroup, FormControl, ControlLabel, Form } from 'react-bootstrap'
import { Button, Row, Col, ListGroupItem, PageHeader, Grid, Modal } from 'react-bootstrap';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap"
import {Route, Redirect} from 'react-router-dom'
import EditOptionsList from './EditOptionsList'
import moment from 'moment'



class PastEvents extends React.Component{

	constructor(){
		super();

		this.state = {
			show3: false
		}
	}
    showModal3 = () => {
    this.setState({show3: true});
	  }

	  hideModal3 =() => {
	    this.setState({show3: false});
	  }
//------------


	render(){
		return(

			<Row bsClass="row">
				<Col bsClass="col" xs={8}>
					<h4>{this.props.name}</h4>
				</Col>
				<Col bsClass="col" xs={4}>
					<Button onClick={this.showModal3} block>View Data</Button>
						<Modal
		          show={this.state.show3}
		          onHide={this.hideModal3}>
							<Modal.Header>
								<Modal.Title>Data</Modal.Title>
							</Modal.Header>
							<Modal.Body>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.hideModal3}>Close</Button>
							</Modal.Footer>
						</Modal>
				</Col>
			</Row>

		)
	}
}

export default PastEvents
