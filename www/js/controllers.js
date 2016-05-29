angular.module('starter.controllers', [])
 
.controller('AppCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.player = function() {
    $rootScope.player();
  }
}])
 
.controller('BrowseCtrl', ['$window', '$ionicPlatform', '$rootScope', '$scope', '$ionicScrollDelegate', 'AudioService', '$ionicModal',
  function($window, $ionicPlatform, $rootScope, $scope, $ionicScrollDelegate, AudioService, $ionicModal) {
    $scope.files = [];
	//When the application launches, the BrowseCtrl is invoked. 
	//Here, we initialize the player as a modal from the template.
    $ionicModal.fromTemplateUrl('templates/player.html', { 	
      scope: $scope											
    }).then(function(modal) {
      $scope.modal = modal;
    });
	//We have created 2 methods on  $rootScope that can show and hide the player. 
    $rootScope.hidePlayer = function() { 	
      $scope.modal.hide();					
    };
	//This will be used across the app. Take a look at line 5.
    $rootScope.player = function() {
      $scope.modal.show();
    };
	//The File System traversing starts from here. 
    $ionicPlatform.ready(function() {													
		//We wait for the device to be ready.																	
      $rootScope.show('Accessing Filesystem.. Please wait');
	  //We call  requestFileSystem() on the window
	  //and get the contents of the root directory.
      $window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {	
          //console.log("fileSystem", fileSystem);														
 
          var directoryReader = fileSystem.root.createReader();
			//We read all the entries present in the root folder and  
			//call  processEntries() to build an Array of files system items.
          directoryReader.readEntries(function(entries) {								
              var array = [];			
			// arr is pass by refrence			  
              processEntries(entries, array); 
			  // We assign the file info array to  $scope.files. This updates the browse.html template to reflect the files in the root.
              $scope.files = arr;	
              $rootScope.hide();
            },
            function(error) {
              console.log(error);
            });
        },
        function(error) {
          console.log(error);
        });
		//Will get invoked when any file or folder name is clicked.
      $scope.showSubDirs = function(file) { 
		// If the selected item is a folder, we check if the item is a navigation item. 
        if (file.isDirectory || file.isUpNav) { 
          if (file.isUpNav) {			
			// Navigation items are used to move to folder one level up, which we create 	
			// for the user to navigate. Based on this condition, we call  processFile() with a URL
            processFile(file.nativeURL.replace(file.actualName + '/', '')); 
          } else {
            processFile(file.nativeURL);
          }
        } else { //If the clicked item is a file, we check it is an Audio file or Video file. If it is a Video file, we will 
          if (hasExtension(file.name)) { //invoke the  VideoPlayer.play() passing in the media URL. We install the Video player plugin
            if (file.name.indexOf('.mp4') > 0) {
              // Stop the audio player before starting the video
              $scope.stopAudio();
              VideoPlayer.play(file.nativeURL);
            } else { //If it is an audio file, we will work with the  AudioService  service and manage the player.
              fsResolver(file.nativeURL, function(fileSystem) {
                //console.log('fileSystem ', fileSystem);
                // Play the selected file
                AudioService.playAudio(file.nativeURL, function(a, b) {
                  //console.log(a, b);
                  $scope.position = Math.ceil(a / b * 100);
                  if (a < 0) {
                    $scope.stopAudio();
                  }
                  if (!$scope.$$phase) $scope.$apply();
                });
 
                $scope.loaded = true;
                $scope.isPlaying = true;
                $scope.name = file.name;
                $scope.path = file.fullPath;
 
                // show the player
                $scope.player();
 
                $scope.pauseAudio = function() {
                  AudioService.pauseAudio();
                  $scope.isPlaying = false;
                  if (!$scope.$$phase) $scope.$apply();
                };
                $scope.resumeAudio = function() {
                  AudioService.resumeAudio();
                  $scope.isPlaying = true;
                  if (!$scope.$$phase) $scope.$apply();
                };
                $scope.stopAudio = function() {
                  AudioService.stopAudio();
                  $scope.loaded = false;
                  $scope.isPlaying = false;
                  if (!$scope.$$phase) $scope.$apply();
                };
 
              });
            }
          } else {
            $rootScope.toggle('Oops! We cannot play this file :/', 3000);
          }
 
        }
 
      }
 
      function fsResolver(url, callback) {
        $window.resolveLocalFileSystemURL(url, callback);
      }
 
      function processFile(url) {
        fsResolver(url, function(fileSystem) {
          //console.log(fileSystem);
          var directoryReader = fileSystem.createReader();
 
          directoryReader.readEntries(function(entries) {
              if (entries.length > 0) {
                var arr = [];
                // push the path to go one level up
                if (fileSystem.fullPath !== '/') {
                  arr.push({ 							//If the folder is not the root folder and it has children, we append a new  .. 
                    id: 0,								//One level up item to the top of the list, using which the user can navigate 
                    name: '.. One level up',			//to the parent folder. You can see the same in the demo video. This way, we 
                    actualName: fileSystem.name,				//can recursively show the file system to the user.
                    isDirectory: false,
                    isUpNav: true,
                    nativeURL: fileSystem.nativeURL,
                    fullPath: fileSystem.fullPath
                  });
                }
                processEntries(entries, arr);
                $scope.$apply(function() {
                  $scope.files = arr;
                });
 
                $ionicScrollDelegate.scrollTop();
              } else {
                $rootScope.toggle(fileSystem.name + ' folder is empty!', 2000);
              }
            },
            function(error) {
              console.log(error);
            });
        });
      }
 
      function hasExtension(fileName) {
        var exts = ['.mp3', '.m4a', '.ogg', '.mp4', '.aac'];
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
      }
 
      function processEntries(entries, arr) {
 
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
 
          // do not push/show hidden files or folders
          if (e.name.indexOf('.') !== 0) {
            arr.push({
              id: i + 1,
              name: e.name,
              isUpNav: false,
              isDirectory: e.isDirectory,
              nativeURL: e.nativeURL,
              fullPath: e.fullPath
            });
          }
        }
        return arr;
      }
 
    });
  }
])
