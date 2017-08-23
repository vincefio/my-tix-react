//Include Server Dependencies
var express =  require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var session = require("express-session");
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database

//Creating Express app
var app = express();
var PORT = process.env.PORT || 3001;

//passport
var passport = require("./passport/index.js");

app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)
//app.use is a way to include middleware function
//middleware takes a req, res and either terminates it or does something
 app.use(passport.initialize());
 app.use(passport.session());

// ===== testing middleware =====
app.use(function(req, res, next) {
	console.log('===== passport user =======')
	console.log(req.session)
	console.log(req.user)
	console.log('===== END =======')
	next()
})
// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// Requiring Models
var Customer = require('../models/Customer')
var Event = require("../models/Event")
var Option = require("../models/Option")
var User = require("./db/models/user")

//host static docs
 app.use('/static', express.static("public"));

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// ------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)

mongoose.promise = Promise
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
} else {
	mongoose.createConnection('mongodb://localhost/myTix2') // local mongo url
}
const db = mongoose.connection
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
	console.log('You have successfully connected to your mongo database')
})
// -------------------------------------------------

require("../routes/api-routes")(app);
require("../routes/customer-api-routes")(app);
// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
