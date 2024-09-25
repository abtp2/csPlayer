//custom script 
function $(selector){
const elements = document.querySelectorAll(selector);
var x;
if(elements.length == 1){x = elements[0]}
else{x = elements}
return x;
}


var player;
var playerId;
var isPlaying = false;
function readyPlayerFunction(playerTagId,defaultId){
playerId = defaultId;
window.YT.ready(function() {
    player = new YT.Player(playerTagId,{
        videoId: playerId,
        playerVars: {
            controls: 0,
            mute: 1,
            autoplay: 1,
            fs: 0,
            playsinline: 1,
            rel: 0,
            loop: 1,
            cc_load_policy: 0,
            showinfo: 0,
            iv_load_policy: 3,
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
});
var playerLoader = $("#videoPlayer .player-container span");
function onPlayerReady(event){
$("#videoPlayer #playPauseBtn").addEventListener('click', togglePlayPause);
$("#videoPlayer #timeSlider input").addEventListener('input', updateVideoTime);
setTimeout(()=>{
  player.pauseVideo();
  setQualityOptions();
  $("#videoPlayer .player-container span i").classList.remove("player-loading");
  player.addEventListener('onStateChange', onPlayerStateChange);
  // Update time slider as video play
  setInterval(updateTimeSlider, 1000);
  csPlayer.initialized = true;
  }, 2000);
}
function resetPlayer(){
playerLoader.style.display="flex";
$("#videoPlayer #unmuteBtn").style.display ="flex";
player.pauseVideo();
$("#videoPlayer .player-container").style.pointerEvents ="auto";
$("#videoPlayer").classList.remove("controls-open");
}
// Play/Pause toggle functionality
function togglePlayPause(){
 if(isPlaying){
 player.pauseVideo();
 $("#videoPlayer #playPauseBtn i").className ="ti ti-player-play-filled";
 }else{
 player.playVideo();
 $("#videoPlayer #playPauseBtn i").className ="ti ti-player-pause-filled";
 }
isPlaying = !isPlaying;
}
//forward & backward
$("#videoPlayer #frwdBtn").addEventListener("click",function(){
const currentTime = player.getCurrentTime();
player.seekTo(currentTime + 10, true);
}); 
$("#videoPlayer #bkwdBtn").addEventListener("click",function(){
const currentTime = player.getCurrentTime();
player.seekTo(Math.max(0, currentTime - 10), true);
}); 
//unmute video
$("#videoPlayer #unmuteBtn").addEventListener("click", function(){
player.unMute();
this.style.display ="none";  
});
//Update slider length
function updateSliderLength(){
const slider = $("#videoPlayer .controls #timeSlider input");
const tempSliderValue = slider.value;
const progress = (tempSliderValue / slider.max) * 100;
const loaded = (player.getVideoLoadedFraction() * 100) +"%";
slider.style.backgroundImage = `linear-gradient(to right, rgba(var(--playerBg),1) ${progress}%, transparent ${progress}%)`;
$("#videoPlayer .controls #timeSlider span").style.width =`calc(${loaded} + var(--thumbHeight))`;
}
$("#videoPlayer .controls #timeSlider input").addEventListener("input", (event) => {
updateSliderLength();
})
//returns second to time format
function formatTime(seconds) {
const h = Math.floor(seconds / 3600),
      m = Math.floor((seconds % 3600) / 60),
      s = Math.floor(seconds % 60);
return h > 0 ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
//returns time to seconds
function timeToSeconds(t){
var p = t.split(":").map(Number);
return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
}
// Update time slider as video progresses
function updateTimeSlider(){
const slider = $("#videoPlayer .controls #timeSlider input");
var currentTime = player.getCurrentTime();
var duration = player.getDuration();
var percentage = (currentTime / duration) * 100;
slider.value = percentage;
updateSliderLength();
$("#videoPlayer #playerTimer p").innerText =`-${formatTime(duration - currentTime)}`;
}
// Change video time using the slider
function updateVideoTime(){
var sliderValue = $("#videoPlayer #timeSlider input").value;
var duration = player.getDuration();
var newTime = (sliderValue / 100) * duration;
player.seekTo(newTime);
}
//fullscreen toggle
function toggleFullscreen(x){
const videoContainer = $(x);  
if(!document.fullscreenElement && document.fullscreenEnabled){
 $("#videoPlayer").style.borderColor ="transparent";
 if(videoContainer.requestFullscreen){
  videoContainer.requestFullscreen();
 }else if(videoContainer.mozRequestFullScreen){
  videoContainer.mozRequestFullScreen();
 }else if(videoContainer.webkitRequestFullscreen){
  videoContainer.webkitRequestFullscreen();
 }else if(videoContainer.msRequestFullscreen){
  videoContainer.msRequestFullscreen();
 }
}
else if(document.fullscreenElement && document.fullscreenEnabled){
 $("#videoPlayer").style.borderColor ="rgba(var(--playerColor),1)";
 if(document.exitFullscreen){
  document.exitFullscreen();
 }else if(document.mozCancelFullScreen){
  document.mozCancelFullScreen();
 }else if(document.webkitExitFullscreen){
  document.webkitExitFullscreen();
 }else if(document.msExitFullscreen){
  document.msExitFullscreen();
 }
}} //toggle function end
//player fullscreen
$("#videoPlayer #fsBtn").addEventListener("click",function(){
toggleFullscreen("#videoPlayer");
});
//reset settings
function resetSettings(){
$("#videoPlayer #settings p").forEach(pin =>{
pin.nextElementSibling.style.transition ="max-height 0.4s";
pin.nextElementSibling.style.maxHeight ="0px";
});
}
//player settings
$("#videoPlayer .controls #settingsBtn").addEventListener("click", function(){
if($("#videoPlayer #settings").style.display =="block"){
resetSettings();
$("#videoPlayer #settings").style.display ="none"; 
}else{
$("#videoPlayer #settings").style.display ="block";    
}});
document.addEventListener("click",function(event){
if(!$("#videoPlayer #settings").contains(event.target) && !$("#videoPlayer .controls #settingsBtn").contains(event.target)){
resetSettings();
$("#videoPlayer #settings").style.display ="none";
}});
$("#videoPlayer #settings p").forEach(pin =>{
pin.addEventListener("click", function(){
$("#videoPlayer #settings span").forEach((y)=>{
    y.style.transition ="max-height 0.4s";
    y.style.maxHeight ="0";
    });
if(window.getComputedStyle(pin.nextElementSibling).maxHeight =="200px"){
pin.nextElementSibling.style.transition ="max-height 0.4s";
pin.nextElementSibling.style.maxHeight ="0px";
}else{
pin.nextElementSibling.style.transition ="max-height 0.5s";
pin.nextElementSibling.style.maxHeight ="200px";
}});
});
//player settings functioning
$("#videoPlayer #settings span:nth-of-type(1) input").forEach(input =>{
input.addEventListener("change", function(){
var inputValue = this.parentElement.innerText;
$("#videoPlayer #settings p:nth-of-type(1) b").innerText = inputValue;
player.setPlaybackRate(Number(inputValue.substring(0,inputValue.length - 1)));
});
});
function enableQualityChanging(){
var input = $("#videoPlayer #settings span:nth-of-type(2) input");
for(i=0;i < $("#videoPlayer #settings span:nth-of-type(2) input").length;i++){
input[i].addEventListener("change", function(){
var inputValue = this.parentElement.innerText;
var duration = player.getDuration();
var currentTime = player.getCurrentTime();
$("#videoPlayer #settings p:nth-of-type(2) b").innerText = inputValue;
//player.setPlaybackQuality(inputValue);
player.loadVideoById(playerId, currentTime, inputValue);
});
}}
//set options of qualities
function setQualityOptions(){
var qualities = player.getAvailableQualityLevels();
const select = $("#videoPlayer #settings span:nth-of-type(2)");
for(x of qualities){
if(!select.innerHTML.includes(x)){
select.innerHTML +=`<label><input type="radio" name="2">${x}</label>`;
}}
enableQualityChanging();
}
// Detect when the video is playing or paused
function onPlayerStateChange(event){
if(event.data == YT.PlayerState.PLAYING){
isPlaying = true;
$("#videoPlayer #playPauseBtn i").className ="ti ti-player-pause-filled";
playerLoader.style.display="none";
$("#videoPlayer .player-container").style.pointerEvents ="none";
$("#videoPlayer").classList.add("controls-open");
}else if(event.data == YT.PlayerState.PAUSED){
isPlaying = false;
$("#videoPlayer #playPauseBtn i").className ="ti ti-player-play-filled";
}
if(event.data === YT.PlayerState.ENDED){
player.loadVideoById(playerId, 0, $("#videoPlayer #settings p:nth-of-type(2) b").innerText);
}}
}



const csPlayer = {
initialized: false,
preSetup: (videoTag,playerTagId)=>{
     return new Promise((resolve, reject) => {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      tag.onload =()=>{
      $(videoTag).innerHTML =`<div id="videoPlayer">
<button id="unmuteBtn"><i class="ti ti-volume-off"></i>Unmute</button>
<div class="player-container">
 <span><i class="ti ti-player-play-filled player-loading"></i></span>
 <div id=${playerTagId}></div>
</div>
<!-- Controls -->
<div class="controls">
 <button id="bkwdBtn"><i class="ti ti-chevrons-left"></i></button> 
 <button id="playPauseBtn"><i class="ti ti-player-pause-filled"></i></button> 
 <button id="frwdBtn"><i class="ti ti-chevrons-right"></i></button> 
 <div id="timeSlider"><span></span>
 <input type="range" min="0" max="100" value="0" step="1"></div> 
 <div id="playerTimer">
 <p>-00:00</p>
 </div>  
 <button id="settingsBtn"><i class="ti ti-settings"></i></button>
 <button id="fsBtn"><i class="ti ti-maximize"></i></button>
</div>
<!-- settings options -->
<div id="settings">
<p>Speed<b>1x</b><i class="ti ti-caret-right-filled"></i></p>
 <span>     
  <label><input type="radio" name="1">0.75x</label>
  <label><input type="radio" name="1" checked>1x</label>
  <label><input type="radio" name="1">1.25x</label>
  <label><input type="radio" name="1">1.5x</label>
  <label><input type="radio" name="1">1.75x</label>
  <label><input type="radio" name="1">2x</label>
 </span>
<p>Quality<b>auto</b><i class="ti ti-caret-right-filled"></i></p>
  <span>
  <label><input type="radio" name="2" checked>auto</label>
 </span>
</div>
</div>`;
      resolve();
      }//tag loaded
      tag.onerror = (error) =>{
      reject(new Error("Failed to load API"));
      };
     });//promise
    },
readyPlayer: (playerTagId,defaultId)=>{
    readyPlayerFunction(playerTagId,defaultId);
    },
init: (videoTag,playerTagId,defaultId)=>{
    return new Promise((resolve, reject) => {
    csPlayer.preSetup(videoTag,playerTagId)
    .then(() => {
    console.log("Player initialized successfully!");
    csPlayer.readyPlayer(playerTagId,defaultId);
    resolve();
    })
    .catch((error) => {
    console.error(error);
    csPlayer.initialized = false;
    });    
    });//promise
    },
    
changeVideo: (videoId)=>{
    if(csPlayer.initialized){
    player.loadVideoById(videoId);
    playerId = videoId;   
    }else{
    console.error("Player not initialized.");
    }
    },
};
