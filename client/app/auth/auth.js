angular.module('homecooked.auth', [])

.controller('AuthController', function ($scope, $location, $window, Auth, $state, Sidebar) {

  $scope.user = {};
  $scope.validUser = true;
  $scope.tries = 6;
  $scope.lockedOut = true;
  $scope.alreadyExists = false;

  $scope.initialize = function() {
    Sidebar.showSidebar();
  }
  $scope.hideSideview = function() {
    Sidebar.hideSidebar();
  }
  $scope.signup = function () {
  	Auth.signup($scope.user).then(function afterSignup(token){
  		$scope.alreadyExists = false;
  		$window.localStorage.setItem('home.cooked', token);
      $window.localStorage.setItem('home.cooked.user', $scope.user.username);
      $state.transitionTo('meals');
  	})
  	.catch(function yolo(err){
  		$scope.alreadyExists = true;
  	})
  };
  $scope.signin = function () {
  	Auth.signin($scope.user).then(function afterSignin(token){
  		$window.localStorage.setItem('home.cooked', token);
      $window.localStorage.setItem('home.cooked.user', $scope.user.username);
      $state.transitionTo('meals');
  	}).catch(function(err){
  		$scope.validUser = false;
  		$scope.tries += -1;
  		if($scope.tries === 0){
  		  $scope.lockedOut = false;
  		}
  	});
  };
  if ($location.$$path === '/logout'){
    Auth.signout();
  }

  $scope.initialize();
});
