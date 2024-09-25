## csPlayer
A custom youtube video player, based on Javascript.

> [!WARNING]  
> The only thing to take care is that, youtube video title should be more then 5-10 letters. Else title will be visible inside the player.

### Installing
To start using Bolt, download `csPlayer.css` and `csPlayer.js` file from above.

Include css and js files in the document.

CSS
```html
<link rel="stylesheet" href="csPlayer.css">
```
JS
```html
<script src="csPlayer.js"></script>
```

### Methods
- init()
- setVideo()

#### 1) init()
This will initiate csPlayer in the document.
```js
csPlayer.init("#video","player","wsTb0s3uezw");
```
1st parameter is the selector for player element in video player is going to play.

2nd parameter is the Id name of the div in which video is going to play, apart from controls. **NOTE: This should be unique in document.**

3rd parameter is the by default video id of the youtube video.

Also, user can use  `.then()` in init() to perform any action after initialization.
```js
csPlayer.init("#video","player","wsTb0s3uezw")
.then(()=>{
console.log("Player Initialized");
})
.catch((error)=>{
console.log("Error", error);
});
```

#### 2) setVideo()
This will change the video of the current player.
```js
csPlayer.setVideo("ggMiqW0JXTs");
```
Parameter given is the video id of the youtube video.

### Example
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
csPlayer.init("#video","player","wsTb0s3uezw")
// csPlayer.setVideo("ggMiqW0JXTs");
</script>
</body>
</html>
```