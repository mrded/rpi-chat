var app = angular.module('app', ['ionic']);
var socket = io();

app.controller('PageCtrl', function($scope, $ionicModal, $window) {
  var loginModal;
  
  $scope.username = $window.localStorage['username'];
  $scope.messages = []; 
  $scope.numUsers = 0;

  var _log = function(text) {
    $scope.messages.push({
      type: 'log',
      content: text
    });

    $scope.$apply();
  };

  if ($scope.username) {
    socket.emit('add user', $scope.username);
  }
  else {
    //@TODO: Move pop-up into component.
    $ionicModal.fromTemplateUrl('login.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true,
      backdropClickToClose: false,
      hardwareBackButtonClose: false
    }).then(function(modal) {
      loginModal = modal;
      loginModal.show();
    });
  }
  
  //@TODO: Move into pop-up's controller.
  $scope.login = function(username) {
    //@TODO: Move working with storage into a service.
    $window.localStorage['username'] = username;

    $scope.username = username;
    socket.emit('add user', username);
    loginModal.remove();
  };

  socket.on('login', function(data) {
    console.log('Login', data);
    $scope.numUsers = data.numUsers;

    _log("Welcome! :count participants"
      .replace(':count', data.numUsers))
  });

  socket.on('user joined', function(data) {
    console.log('User joined', data);
    $scope.numUsers = data.numUsers;

    _log("User :user joined".replace(':user', data.username))
  });

  socket.on('user left', function(data) {
    console.log('User left', data);
    $scope.numUsers = data.numUsers;

    _log("User :user left".replace(':user', data.username))
  });

  socket.on('typing', function(data) {
    console.log('Typing', data);
  });

  socket.on('stop typing', function(data) {
    console.log('stop typing', data);
  });

  socket.on('disconnect', function() {
    console.log('You have been disconnected');
  });

  socket.on('reconnect', function() {
    console.log('you have been reconnected');
  });

  socket.on('reconnect_error', function() {
    console.log('attempt to reconnect has failed');
  });

  socket.on('new message', function(data) {
    console.log('new message', data.message);
    $scope.messages.push(data.message);
    $scope.$apply();
  });

  $scope.add = function(content) {
    var message = {
      username: $scope.username,
      type: 'text',
      content: content 
    };

    $scope.messages.push(message);

    socket.emit('new message', message);

    $scope.message = '';
  };
});

