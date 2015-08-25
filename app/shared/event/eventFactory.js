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
        // Get event from Firebase based on event id
        var eventObj =  $firebaseObject(firebaseRef.child('events').child(eventData.$id));
        eventObj.$loaded(function() {
          // Update values in Firebase with new values based on user change
          for (var key in eventData) {
            eventObj[key] = eventData[key];
          }

          // Save event so the changes persist
          eventObj.$save();
        });
      }
    };
  });
})();