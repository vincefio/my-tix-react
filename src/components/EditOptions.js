import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import {  FormGroup, FormControl, ControlLabel } from 'react-bootstrap'


class EditOptions extends React.Component{
	constructor(){
		super();

		this.state ={
			show: false,
			show2: false,
			formEditOptionName: "",
			formEditOptionPrice: "",
			formEditOptionQuantity: "",
			formEditOptionLocation: "",
			formEditOptionDescription: "",
			optionID: ""
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleOptionEditSubmit=this.handleOptionEditSubmit.bind(this)
	}

	handleChange(event){
		var newState = {};
    newState[event.target.id] = event.target.value
    this.setState(newState);
	}

	handleOptionEditSubmit(event){
		event.preventDefault()
		console.log('handlesubmit called');

		var optionID = this.props.id
		this.setState({optionID: optionID})
		this.props.editOption(this.state.optionID, this.state.formEditOptionName, this.state.formEditOptionPrice, this.state.formEditOptionQuantity, this.state.formEditOptionLocation, this.state.formEditOptionDescription)
		console.log(this.state.optionID)
		this.setState({
				formEditOptionName:"",
				formEditOptionPrice: "",
				formEditOptionQuantity:"",
				formEditOptionLocation:"",
				formEditOptionDescription: "",
				optionID: ""

			})
			console.log("posted")
		}


		componentDidMount(){
			this.setState({
				optionID: this.props.id
			})
		}

render(){
	return(
						<Row bsClass="row">
							<Col componentClass={ControlLabel} xs={4}>
									{this.props.name}
					     </Col>
					    <Col bsClass="col" xs={8}>
					     		<Row bsClass="row">
					     			<FormGroup controlId="formEditOptionName">
							     	 <Col componentClass={ControlLabel} xs={4}>
							        	Name:
							       	</Col>
						       		<Col xs={8}>
						       			<FormControl type="text" value={this.state.value} placeholder=""
						            onChange={this.handleChange}/>
					       			</Col>
					       		</FormGroup>
						       	</Row>


						       	<Row bsClass="row">
						       	<FormGroup controlId="formEditOptionPrice">
						        	<Col componentClass={ControlLabel} xs={4}>
						        		Price:
						        	</Col>
					       			<Col xs={8}>
					       				<FormControl type="number" value={this.state.value} placeholder=""
					            	onChange={this.handleChange}/>
					       			</Col>
					       			</FormGroup>
				       			</Row>

				       			<Row bsClas="row">
				       			<FormGroup controlId="formEditOptionQuantity">
							        <Col componentClass={ControlLabel} xs={4}>
							        	Quantity:
							        </Col>
						       		<Col xs={8}>
						       			<FormControl type="number" value={this.state.value} placeholder=""
						            onChange={this.handleChange}/>
						       		</Col>
						       	</FormGroup>
				       			</Row>
				       			<Row bsClass="row">
					       			<FormGroup controlId="formEditOptionLocation">
								        <Col componentClass={ControlLabel} xs={4}>
								        	Location:
								        </Col>
							       		<Col xs={8}>
							       			<FormControl componentClass="textarea" value={this.state.value} placeholder=""
							            onChange={this.handleChange}/>
							       		</Col>
							       	</FormGroup>
					       		</Row>

				       			<Row bsClass="row">
					       			<FormGroup controlId="formEditOptionDescription">
								        <Col componentClass={ControlLabel} xs={4}>
								        	Description:
								        </Col>
							       		<Col xs={8}>
							       			<FormControl componentClass="textarea" value={this.state.value} placeholder=""
							            onChange={this.handleChange}/>
							       		</Col>
							       	</FormGroup>
					       		</Row>
									</Col>
									<Button type="submit" onClick={this.handleOptionEditSubmit}  bsStyle="primary">Save changes</Button>
					   	 </Row>

					   	 )
				}
			}

export default EditOptions
