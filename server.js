const http = require('http');
const bodyParser = require('body-parser'); //translates everything into the same language so back and front can easily communicate
const express = require('express');

var app = express();
var PORT = process.env.PORT || 3000


//console.log(app);

//app.use(express.static(__dirname + '/public'));

//extended allows the choice between parsing the URL-encoded data with the querystring library (when false)
//or the qs library (when true).
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

//requires the api routes files
//passing express into the modules function in htmlRoutes.js & apiRoutes.js using (app)
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
