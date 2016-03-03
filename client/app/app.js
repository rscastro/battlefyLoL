angular.module('battlefy', [
  'battlefy.main',
  'ui.router'
])
.constant('_', window._)
.constant('$', window.$)
.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('home', {
          url: '/home',
          views: {
            "master": {
              templateUrl: 'app/home/home.html',
              controller: 'MainController',
            },
          },
          // authenticate: true
        })
        
       
})

