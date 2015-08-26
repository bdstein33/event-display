(function() {
  angular.module('eventFactory', ['firebaseRef'])
  .factory('eventFactory', function($http, $state, firebaseRef, $firebaseArray, $firebaseObject) {
    var events = $firebaseArray(firebaseRef.child('events'));

    return {
      // Returns all events which have already been fetched from Firebase
      getEvents: function() {
        return events;
      },
      // Updates an event based on the id contained within the eventData object
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