import React from 'react';

class Main extends React.Component{

  constructor() {
    super()

    this.state = {
      number: 1
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setView(this.state.number);
  }

  render(){
    return(
      <div className="container">
        <div className="row" id="mainBlock">
          <div className="col-sm-12">
            <ol className="breadcrumb">
              <li className="active">Home</li>
            </ol>
            {/*<!-- end ol -->*/}
            <br /><br />
            <div className="info">
              <div className="media">
                <div className="media-left">
                  <img className="media-object" id="posterEvent" src={this.props.picture} alt="event" />
                </div>
                <div className="media-body" id="mediaStuff">
                  <h4 className= "media-heading eventHeading" id="mediaContent">{this.props.name}</h4>
                  <p className="descriptionBody" id="mediaContent">{this.props.desc}</p>
                  <p className="location">{this.props.location}</p>
                  <p className="startDate">{this.props.start}</p>
                  <p className="endDate">{this.props.end}</p>
                </div>
              </div>
              <br /><br />
              <button id="purchaseNow" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Purchase Now!</button>
            </div>
            {/*<!-- end info -->*/}
          </div>
         { /*<!-- end mainBlock -->*/}
        </div>
      </div>
    
    );
  }
}

export default Main;