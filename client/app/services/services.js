angular.module('homecooked.services', [])

.factory('Auth', function ($http, $location, $window, $state) {
  var signin = function (user) {
    return $http.post('/api/users/signin', user)
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('home.cooked');
    // return true;
  };

  var signout = function () {
    $window.localStorage.removeItem('home.cooked');
    $window.localStorage.removeItem('home.cooked.user');
    $state.transitionTo('meals');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})



.factory('Meals', function ($http) {
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/meals'
    });
  };

  var addOne = function (meal) {
    return $http({
      method: 'POST',
      url: '/api/meals',
      data: meal
    });
  }

  return {
    getAll: getAll,
    addOne: addOne
  }
}) 

.factory('Sidebar', function() {
  var showSidebar = function() {
    $('.sideview').animate({
      right: '0px'
    }); 
  };

  var hideSidebar = function() {
    $('.sideview').animate({
      right: '-450px'
    }); 
  }

  return {
    showSidebar: showSidebar,
    hideSidebar: hideSidebar
  }
})
