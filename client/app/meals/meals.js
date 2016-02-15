angular.module('homecooked.meals', [
  'homecooked.services'
])
.controller('MealsController', function (Meals) {
  var me = this;

  this.makeActive = function(meal) {
    meal.isActive = true;
  };

  this.makeInactive = function(meal) {
    meal.isActive = false;
  };

  this.initialize = function() {
    this.getMeals();
  };

  this.getMeals = function() {
    return Meals.getAll().then(function (resp) {
      me.meals = resp.data;
      return resp.data;
    });
  };

})

.controller('CookController', function ($scope, $location, Meals, Sidebar) {
  var me = this;
  $scope.meal = {};

  $scope.initialize = function() {
    Sidebar.showSidebar();
  };
  $scope.hideSideview = function() {
    Sidebar.hideSidebar();
  };

  $scope.submitHandler = function(meal) {
    Meals.addOne($scope.meal).then(function () {
      $location.path('/');
    });
  };

  $scope.initialize();
})

.controller('DetailsController', function ($scope, Sidebar, $stateParams, Meals) {
  $scope.meal = {};

  $scope.initialize = function() {
    Meals.getAll().then(function (resp) {
      console.log(resp.data);
      $scope.meal = _.find(resp.data, function (meal) {
        return $stateParams.mealid === meal._id;
      })
      return $scope.meal.user;
    })
    .then(function (user) {
    });
    Sidebar.showSidebar();
  };

  $scope.hideSideview = function() {
    Sidebar.hideSidebar();
  };

  $scope.initialize();
})
