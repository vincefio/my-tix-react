import React from 'react';
import axios from "axios"; 

class Purchase extends React.Component{

  constructor() {
    super()

    this.state = {
      number: 2,
      quantitySelect: "",
      option: "",
      attended: true,
      customerName: "",
      customerEmail: "",
      barcode: "",
      customer: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOptionSelect(event) {
    this.setState({
      option: event.target.key
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var num1 = Math.floor(Math.random()*10);
    var num2 = Math.floor(Math.random()*10);
    var num3 = Math.floor(Math.random()*10);
    var num4 = Math.floor(Math.random()*10);
    var num5 = Math.floor(Math.random()*10);
    var num6 = Math.floor(Math.random()*10);
    var num7 = Math.floor(Math.random()*10);
    var num8 = Math.floor(Math.random()*10);
    var num9 = Math.floor(Math.random()*10);
    var num10 = Math.floor(Math.random()*10);
    var num11 = Math.floor(Math.random()*10);
    var num12 = Math.floor(Math.random()*10);

    var theBarcode = num1.toString() 
                + num2.toString() 
                + num3.toString() 
                + num4.toString() 
                + num5.toString() 
                + num6.toString() 
                + num7.toString() 
                + num8.toString() 
                + num9.toString() 
                + num10.toString() 
                + num11.toString() 
                + num12.toString()

    this.setState({
      barcode: theBarcode
    })

    if (this.state.quantitySelect === "" || this.state.option === "" || this.state.customerName === "" || this.state.customerEmail === "") {

      document.getElementById("purchaseInfo").classList.remove('panel-primary');
      document.getElementById("purchaseInfo").classList.add('panel-danger');
      var warn = document.getElementById("warn")
      warn.style.display = "block"

    } 
    else {
      console.log("hit else")

      console.log(this.props._id)

      axios.post("/api/customer/" + this.props._id, {
        event: this.props._id, 
        quantitySelect: this.state.quantitySelect,
        option: this.state.option,
        attended: this.state.attended,
        customerName: this.state.customerName,
        customerEmail: this.state.customerEmail,
        barcode: theBarcode
      })
      .then(response => {
        console.log(response.data)
        this.setState({
          customer: response.data,
          barcode: theBarcode
        })
      })
      this.props.setBarcode(theBarcode)
      
      this.props.setView(this.state.number);
    }
  }
 
  render(){

    const allItems = this.props.option.map(item => { 

      return (
        
        <li key={item._id}>
            <div className="list-group-item">
              <h4 className="list-group-item-heading" 
                name="optionName">{item.optionName}</h4>
              <p className="list-group-item-text">{item.optionDescription}</p>
              <p className="list-group-item-text" 
                name="optionPrice">$ {item.optionPrice}</p>
            </div>
        </li>
        
      )
    })

    const Selector = this.props.option.map(item => {

      return (
        <option key={item._id} value={item.optionName}>{item.optionName}</option>
      )

    })

    return(
    <div className="container">
      
      <div className="row" id="purchaseBlock">
        <div className="col-sm-12">
          <ol className="breadcrumb">
            <li><a href="" id="homeBreadcrumb">Home</a></li>
            <li className="active">Purchase</li>
          </ol>
          {/*<!-- end ol -->*/}
          <div className="jumbotron">
            <h2 id="jumboIntro">You're on your way too</h2>
            <h3 id="jumboTitle">{this.props.name}</h3>
            <hr /> 
            <p>
              <em>Please fill out the information below</em>
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title text-center">Ticket Options</h3>
                </div>
                <div className="panel-body">
                  <form>
                    <ol>
                      {allItems}
                    </ol>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="panel panel-primary" id="purchaseInfo">
                <div className="panel-heading">
                  <h3 className="panel-title text-center">Purchase Information</h3>
                </div>
                <div className="panel-body">
                  <div className="personalInfo">
                    <label htmlFor="name">Full Legal Name: </label>
                    <input id="name" 
                      type="text"
                      name="customerName"
                      value={this.state.customerName}
                      onChange={this.handleChange}
                    />
                    <br /><br />
                    <label htmlFor="email">Venmo Email: </label>
                    <input id="email" 
                      type="email" 
                      name="customerEmail"
                      value={this.state.customerEmail}
                      onChange={this.handleChange}
                    />
                    <br /><br />
                    <form>
                      <label htmlFor="option">Ticket Option:</label>
                      <select id="option" name="option" onClick={this.handleChange}>
                        <option></option>
                        {Selector}
                      </select>
                    </form>
                      <br />
                    <form>
                      <label htmlFor="quantitySelect">Quantity: </label>
                      <input type="number" min="0" id="labels" 
                        name="quantitySelect" 
                        value={this.state.quantitySelect}
                        onChange={this.handleChange} 
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="warn" className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title text-center">Missing Required Information</h3>
            </div>
          </div>
          <button id="submitPayment" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Complete Payment</button>
        </div>
      </div>

    </div>
    
    );
  }
}

export default Purchase