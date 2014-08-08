'use strict';

angular.module('mean.feed').controller('FeedController', ['$scope', 'Global', 'Feed',
  function($scope, Global, Feed) {
    $scope.global = Global;
    $scope.package = {
      name: 'feed'
    };
  }
]);
