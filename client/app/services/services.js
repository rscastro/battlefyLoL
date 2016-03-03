angular.module('battlefy.services', [])


.factory('Game', function ($http) {

  var getUser = function (id){
    return $http({
      method: 'GET',
      url: '/api/lolSummoner/' + id
    }); 
  }

  var getLeague = function (id){
    return $http({
      method: 'GET',
      url: '/api/lolLeague/' + id
    }); 
  }
//NEED to call API for list of all champion data to get champion names to make random picture string
  var getRandomChampion = function(callback){
    $http({
      method: 'GET',
      url: '/api/championlist'
    }).then(function(resp){
      var championArray = [];
     // console.log(resp.data)
      for(var elem in resp.data.data){
        //console.log(resp.data.data[elem]);
        championArray.push(resp.data.data[elem])
      }
      callback(championArray)
    }) 

  }

  var userChampionData = function(id, callback){
    $http({
      method: 'GET',
      url: '/api/championdata/'+id
    }).then(function(resp){
     // console.log(resp.data.data)
      
      callback(resp.data)
    }) 

  }

 


  return {
    getUser: getUser,
    getRandomChampion: getRandomChampion,
    getLeague: getLeague,
    userChampionData
  }
}) 


