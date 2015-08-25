(function() {
  angular.module('eventFactory', ['firebaseRef'])
  .factory('eventFactory', function($http, $state, firebaseRef, $firebaseArray, $firebaseObject) {
    var events = $firebaseArray(firebaseRef.child('events'));

    return {
      getEvents: function() {
        return events;
      },
      addEvent: function() {

      },
      updateEvent: function(eventData) {
        var eventObj =  $firebaseObject(firebaseRef.child('events').child(eventData.$id))
        eventObj.$loaded(function() {
          for (var key in eventData) {
            eventObj[key] = eventData[key];
          }
          eventObj.$save();
        })
      }
    };
  });
})();