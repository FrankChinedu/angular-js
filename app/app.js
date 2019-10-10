var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller:  'NinjaController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });
}]);

myApp.directive('randomFood', [function(){
  return {
    restrict: 'E', //E: only used as an elemenet
    // A only as an attribute EA element and attribute
    scope: { // isolate scope directives scope
      foods: '=',
      title: '=',
    },
    transclude: true,
    replace: true,
    templateUrl: 'directives/random-foods.html',
    controller: function($scope) {
      $scope.random = Math.floor(Math.random() * 4);
    }
  };
}]);

myApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {
  $scope.message = 'hey yall';
  $scope.removeFood = function (food) {
    const index = $scope.foods.indexOf(food);
    $scope.foods.splice(index, 1);
  };

  // console.log('herer', $scope);

  $scope.addFood = function() {
    $scope.foods.push({
      name: $scope.newFood.name,
      color: $scope.newFood.color,
      price: parseInt($scope.newFood.price),
      availability: true
    });

    $scope.newFood.name='';
    $scope.newFood.color='';
    $scope.newFood.price = '';
  };

  $http.get('data/foods.json').then(function(data){
    $scope.foods = data.data;
  }).catch(function(e) {
    console.log('===', e);
  });
}]);
