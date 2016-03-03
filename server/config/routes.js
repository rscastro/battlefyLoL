/*routes to handle every restful api requests from client */

var gameController = require('../controllers/gameController.js');
console.log(gameController)
var helpers = require('./helpers.js');

module.exports = function (app, express) {

  //handle get and post request from client and pass them to controller
  //for users

  app.get('/api/lolSummoner/:id', gameController.userinfo);
  app.get('/api/lolLeague/:id', gameController.leagueinfo);
  app.get('/api/championdata/:id', gameController.championdata);



  app.get('/api/lolSummonerStats/:id', gameController.userstats);
  app.get('/api/randomProfile', gameController.randomProfile);
  app.get('/api/championlist', gameController.championlist);




  

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

