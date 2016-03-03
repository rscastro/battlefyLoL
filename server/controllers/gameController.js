/*control db to create new Meal and respond query with all meals
handle data between database and user model*/

//require dependencies
var request = require('request');
module.exports = {

  userinfo: function (req, res, next) {

  var id = req.params.id;
  var url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/'+id+'?api_key=a0373469-acd9-4726-8611-550fd3c64001';
  console.log(url)
  request(url, function (error, response, body) {
      if (error) {
        res.send(error)
      } else {
        res.send(JSON.parse(body))
      }
    });

 
  },

  leagueinfo: function (req, res, next) {

  var id = req.params.id;
  var url = 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/'+id+'/entry?api_key=a0373469-acd9-4726-8611-550fd3c64001';
  console.log(url)
  request(url, function (error, response, body) {
      if (error) {
        res.send(error)
      } else {
        res.send(JSON.parse(body))
      }
    });

 
  },

  championdata: function (req, res, next) {

  var id = req.params.id;
  var url = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+id+'/ranked?api_key=a0373469-acd9-4726-8611-550fd3c64001';
  console.log(url)
  request(url, function (error, response, body) {
      if (error) {
        res.send(error)
      } else {
        res.send(JSON.parse(body))
      }
    });

 
  },

  


 userstats: function (req, res, next) {

  var id = req.params.id;
  var url = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+id+'/recent?api_key=a0373469-acd9-4726-8611-550fd3c64001';
  console.log(url)
  request(url, function (error, response, body) {
      if (error) {
        res.send(error)
      } else {
        res.send(JSON.parse(body))
      }
    });

 
  },

  randomProfile: function (req, res, next) {

   var num = Math.floor(Math.random() * ((590-503)+1) + 503)
   var url = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+id+'/recent?api_key=a0373469-acd9-4726-8611-550fd3c64001';
   console.log(url)
   request(url, function (error, response, body) {
       if (error) {
         res.send(error)
       } else {
         res.send(JSON.parse(body))
       }
     });

  
   },

   championlist: function (req, res, next) {

   var num = Math.floor(Math.random() * ((590-503)+1) + 503)
   var url = 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=a0373469-acd9-4726-8611-550fd3c64001';
   console.log(url)
   request(url, function (error, response, body) {
       if (error) {
         res.send(error)
       } else {
         res.send(JSON.parse(body))
       }
     });

  
   },




};

