/*We will be injecting this service as a dependency in our controller, where we will manage the above API based on the user interactions.*/


angular.module('starter.services', [])

.service('AudioService', [function() {/*We have created a new module named starter.services and added the  AudioService to that.*/
 
  var AudioService = {
    my_media: null,
    mediaTimer: null,
    playAudio: function(src, cb) { /*Defines the play audio method, which plays the given source using the Cordova’s Media API*/
      var self = this;
 
      // stop playing, if playing
      self.stopAudio();
 
      self.my_media = new Media(src, onSuccess, onError);
      self.my_media.play();
 
      if (self.mediaTimer == null) {
        self.mediaTimer = setInterval(function() {/*We create a setInterval for every seconds to execute  getCurrentPosition() and trigger the callback. This way we update the seek bar with the total time and time left.*/
          self.my_media.getCurrentPosition(
            function(position) {
              cb(position, self.my_media.getDuration());
            },
            function(e) {
              console.log("Error getting pos=" + e);
            }
          );
        }, 1000);
      }
 
      function onSuccess() {
        console.log("playAudio():Audio Success");
      }
 
      // onError Callback
      //
      function onError(error) {
        // alert('code: ' + error.code + '\n' +
        //     'message: ' + error.message + '\n');
 
        // we forcefully stop
 
      }
 
    },
 
    resumeAudio: function() { /* The logic for resume audio*/
      var self = this;
      if (self.my_media) {
        self.my_media.play();
      }
    },
    pauseAudio: function() { /*The logic for pause audio*/
      var self = this;
      if (self.my_media) {
        self.my_media.pause();
      }
    },
    stopAudio: function() { /*The logic for stop audio*/
      var self = this;
      if (self.my_media) {
        self.my_media.stop();
      }
      if (self.mediaTimer) {
        clearInterval(self.mediaTimer);
        self.mediaTimer = null;
      }
    }
 
  };
 
  return AudioService;
}])