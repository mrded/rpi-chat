var app = angular.module('starter', ['ionic']);

app.controller('PageCtrl', function($scope, $rootScope) {
  var messageOptions = [
    { content: '<p>Wow, this is really something huh?</p>' },
    { content: '<p>Yea, it\'s pretty sweet</p>' },
    { content: '<p>I think I like Ionic more than I like ice cream!</p>' },
    { content: '<p>Gee wiz, this is something special.</p>' },
    { content: '<p>Is this magic?</p>' },
    { content: '<p>Am I dreaming?</p>' },
    { content: '<p>Yea, it\'s pretty sweet</p>' },
    { content: '<p>I think I like Ionic more than I like ice cream!</p>' },
  ];

  var messageIter = 0;

  $scope.messages = messageOptions.slice(0, messageOptions.length);

  $scope.add = function() {
    var nextMessage = messageOptions[messageIter++ % messageOptions.length];
    $scope.messages.push(angular.extend({}, nextMessage));
  };
});

