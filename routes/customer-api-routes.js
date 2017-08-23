
var Customer = require("../models/Customer");
var Event = require("../models/Event");

module.exports = function(app) {

  app.get("/events/:id", function(req, res) {
    console.log("message hit")
   Event.findOne({
    "_id": req.params.id
   }).exec(function(err, doc){
      if (err) {
        console.log(err)
      }
      else {
        res.json(doc)
      }
    });
  });

 // Create a new note or replace an existing note
  app.post("/api/customer/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    var newCustomer = new Customer(req.body);

    // And save the new note the db
    newCustomer.save(function(error, doc) {
      // Log any errors
      console.log(doc)

      if (error) {
        console.log(error);
      }
      // Otherwise
      else {
        // Use the article id to find and update it's note
        Event.findOneAndUpdate({ "_id": req.params.id }, { $push: { "Customer": doc }}, { new: true })
        // Execute the above query
        .exec(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          else {

            res.json(doc)
          }
        });
      }
    });
  });

  app.get("/ticket/:barcode", function(req, res) {
    console.log("ticket route hit")
    Customer.findOne({
      "barcode": req.params.barcode
    }).exec(function(err, doc) {
      if (err) {
        console.log(err)
      }
      else {
        res.json(doc)
      }
    })
  })

}
