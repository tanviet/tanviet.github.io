'use strict';

angular.module('mean.feed').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('feed example page', {
      url: '/feed/example',
      templateUrl: 'feed/views/index.html'
    });
  }
]);
