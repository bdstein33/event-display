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
    // var email = prompt("What's your email?");
    // window.Intercom('boot', {
    //    app_id: 'yb37ygtj',
    //    email: email,
    //    user_id: email,
    //    created_at: new Date(),
    //    widget: {
    //       activator: '#IntercomDefaultWidget'
    //    }  
    // });

    // window.Intercom('update');
    
  }
})();