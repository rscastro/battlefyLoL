angular.module('homecooked', [
  'homecooked.meals',
  'homecooked.auth',
  'ui.router'
])
.constant('_', window._)
.constant('$', window.$)
.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/meals');
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('meals', {
          url: '/meals',
          views: {
            "master": {
              templateUrl: 'app/meals/meals.html',
              controller: 'MealsController',
            },
          },
          // authenticate: true
        })
        
        .state('meals.signin', {
          url: '/signin',
          views: {
            "sideview@": {
              templateUrl: 'app/auth/signin.html',
              controller: 'AuthController'
            }
          },
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/auth/signin.html',
            controller: 'AuthController'
        })

        .state('meals.signup', {
          url: '/signup', 
          views: {
            "sideview@": {
                templateUrl: 'app/auth/signup.html',
                controller: 'AuthController'
            }
          }
        })

        .state('meals.cook', {
            url: '/cook',
            views: {
              "sideview@": {
                templateUrl: 'app/meals/create.html',
                controller: 'CookController'
              }
            },
            authenticate: true
        })

        .state('meals.details', {
            url: '/details/:mealid',
            views: {
              "sideview@": {
                templateUrl: 'app/meals/details.html',
                controller: 'DetailsController'
              }
            },
            authenticate: true
        })

        .state('logout', {
            url: '/logout',
            views: {
              "sideview@": {
                 templateUrl: 'app/auth/signin.html',
                controller: 'AuthController'
              }
            },
           
        })
})

// attach tokens to requests
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('home.cooked');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
// run authentication checks on each change in state
.run(function ($rootScope, $state, $location, Auth) {
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !Auth.isAuth()) {
      $state.transitionTo('meals.signin');
      evt.preventDefault();
    }
  });
});
