angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])//We create a module named starter and inject ionic, starter.controllers and starter.services as dependencies.
 
.run(function($ionicPlatform, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() { //Inside the  $ionicPlatform.ready() we config the keyboard and status bar.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
 
    $rootScope.toggle = function(text, timeout) {//We are building an API to work with the  $ionicLoading  API.
      $rootScope.show(text);
 
      setTimeout(function() {
        $rootScope.hide();
      }, (timeout || 1000));
    };
 
    $rootScope.show = function(text) { //We are building an API to work with the  $ionicLoading  API.
      $ionicLoading.show({
        template: text
      });
    };
 
    $rootScope.hide = function() { //We are building an API to work with the  $ionicLoading  API.
      $ionicLoading.hide();
    };
  });
})
 
.config(function($stateProvider, $urlRouterProvider) { //We configure the router
  $stateProvider
 
    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
 
 
  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
 
  $urlRouterProvider.otherwise('/app/browse');
});


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

/*
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
*/