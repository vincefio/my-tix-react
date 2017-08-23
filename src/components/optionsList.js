import React from 'react'
import { ListGroupItem } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap'


const DisplayOptions = props => {
	const options = props.options.map(item => {
		console.log(item)
		return (
				<ListGroupItem key={item._id} className="options">
					<h4>{item.optionName}</h4>
					<p>Price: {item.optionPrice}</p>
					<p>Number of Tickets: {item.optionQuantity}</p>
					<p>Description: {item.optionDescription}</p>
				</ListGroupItem>
		)
	})
	return (
		<div>
			<ListGroup>
				{options}
			</ListGroup>
		</div>
	)
}

export default DisplayOptions
