(function() {
  angular.module('eventFactory', ['firebaseRef'])
  .factory('eventFactory', function($http, $state, firebaseRef, $firebaseArray) {
    var events = $firebaseArray(firebaseRef.child('events'));

    return {
      getEvents: function() {
        return events;
      },
      getEvent: function(eventId) {
      },
      addEvent: function() {

      },
      removeEvent: function(eventId) {

      },
      updateEvent: function(eventId) {

      }
    };
  });
})();