var app = angular.module('app', ['ionic']);

app.controller('PageCtrl', function($scope) {
  $scope.messages = []; 

  $scope.add = function(message) {
    $scope.messages.push({
      type: 'text',
      content: message 
    });

    $scope.message = '';
  };
});

