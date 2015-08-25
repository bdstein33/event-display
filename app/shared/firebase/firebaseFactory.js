(function() {
  angular.module('firebaseRef', [])
  .factory('firebaseRef', function($http, $state) {
    var ref = new Firebase("https://intercom-app.firebaseio.com");
    return ref;
  });
})();