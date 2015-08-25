(function() {
  angular.module('intercom', [
    // Angular libaries
    'ui.router',
    'firebase',

    // Componenets
    'homeController',

    // 'landingController',
    // 'loginController',

    // Shared
    'firebaseRef',
    'eventFactory',
    'eventDirective'
  ])
  .config(config)
  .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];


  function config($stateProvider, $urlRouterProvider, $locationProvider, $state) {

    // Default to index view if the URL loaded is not found
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          content: {
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController'
          }
        },
        resolve: {
          eventData: function($rootScope, $q, eventFactory) {
            var deferred = $q.defer();
            deferred.resolve(eventFactory.getEvents());
            return deferred.promise;
          }
        }
      });
  }

  function run($rootScope, $state, $location) {
    window.Intercom('boot', {
       app_id: 'yb37ygtj',
       email: 'john@smith.com',
       user_id: 'abc123',
       created_at: 1234567890,
       widget: {
          activator: '#IntercomDefaultWidget'
       }  
    });

    // window.Intercom('update');
    
  }
})();