(function() {
  angular.module('homeController', [])
  .controller('homeController', function($scope, $firebase, eventData) {
    // Establish  connection to firebase database [MOVE THIS TO SHARED FACTORY]
    $scope.events = eventData;
    // Set date equal to today as a starting value.  This date will represent the active day (if there is one)
    $scope.date = new Date();
    var picker = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'D MMM YYYY',
        bound: false,
        onSelect: function() {
          // When a new date is selected on the calendar, update the active date
          $scope.date = this._d;
          $scope.$apply();
        }
    });

    // These arrays are used to convert day and month numbers into text
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    // This function will cut off the length of an event's occasion if it is too long
    $scope.displayOccasion = function(occasion) {
      if (occasion.length > 60) {
        return occasion.slice(0, 60) + "...";
      } else {
        return occasion;
      }
    };

    // activeTab is used to toggle between the different order/filter options when users click on the top nav bar
    $scope.activeTab = "upcoming";

    // dataSort object contains the different order/filter options that are toggled between by changing activeTab
    $scope.dataSort = {
      // Shows all events in order of occurance that aren't cancelled that have a date greater than or equal to today
      "upcoming": { // NEEDS TO BE FIXED!!!!!!!!
        order: ['year','month', 'day'],
        filter: {'cancelled': '!true'}
      },
      // Shows all events in order of invite count that aren't cancelled that have a date greater than or equal to today
      "popular": { // NEEDS TO BE FIXED!!!!!!!!
        order: '-invited_count',
        filter: {'cancelled': '!true'}
      },
      // Shows all events that aren't cancelled that have a date less than today
      "completed": {
        order: ['year','month', 'day'],
        filter: {'cancelled': '!true'}
      },
      // Shows all cancelled events in order of earliest to latest
      "cancelled": {
        order: ['year','month', 'day'],
        filter: {'cancelled': 'true'}
      }
    };

    // Updates activeTab when user clicks on the top nav bar
    $scope.updateList = function(activeTab) {
      $scope.activeTab = activeTab;
    };



    // Filters used to sort events

    // All events on a specific day && not cancelled SORTED BY date

    // All events on a specific day && not cancelled SORTED BY invited

    // All events after a specific day && not cancelled

    // All cancelled events

    $('body').on('click', '.top-bar-link', function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
    });

  });
})();