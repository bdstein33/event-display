(function() {
  angular.module('homeController', [])
  // .filter('upcomingEvent', function(event){
  //     var today = new Date();
  //     var eventDate = new Date(event.month + "/" + event.day + "/" + event.year);
  //     return eventDate >= $scope.today;
  // })
  .controller('homeController', function($scope, $firebase, eventData, eventFactory) {
    // Establish  connection to firebase database [MOVE THIS TO SHARED FACTORY]
    $scope.events = eventData;

    // Set date equal to today as a starting value.  This date will represent the active day (if there is one)
    $scope.today = new Date();
    $scope.date = $scope.today;
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

    // Updates activeTab when user clicks on the top nav bar
    $scope.updateList = function(activeTab) {
      $scope.activeTab = activeTab;
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

    // This is a filter used to determine which events should be shown 
    $scope.dateFilter = function(event) {
      if ($scope.activeTab === "upcoming") {
        var eventDate = new Date(event.month + "/" + event.day + "/" + event.year);
        return eventDate >= $scope.today;
      } else if ($scope.activeTab === "completed") {
        var eventDate = new Date(event.month + "/" + event.day + "/" + event.year);
        return eventDate < $scope.today;
      } else {
        return true;
      }
    };

    // Toggle cancel status of event
    $scope.toggleCancel = function() {
      this.event.cancelled = !this.event.cancelled;
      eventFactory.updateEvent(this.event);
    };

    // Increases invite count of event by one
    $scope.addInvite = function() {
      this.event.invited_count++;
      eventFactory.updateEvent(this.event);
    };



    $('body').on('click', '.top-bar-link', function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
    });

    // var underlineDatesWithEvents = function() {
    //   var testDate = ['19', '7', '2015'];
    //   $('.pika-day').each(function() {
    //     if ($(this).attr('data-pika-day') === testDate[0] || $(this).attr('data-pika-day') === '20'
    //     && $(this).attr('data-pika-month') === testDate[1]
    //     && $(this).attr('data-pika-year') === testDate[2]) {
    //       $(this).addClass('has-event');
    //     } else {
    //     }
    //   });
    // };

    // underlineDatesWithEvents();

    // var newEvent = {
    //   cancelled: false,
    //   day: 5,
    //   month: 9,
    //   year: 2015,
    //   invited_count: 20,
    //   occasion: "Test event"
    // };

    // $scope.events.$add(newEvent);

  });
})();