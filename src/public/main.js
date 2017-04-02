var app = angular.module('app', ['ionic']);
var socket = io();

app.controller('PageCtrl', function($scope) {
  $scope.messages = []; 
  $scope.numUsers = 0;

  socket.emit('add user', 'mrded');

  socket.on('login', function(data) {
    console.log('Login', data);
    $scope.numUsers = data.numUsers;
  });

  socket.on('user joined', function(data) {
    console.log('User joined', data);
    $scope.numUsers = data.numUsers;
  });

  socket.on('user left', function(data) {
    console.log('User left', data);
    $scope.numUsers = data.numUsers;
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
    console.log('new message', data);
    $scope.messages.push(data);
  });

  $scope.add = function(message) {
    var data = {
      username: 'mrded',
      message: {
        type: 'text',
        content: message 
      }
    };

    $scope.messages.push(data);

    socket.emit('new message', data.message);

    $scope.message = '';
  };
});

