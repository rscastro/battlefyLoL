angular.module('battlefy.main', [
  'battlefy.services'
])
.controller('MainController', function (Game) {
  var me = this;

  this.tester = 19;
  this.currentUserId = '';
  this.noUser = true;
  this.profileShow = false;
  this.predicate = '';

  this.lolUser = function(){
    me.currentUserId = me.search;
    return Game.getUser(me.search).then(function (resp){
      if(!resp.data[me.currentUserId]){
        me.userInfo = {};
        me.noUser = false;
        me.leagueinfoleague = {}
        me.leagueinfodivision = {}
        me.profileShow = false;
      }
      else{
        me.profileShow = true;
        me.noUser = true;
        Game.getRandomChampion(function(arr){
          Math.floor(Math.random()*arr.length)
          me.randomChampion = arr[Math.floor(Math.random()*arr.length)]['name'];
        })
        Game.getLeague(me.search).then(function(league){
          me.leagueinfoleague = league.data[me.currentUserId][0]['tier'];
          me.leagueinfodivision =league.data[me.currentUserId][0]['entries'][0]['division']
          console.log(me.leagueinfoleague, me.leagueinfodivision)
        })

        me.populateProfile(me.search);

        me.userInfo = resp.data[me.currentUserId];
        var level = me.userInfo['summonerLevel'] 
        me.userInfo['summonerLevel'] = ' Summoner Level: ' + level;
        me.randomProfilePicture = Math.floor(Math.random() * ((590-503)+1) + 503);
        return resp.data;
        
      }
    })
  }

  this.populateProfile = function(userId){
    Game.userChampionData(userId, function(data){
      Game.getRandomChampion(function(champList){
        me.userChampionList = data['champions'].map(function(elem){
          var champId = elem['id'];
          for(var i = 0;i<champList.length;i++){
            if(champList[i]['id'] === champId){
              elem.champName = champList[i]['name'];
              return elem
            }
          }
        }).filter(function(trueElem){
          return trueElem !=undefined;
        })
        me.calculateAverages(me.userChampionList);
      })
    });

  };

  this.calculateAverages = function(arr){
    me.averages = {};
    arr.forEach(function(elem){
      if(elem){
        for(var hero in elem['stats']){
        if(!me.averages[hero]){
          me.averages[hero]=0;
        }
        me.averages[hero] += elem['stats'][hero]
      }
      }
      
    })
    for(var prop in me.averages){
      me.averages[prop] = (me.averages[prop]/arr.length).toFixed(2);
    }
    console.log(me.averages)
  };

  this.order = function(pred){
    if(pred === 'physical'){
      me.userChampionList.sort(function(a,b){
        return b['stats']['totalPhysicalDamageDealt'] - a['stats']['totalPhysicalDamageDealt']
      })
    }
    else if(pred === 'magic'){
      me.userChampionList.sort(function(a,b){
        return b['stats']['totalMagicDamageDealt'] - a['stats']['totalMagicDamageDealt']
      })
    }
    else if(pred === 'assists'){
      me.userChampionList.sort(function(a,b){
        return b['stats']['totalAssists'] - a['stats']['totalAssists']
      })
    }
  };
 

})




