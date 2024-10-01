# csPlayer
A custom youtube video player, based on Javascript.

## Installing
Firstly, include YouTube iframe api script in your document.
```html
<script src="https://www.youtube.com/iframe_api"></script>
```
Place this script before any script in head tag to load it faster.

Now include `csPlayer` files in the document.
You can use the files available above in `src` folder.
```html
<link rel="stylesheet" href="csPlayer.css">
<script src="csPlayer.js"></script>
```
or use them Via CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/abtp2/csPlayer/src/csPlayer.css">
<script src="https://cdn.jsdelivr.net/gh/abtp2/csPlayer/src/csPlayer.js"></script>
```

## Methods
- init()
- changeVideo()
- play()
- pause()
- getDuration()
- getCurrentTime()
- getVideoTitle()
- getPlayerState()
- Initialized()
- destroy()

#### 1. init()
This will initiate csPlayer in the document.
```js
csPlayer.init("#video",{
defaultId: "RKERYQwvlFw",
thumbnail: true,
theme: "default",
loop: false,
});
```
1st parameter is the id of the element for player element in video player is going to play. **NOTE : This should be unique in document.**

2nd parameter contains various parameters, that are: 
##### a) defaultId
This is the default youtube video id through which player player would be loaded, and this is mandate.
##### b) thumbnail
It will take the boolean values `true or false` or also you can give url for the custom thumbnail.
##### c) theme
This will take the values of the themes available at csPlayer by default. Some of them are `youtube`,`plyr` and `default`.
[Check available themes](https://csPlayer.netlify.app).
##### d) loop
This will take boolean values `true` or `false`.

Also, user can use  `.then()` in init() to perform any action after initialization.
```js
csPlayer.init("#video",{
defaultId: "RKERYQwvlFw",
thumbnail: true,
theme: "default",
loop: false,
})
.then(()=>{
console.log("Player Initialized");
})
.catch((error)=>{
console.log("Error", error);
});
```

#### 2. changeVideo()
This will change the video of the current player.
```js
csPlayer.changeVideo("video","kJQP7kiw5Fk");
```
1st parameter is the id of the element for player.
2nd parameter is the video id of the youtube video.

#### 3. play()
This is use to play the video.
```js
csPlayer.play("video")
```
Given parameter is the id of the element for player.

#### 4. pause()
This is use to pause the video.
```js
csPlayer.pause("#video")
```
Given parameter is the id of the element for player.

#### 5. getDuration()
This will return duration of the video.
```js
var x = csPlayer.getDuration("#video")
console.log(x); //eg: 490
```
Given parameter is the id of the element for player.
It will return duration time in seconds.

#### 6. getCurrentTime()
This will return current time of the video.
```js
var x = csPlayer.getCurrentTime("#video")
console.log(x); //eg: 176
```
Given parameter is the id of the element for player.
It will return duration time in seconds.

#### 7. initialized()
This is use to check if video is initialized or not.
```js
var x = csPlayer.initialized("video")
console.log(x); //eg: true
```
Given parameter is the id of the element for player.
It will return true or false.

## CSS customization
- --playerBg
- --playerColor
- --controlsHeight
- --playPauseBtnSize
- --cornerBR

#### 1. --playerBg
This is for the background color of the video player.
```css
#video .csPlayer{
--playerBg: #000;
}
```
#### 2. --playerColor
This is for the accent color of the video player.
```css
#video .csPlayer{
--playerColor: #e1e1e1;
}
```
#### 3. --controlsHeight
This is for the height of controls box of the video player.
```css
#video .csPlayer{
--controlsHeight: 45px;
}
```
#### 4. --playPauseBtnSize
This is for the size of centred play/Pause button the video player.
```css
#video .csPlayer{
--playPauseBtnSize: 60px;
}
```
#### 5. --cornerBR
This is for the raidus of corners of the video player.
```css
#video .csPlayer{
--cornerBR: 5px;
}
```


## Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="csPlayer.css">
    <title>csPlayer</title>
</head>
<body>
<div id="video"></div>

<script src="csPlayer.js"></script>
<script>
csPlayer.init("#video","bTqVqk7FSmY")
</script>
</body>
</html>
```


## Screenshots
![screenshots](https://i.ibb.co/Tqtxqp0/20240926-123313.jpg)
