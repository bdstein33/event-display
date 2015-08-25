(function() {
  angular.module('homeController', [])
  .controller('homeController', function($scope, $firebase, eventData, eventFactory) {

    ///////////////////////////////////////
    /// INITIALIZATINO DATA
    ///////////////////////////////////////

    // Establish  connection to firebase database [MOVE THIS TO SHARED FACTORY]
    $scope.events = eventData;

    // These arrays are used to convert day and month numbers into text
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $scope.today = new Date();
    $scope.today.setHours(0,0,0,0);

    ///////////////////////////////////////
    /// LEFT COLUMN FUNCTIONALITY
    ///////////////////////////////////////

    // Set date equal to today as a starting value.  This date will represent the active day (if there is one)

    $scope.date = $scope.today;
    var mainDate = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'D MMM YYYY',
        bound: false,
        onSelect: function() {
          // When a new date is selected on the calendar, update the active date
          $scope.date = this._d;
          $scope.$apply();
        }
    });

    // Returns true if event is today;
    $scope.todayEvent = function(event) {
      return event.month === $scope.date.getMonth()
          && event.day === $scope.date.getDate()
          && event.year === $scope.date.getFullYear();
    };

    ///////////////////////////////////////
    /// MAIN CONTENT FUNCTIONALITY
    ///////////////////////////////////////

    // activeTab is used to toggle between the different order/filter options when users click on the top nav bar
    $scope.activeTab = "upcoming";

    // Updates activeTab when user clicks on the top nav bar
    $scope.updateList = function(activeTab) {
      // Adjusts the active class 
      $('.active').removeClass('active');
      $('.' + activeTab).addClass('active');

      $scope.activeTab = activeTab;
    };

    // This function will cut off the length of an event's occasion if it is too long
    $scope.displayOccasion = function(occasion) {
      if (occasion.length > 60) {
        return occasion.slice(0, 60) + "...";
      } else {
        return occasion;
      }
    };

    // dataSort object contains the different order/filter options that are toggled between by changing activeTab
    $scope.dataSort = {
      // Shows all events in order of occurance that aren't cancelled that have a date greater than or equal to today
      "upcoming": { 
        order: ['year','month', 'day'],
        filter: {'cancelled': '!true'}
      },
      // Shows all events in order of invite count that aren't cancelled that have a date greater than or equal to today
      "popular": {
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
        // Add one to month to account for the fact that we store months starting at 0
        var eventDate = new Date(event.month + 1 + "/" + event.day + "/" + event.year);
        return eventDate >= $scope.today;
      } else if ($scope.activeTab === "completed") {
        var eventDate = new Date(event.month + 1 + "/" + event.day + "/" + event.year);
        return eventDate < $scope.today;
      } else {
        return true;
      }
    };

    ///////////////////////////////////////
    /// EDIT EVENT FUNCTIONALITY
    ///////////////////////////////////////

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

    ///////////////////////////////////////
    /// NEW EVENT FUNCTIONALITY
    ///////////////////////////////////////

    // Set initial values for scope variables related to creating new events
    $scope.newEventButtonText = "NEW EVENT";
    $scope.errorText = "";
    $scope.newEventDate = new Date();

    var newEventDate = new Pikaday({
        field: document.getElementById('new-event-calendar'),
        format: 'D MMM YYYY',
        bound: false,
        onSelect: function() {
          // When a new date is selected on the calendar, update the active date
          $scope.newEventDate = this._d;
        }
    });

    // Manually adjust position of the new event calendar so that it isn't blocked by Intercom functionality
    $('.new-event-form-container').find('.pika-single').css({
      'bottom': '230px',
      'padding-bottom': '20px',
      'border-bottom': '1px solid #8d93be'
    });

    // Toggles the new event form in and out 
    $scope.toggleEventForm = function() {
      if ($('body').css('margin-left') === '0px') {
        $('body').animate({
          'margin-left': '-320px'
        }, 300);


        $('.new-event-form-container').animate({
          'right': '0px'
        }, 300);
        $scope.newEventButtonText = "CANCEL";
      } else {
        $('body').animate({
          'margin-left': '0px'
        }, 300);

        $('.new-event-form-container').animate({
          'right': '-320px'
        }, 300);

        // If cancelled or closed after submission, clear field values
        $scope.newEventButtonText = "NEW EVENT";
        $scope.newEventOccasion = "";
        $scope.newEventInvitedCount = 0;
        $scope.errorText = "";
      }
    };

    // Create new events with data from fields
    $scope.createNewEvent = function() {
      // Make sure occassion and invited count are valid 
      if ($scope.newEventOccasion === undefined || $scope.newEventOccasion === "") {
        $scope.errorText = "Please enter the occasion!";
      } else if ($scope.newEventInvitedCount === undefined || $scope.newEventInvitedCount < 0) {
        $scope.errorText = "Please enter a valid invite count!";
      } else {
        // Reset errorText if there are no errors
        $scope.errorText = "";
      }

      // Create new object and add it to events array
      if ($scope.errorText === "") {
        var newEvent = {
          occasion: $scope.newEventOccasion,
          invited_count: $scope.newEventInvitedCount || 0,
          day: $scope.newEventDate.getDate(),
          month: $scope.newEventDate.getMonth(),
          year: $scope.newEventDate.getFullYear(),
          cancelled: false
        };

        $scope.events.$add(newEvent);
        $scope.toggleEventForm();
      } 
    };

    // Remove popups when clicked
    $('.popup').on('click', function() {
      $(this).remove();
    });
  });
})();