import React from 'react'
import { ListGroupItem} from 'react-bootstrap';
import { ListGroup, } from 'react-bootstrap'
import CurrentEvents from "./currentEvents"

class CurrentEventsList extends React.Component{
	constructor(){
		super();
		this.state={
			items: []
		}
	}

	render(){
			return (
				<ListGroup>
					{this.props.currentEvents.map(item =>
						<ListGroupItem className="eventsList" key={item._id}>
							<CurrentEvents  editEvent={this.props.editEvent}  name={item.Name} options={item.Option} id={item._id} editOption={this.props.editOption} startdate={item.StartDate} endDate={item.EndDate}
							/>
						</ListGroupItem>
					)}
				</ListGroup>

				)
		}

	}

export default CurrentEventsList;
