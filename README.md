# AnkaPlayer
Mobile Multimedia Player

Project developed with Ionic Framework. Js & Css & Html sources avaible in repository.

Usage of Ionic Framework

1- Create a application with, ionic start AnkaPlayer sidemenu

<br/>
2- Check if project builded or not, ionic serve

<br/>
3- Then replace www folder with repository files

<br/>
4- Import project dependencies;

<br/>
    - cordova plugin add ionic-plugin-keyboard
    
    <br/>
    - cordova plugin add cordova-plugin-file
    
    <br/>
    - cordova plugin add cordova-plugin-media
    
    <br/>
    - cordova plugin add https://github.com/dawsonloudon/VideoPlayer.git
    
    <br/>
5- Add config.xml file, 

<br/>
    - <preference name="AndroidPersistentFileLocation" value="Compatibility"/>
    
    <br/>
    - <preference name="orientation" value="portrait" />
    
    <br/>
6- Build your application with these steps;

<br/>
    - ionic platform add android
    
    <br/>
    _________________________________________________________________
    
    <br/>
      for checking is application running correctly, 
      
      <br/>
      but you can seee only index page file loading part because 
      
      <br/>
      mobile file system is not running
      
      <br/>
      Update js/controllers.js with comment line 29
      <br/>
    __________________________________________________________________
    
    <br/>
    - ionic serve 
    
    <br/>
    then,
    
    <br/>
    ionic build android 
    <br/>
    
    You got android output of project.
    <br/>
    
    Note: If you check the source code of project you can see more details in comments.
                    
