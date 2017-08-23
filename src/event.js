import React from 'react';
import customerCSS from './css/customer.css'
import Main from './customer/Main'; 
import Purchase from './customer/Purchase';
import Ticket from './customer/Ticket'; 
import axios from 'axios'; 

class Event extends React.Component{

	constructor() {
		super()

		this.state = {
			eventSelect: [],
			view: 0,
			barcode: 0
		}
	}; 

	componentDidMount() {
		var pathname = this.props.location.pathname
		console.log(pathname)
		var pathnameString = pathname.substring(8)
		console.log(pathnameString)

		axios.get("/events/" + pathnameString)
		.then(function(response){
			console.log(response)

			this.setState({
				eventSelect: response.data
			});
			console.log(response)
		}.bind(this));
	} 

	setView = (number) => {
		this.setState({ view: number })
	}

	setBarcode = (theBarcode) => {
		this.setState({ barcode: theBarcode })
	}

	render(){

		const view = this.state.view

		let viewContainer = null;

		if (view === 0) {
			viewContainer = <Main 
	      // poster={this.state.eventSelect.picture}
	      name={this.state.eventSelect.Name} 
	      desc={this.state.eventSelect.description}
	      location={this.state.eventSelect.location}
	      start={this.state.eventSelect.StartDate}
	      end={this.state.eventSelect.EndDate}
	      setView={this.setView}
	    />
		} 
		else if (view === 1) {
			viewContainer = <Purchase 
				setView={this.setView}
				name={this.state.eventSelect.Name} 
				option={this.state.eventSelect.Option}
				_id={this.state.eventSelect._id}
				setBarcode={this.setBarcode}
			/>
		}
		else if(view === 2){
			viewContainer = <Ticket 
				barcode={this.state.barcode}
				name={this.state.eventSelect.Name}
				startDate={this.state.eventSelect.StartDate}
			/>
		}

		return(
			<div className="container col-sm-12">
	      <div className="App">
	        <div className="App-header">
	          <div className="row">
	            <div className="col-sm-7">
	              <h2 id="siteName">MyTix</h2>
	            </div>
	            <div className="col-sm-5">

	            </div>
	          </div>
	        </div>
	      </div>
	      {/*<!-- end App -->*/}

	      {viewContainer}

	    </div>
		);
	}
}

export default Event;
