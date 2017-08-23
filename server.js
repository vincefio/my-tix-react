//
//
//
//
//
//
//
//
//
//
//
// //Include Server Dependencies
// var express =  require("express");
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
// var logger = require("morgan");
// var session = require("express-session");
//
//
//
//
//
// //passport
// var passport = require("./config/passport");
//
//
//
//
//
//
// // Requiring Models
// var Customer = require('./models/Customer')
// var Event = require("./models/Event")
// var Option = require("./models/Option")
// var User = require("./models/User")
//
// //Creating Express app
//
// var app = express();
// var PORT = process.env.PORT || 3001;
//
// //host static docs
// app.use(express.static("build"));
//  // app.get('/', (req, res) => {
//  // 	console.log('hello')
//  // 	res.json({test: 'hello'})
//  // })
//  //Passport
//  // app.use(session({ secret: "food secret", resave: true, saveUninitialized: true}));
//  app.use(passport.initialize());
//  app.use(passport.session());
//
//
// // Run Morgan for Logging
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//
//
//
// // ------------------------------------------------
//
// // MongoDB configuration (Change this URL to your own DB)
//
// mongoose.promise = Promise
// if (process.env.MONGODB_URI) {
// 	mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds161099.mlab.com:61099/heroku_5fq62n3h")
// } else {
// 	mongoose.connect('mongodb://localhost/myTix2') // local mongo url
// }
// const db = mongoose.connection
// db.on('error', err => {
// 	console.log(`There was an error connecting to the database: ${err}`)
// })
// db.once('open', () => {
// 	console.log('You have successfully connected to your mongo database')
// })
// // -------------------------------------------------
//
// require("./routes/api-routes")(app);
// require("./routes/login-routes")(app);
// require("./routes/customer-api-routes")(app);
// // Starting our express server
// app.listen(PORT, function() {
//   console.log("App listening on PORT: " + PORT);
// });
//
//
//  app.get("/", function(req, res) { res.sendFile(__dirname + "/build/static/index.html"); });
