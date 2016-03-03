/*create and configure server
connect sever with mongodb*/

//require dependencies
var express = require('express');
var mongoose = require('mongoose');


var app = express();
var db = process.env.MONGOLAB_URI||process.env.MONGOHQ_URL || 'mongodb://localhost/api';
mongoose.connect(db);


// configure server with all the middleware and routes
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

//configure port for deploy and running on localhost
var port = process.env.PORT || 8000;
app.listen(port , function(err, success){
  if(err){
    console.log(err);
  } else {
    console.log('listening on port' + port);
  }

});

module.exports = app;
