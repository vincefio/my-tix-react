// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var CustomerSchema = require("./Customer")

var OptionSchema = require("./Option")

var user = require("../server/db/models/user")

var Schema = mongoose.Schema;

var EventSchema = new Schema({

  Name: {
    type: String,
    required: true
  },

  StartDate: {
    type: Date,
  },

  EndDate: {
    type: Date, //use moment.js

  },

  picture: {
    type: String
  },

  location: {
    type: String,
    required: true
  },

  venderVenmoEmail: {
    type: String,
    // required: true
  },

  User: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  Option: [],

  Customer: []

});

// Create the Model
var Event = mongoose.model("Event", EventSchema);

// Export it for use elsewhere
module.exports = Event;
