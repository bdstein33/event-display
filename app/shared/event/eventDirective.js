(function() {
  'use strict';

  angular.module('eventDirective', [])

  .directive('event', function() {
    return {
      restrict: "E",
      templateUrl: "app/shared/event/eventDirective.html",
      scope: {
        data: '='
      }
    };
  });
 

})();