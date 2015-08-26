(function() {
  angular.module('firebaseRef', [])
  .factory('firebaseRef', function($http, $state) {
    // Establishes connection to Firebase
    var ref = new Firebase("https://intercom-app.firebaseio.com");
    return ref;
  });
})();