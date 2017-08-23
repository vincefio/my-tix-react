// Requiring Path and Models
var path = require("path");
var app = require("express")
var Event = require("../models/Event")
var Option = require("../models/Option")
var User = require("../server/db/models/user")
var Customer = require("../models/Customer")
var moment = require("moment")

module.exports = function(app) {

  var today = moment().startOf('day')

  app.post("/api/newOption", function(req, res) {
    var entry = new Option(req.body);

    entry.save(function(err, doc) {
      if (err) {
        console.log(err// Or log the doc
        );
      } else {
        console.log(doc);
      }
      res.json(doc)
    })
  })

  app.post("/api/newEvent", function(req, res) {
    var entry = new Event(req.body);
    entry.save(function(err, doc) {
      if (err) {
        console.log(err// Or log the doc
        );
      } else {
        console.log(doc);
      }
    })
  })

  app.get("/api/currentEvents/:user", function(req, res) {
    Event.find({
      "User": req.params.user,
      "StartDate": {
        $gte: today.toDate()
      }
    }).exec(function(err, doc) {

      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    })
  })

  app.get("/api/pastEvents/:user", function(req, res) {

    Event.find({
      "User": req.params.user,
      "StartDate": {
        $lte: today.toDate()
      }
    }).exec(function(err, doc) {

      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    })
  })

  app.post("/api/Events/:id", function(req, res) {
    console.log(req)
    Event.findByIdAndUpdate({
      "_id": req.params.id

    }, {
      $set: {
        Name: req.body.Name,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        picture: req.body.picture
      }
    }).exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    })
  })

  app.post("/api/Option/:id", function(req, res) {
    Option.findByIdAndUpdate({
      "_id": req.params.id
    }, {
      $set: {
        optionName: req.body.optionName,
        optionPrice: req.body.optionPrice,
        optionQuantity: req.body.optionQuantity,
        optionLocatin: req.body.optionLocation,
        optionDescription: req.body.optionDescription
      }
    }).exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    })
  })

  //Barcode scanning route
  app.get("/api/barcode/:barcode", function(req, res) {
    var barcode = parseInt(req.params.barcode);
    // var objBarcode = {barcode: barcode}
    console.log("In API barcode " + barcode);
    // Is it in the database, if so run this function
    Customer.findOne({barcode: barcode}).exec(function(err, doc) {
      console.log("In api barcode, after Customer.find.exec Doc");
      console.log(doc);
      console.log(doc.attended);
      var attended = doc.attended;
      if (err)
        throw err

      else if (doc.attended) {
        console.log("In else if before 2nd query");
        Customer.findOneAndUpdate({
          barcode: barcode
        }, {
          $set: {
            attended: false
          }
        }, function(err, doc) {
          if (err)
            throw err;
          else {
            console.log("Updated");
            res.send("Valid Ticket. Enjoy the show.");
          }
        });
      } else {
        res.send("Ticket is not valid.");
      }
    }) // End of Customer.find
  }) // End of app.get

  // Route for the event data query grabs from $('#inputForData') input field in index.html
  app.get("/api/eventSearch/:event", function(req, res) {
    console.log(req.params.event);
    Event.find({Name: req.params.event}).exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    })
  })

}
