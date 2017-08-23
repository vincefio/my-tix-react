import React from 'react';
import JsBarcode from "jsbarcode"
import axios from "axios"
import domtoimage from "dom-to-image";

class Ticket extends React.Component{

  constructor() {
    super()

    this.state = {
      customer: []
    }
  }

  componentWillMount() {
    var barcode = this.props.barcode

    console.log(barcode)

    axios.get("/ticket/" + barcode)
    .then(function(response) {
      console.log(response) 

      this.setState({
        customer: response.data
      })

      JsBarcode(".barcode", barcode, {
        fontSize: 40,
        background: "#4b8b7f",
        lineColor: "#ffffff",
        margin: 40
      })

    }.bind(this)); 

  }

  handleSubmit = (event) => {
    event.preventDefault() 

    domtoimage.toJpeg(document.getElementById('ticketContainer'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-ticket.jpeg';
        link.href = dataUrl;
        link.click();
    });

  }
  
  render(){

    return(
    <div className="container">

      <div className="row" id="ticketBlock">
        <div className="col-sm-12">
          <ol className="breadcrumb">
            <li className="active">Home</li>
            <li className="active">Purchase</li>
            <li className="active">Ticket</li>
          </ol>
          <div id="ticketContainer">

            <div className="media" id="ticket">
              <div className="media-left">
                <div className="canvas">
                  <div>
                    <h3 className= "logoCanvas">MyTix</h3>
                  </div>
                  <svg className="barcode" alt="barcode"></svg>
                  <div>
                    <p className="copyWriteTicket">&copy; MyTix 2017</p>
                  </div>
                </div>
              </div>
              <div className="media-body" id="mediaBody">
                <h2 className="media-heading" id="eventName">{this.props.name}</h2>
                <h4>{this.props.startDate}</h4>
                <hr />
                <h3>Name: </h3>
                <h4 id="givenName">{this.state.customer.customerName}</h4>
                <hr />
                <h3>Email: </h3>
                <h4 id="givenVenmoEmail">{this.state.customer.customerEmail}</h4>
                <hr />
                <h3>Ticket Option: </h3>
                <h4 id="givenOptionName">{this.state.customer.option}</h4>
                <hr />
                <h3>Quantity: </h3>
                <h4 id="givenQuantity">{this.state.customer.quantitySelect}</h4>
              </div>
            </div>
          </div>
        </div>
        <button id="getTicket" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Download Ticket</button>
      </div>
    </div>
    
    );
  }
}

export default Ticket;