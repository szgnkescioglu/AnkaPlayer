# AnkaPlayer
Mobile Multimedia Player

Project developed with Ionic Framework. Js & Css & Html sources avaible in repository.

Usage of Ionic Framework

1- Create a application with, ionic start AnkaPlayer sidemenu
2- Check if project builded or not, ionic serve
3- Then replace www folder with repository files
4- Import project dependencies;
    - cordova plugin add ionic-plugin-keyboard
    - cordova plugin add cordova-plugin-file
    - cordova plugin add cordova-plugin-media
    - cordova plugin add https://github.com/dawsonloudon/VideoPlayer.git 
5- Add config.xml file, 
    - <preference name="AndroidPersistentFileLocation" value="Compatibility"/>
    - <preference name="orientation" value="portrait" />
6- Build your application with these steps;
    - ionic platform add android
    _________________________________________________________________
      for checking is application running correctly, 
      but you can seee only index page file loading part because 
      mobile file system is not running
      Update js/controllers.js with comment line 29
    __________________________________________________________________
    - ionic serve 
    then,
    ionic build android 
    
    You got android output of project.
    
    Note: If you check the source code of project you can see more details in comments.
                    
