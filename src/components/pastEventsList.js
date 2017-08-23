import React from 'react'
import { ListGroupItem} from 'react-bootstrap';
import { ListGroup, } from 'react-bootstrap'
import CurrentEvents from "./currentEvents"
import PastEvents from "./pastEvents"

class PastEventsList extends React.Component{
	constructor(){
		super();
		this.state={
			items: []
		}
	}

	render(){
			return (
				<ListGroup>
					{this.props.pastEvents.map(item =>
						<ListGroupItem className="eventsList" key={item._id}>
							<PastEvents  editEvent={this.props.editEvent}  name={item.Name} options={item.Option} id={item._id} editOption={this.props.editOption} startdate={item.StartDate} endDate={item.EndDate}
							/>
						</ListGroupItem>
					)}
				</ListGroup>	
				)
		}
	}

export default PastEventsList;
