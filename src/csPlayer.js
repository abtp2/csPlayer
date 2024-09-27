//custom script 
function $(selector){
const elements = document.querySelectorAll(selector);
var x;
if(elements.length == 1){x = elements[0]}
else{x = elements}
return x;
}


var csPlayers = {};
var isPlaying = false;
const iconLibUrl ="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css";
function readyPlayerFunction(videoTag,playerTagId){
window.YT.ready(function() {
    csPlayers[videoTag]["videoTag"] = new YT.Player(playerTagId,{
        videoId: csPlayers[videoTag]["defaultId"],
        playerVars: {
            controls: 0,
            mute: 1,
            autoplay: 1,
            fs: 0,
            playsinline: 1,
            rel: 0,
            loop: 1,
            cc_load_policy: 3,
            showinfo: 0,
            iv_load_policy: 3,
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
});
var playerLoader = $(videoTag + " .csPlayer .player-container span");
function onPlayerReady(event){
$(videoTag + " .csPlayer .playPauseBtn").addEventListener('click', togglePlayPause);
$(videoTag + " .csPlayer .timeSlider input").addEventListener('input', updateVideoTime);
setTimeout(()=>{
  csPlayers[videoTag]["videoTag"].pauseVideo();
  setQualityOptions();
  $(videoTag + " .csPlayer .player-container span i").classList.remove("player-loading");
  csPlayers[videoTag]["videoTag"].addEventListener('onStateChange', onPlayerStateChange);
  // Update time slider as video play
  setInterval(updateTimeSlider, 1000);
  csPlayer.initialized = true;
  }, 2000);
}
function resetPlayer(){
playerLoader.style.display="flex";
$(videoTag + " .csPlayer .unmuteBtn").style.display ="flex";
csPlayers[videoTag]["videoTag"].pauseVideo();
$(videoTag + " .csPlayer .player-container").style.pointerEvents ="auto";
$(videoTag + " .csPlayer").classList.remove("controls-open");
}
// Play/Pause toggle functionality
function togglePlayPause(){
 if(isPlaying){
 csPlayers[videoTag]["videoTag"].pauseVideo();
 $(videoTag + " .csPlayer .playPauseBtn i").className ="ti ti-player-play-filled";
 }else{
 csPlayers[videoTag]["videoTag"].playVideo();
 $(videoTag + " .csPlayer .playPauseBtn i").className ="ti ti-player-pause-filled";
 }
isPlaying = !isPlaying;
}
//forward & backward
$(videoTag + " .csPlayer .frwdBtn").addEventListener("click",function(){
const currentTime = csPlayers[videoTag]["videoTag"].getCurrentTime();
csPlayers[videoTag]["videoTag"].seekTo(currentTime + 10, true);
}); 
$(videoTag + " .csPlayer .bkwdBtn").addEventListener("click",function(){
const currentTime = csPlayers[videoTag]["videoTag"].getCurrentTime();
csPlayers[videoTag]["videoTag"].seekTo(Math.max(0, currentTime - 10), true);
}); 
//unmute video
$(videoTag + " .csPlayer .unmuteBtn").addEventListener("click", function(){
csPlayers[videoTag]["videoTag"].unMute();
this.style.display ="none";  
});
//Update slider length
function updateSliderLength(){
const slider = $(videoTag + " .csPlayer .controls .timeSlider input");
const tempSliderValue = slider.value;
const progress = (tempSliderValue / slider.max) * 100;
const loaded = (csPlayers[videoTag]["videoTag"].getVideoLoadedFraction() * 100) +"%";
slider.style.backgroundImage = `linear-gradient(to right, var(--playerBg) ${progress}%, transparent ${progress}%)`;
$(videoTag + " .csPlayer .controls .timeSlider span").style.width =`calc(${loaded} + var(--thumbHeight))`;
}
$(videoTag + " .csPlayer .controls .timeSlider input").addEventListener("input", (event) => {
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
const slider = $(videoTag + " .csPlayer .controls .timeSlider input");
var currentTime = csPlayers[videoTag]["videoTag"].getCurrentTime();
var duration = csPlayers[videoTag]["videoTag"].getDuration();
var percentage = (currentTime / duration) * 100;
slider.value = percentage;
updateSliderLength();
$(videoTag + " .csPlayer .playerTimer p").innerText =`-${formatTime(duration - currentTime)}`;
}
// Change video time using the slider
function updateVideoTime(){
var sliderValue = $(videoTag + " .csPlayer .timeSlider input").value;
var duration = csPlayers[videoTag]["videoTag"].getDuration();
var newTime = (sliderValue / 100) * duration;
csPlayers[videoTag]["videoTag"].seekTo(newTime);
}
//fullscreen toggle
function toggleFullscreen(x){
const videoContainer = $(x);  
if(!document.fullscreenElement && document.fullscreenEnabled){
 $(videoTag + " .csPlayer").style.borderColor ="transparent";
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
 $(videoTag + " .csPlayer").style.borderColor ="var(--playerColor)";
 if(document.exitFullscreen){
  document.exitFullscreen();
 }else if(document.mozCancelFullScreen){
  document.mozCancelFullScreen();
 }else if(document.webkitExitFullscreen){
  document.webkitExitFullscreen();
 }else if(document.msExitFullscreen){
  document.msExitFullscreen();
 }
}else{
console.warn("Fullscreen api not supported in your browser.");
}} //toggle function end
//player fullscreen
$(videoTag + " .csPlayer .fsBtn").addEventListener("click",function(){
toggleFullscreen(videoTag + " .csPlayer");
});
//reset settings
function resetSettings(){
$(videoTag + " .csPlayer .settings p").forEach(pin =>{
pin.nextElementSibling.style.transition ="max-height 0.4s";
pin.nextElementSibling.style.maxHeight ="0px";
});
}
//player settings
$(videoTag + " .csPlayer .controls .settingsBtn").addEventListener("click", function(){
setQualityOptions();
if($(videoTag + " .csPlayer .settings").style.display =="block"){
resetSettings();
$(videoTag + " .csPlayer .settings").style.display ="none"; 
}else{
$(videoTag + " .csPlayer .settings").style.display ="block";    
}});
document.addEventListener("click",function(event){
if(!$(videoTag + " .csPlayer .settings").contains(event.target) && !$(videoTag + " .csPlayer .controls .settingsBtn").contains(event.target)){
resetSettings();
$(videoTag + " .csPlayer .settings").style.display ="none";
}});
$(videoTag + " .csPlayer .settings p").forEach(pin =>{
pin.addEventListener("click", function(){
$(videoTag + " .csPlayer .settings span").forEach((y)=>{
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
$(videoTag + " .csPlayer .settings span:nth-of-type(1) input").forEach(input =>{
input.addEventListener("change", function(){
var inputValue = this.parentElement.innerText;
$(videoTag + " .csPlayer .settings p:nth-of-type(1) b").innerText = inputValue;
csPlayers[videoTag]["videoTag"].setPlaybackRate(Number(inputValue.substring(0,inputValue.length - 1)));
});
});
function enableQualityChanging(){
var input = $(videoTag + " .csPlayer .settings span:nth-of-type(2) input");
for(i=0;i < $(videoTag + " .csPlayer .settings span:nth-of-type(2) input").length;i++){
input[i].addEventListener("change", function(){
var inputValue = this.parentElement.innerText;
var duration = csPlayers[videoTag]["videoTag"].getDuration();
var currentTime = csPlayers[videoTag]["videoTag"].getCurrentTime();
$(videoTag + " .csPlayer .settings p:nth-of-type(2) b").innerText = inputValue;
//csPlayers[videoTag]["videoTag"].setPlaybackQuality(inputValue);
csPlayers[videoTag]["videoTag"].loadVideoById(csPlayers[videoTag]["defaultId"], currentTime, inputValue);
});
}}
//set options of qualities
function setQualityOptions(){
var qualities = csPlayers[videoTag]["videoTag"].getAvailableQualityLevels();
const select = $(videoTag + " .csPlayer .settings span:nth-of-type(2)");
for(x of qualities){
if(!select.innerHTML.includes(x)){
select.innerHTML +=`<label><input type="radio" name=${videoTag}2>${x}</label>`;
}}
enableQualityChanging();
}
// Detect when the video is playing or paused
function onPlayerStateChange(event){
if(event.data == YT.PlayerState.PLAYING){
isPlaying = true;
$(videoTag + " .csPlayer .playPauseBtn i").className ="ti ti-player-pause-filled";
$(videoTag + " .csPlayer .player-container").style.pointerEvents ="none";
playerLoader.style.display="none";
$(videoTag + " .csPlayer .player-container .csPlayer-hole:nth-of-type(1)").style.display ="none";
$(videoTag + " .csPlayer .player-container .csPlayer-hole:nth-of-type(2)").style.display ="none";
$(videoTag + " .csPlayer").classList.add("controls-open");
}else if(event.data == YT.PlayerState.PAUSED){
isPlaying = false;
$(videoTag + " .csPlayer .playPauseBtn i").className ="ti ti-player-play-filled";
}
if(event.data === YT.PlayerState.ENDED){
csPlayers[videoTag]["videoTag"].loadVideoById(csPlayers[videoTag]["defaultId"], 0, $(videoTag + " .csPlayer .settings p:nth-of-type(2) b").innerText);
}
try{
csPlayers[videoTag]["videoTag"].unloadModule("captions"); csPlayers[videoTag]["videoTag"].unloadModule("cc");
}catch(exception){}
}
}//readyPlayerFunction ended



const csPlayer = {
initialized: false,
preSetup: (videoTag,playerTagId)=>{
     return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      var link = document.createElement("link");
      script.src = "https://www.youtube.com/iframe_api";
      link.href = iconLibUrl;
      link.rel = "stylesheet";
      
      var sPromise=new Promise((resolve,reject)=>{
      script.onload = resolve;
      script.onerror = reject;
      });
      var lPromise = new Promise((resolve,reject)=>{
      link.onload = resolve;
      link.onerror = reject;
      });            
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
      document.head.appendChild(link);
      const onBothLoaded =()=>{
      /*
      .csPlayer
      .unmuteBtn
      .bkwdBtn
      .frwdBtn
      .playPauseBtn
      .timeSlider
      .playerTimer
      .settingsBtn
      .fsBtn
      .settings
       */
      $(videoTag).innerHTML =`<div class="csPlayer">
<button class="unmuteBtn"><i class="ti ti-volume-off"></i>Unmute</button>
<div class="player-container">
 <span><i class="ti ti-player-play-filled player-loading"></i></span>
 <div class="csPlayer-hole"></div>
 <div class="csPlayer-hole"></div>
 <div id=${playerTagId}></div>
</div>
<!-- Controls -->
<div class="controls">
 <button class="bkwdBtn"><i class="ti ti-chevrons-left"></i></button> 
 <button class="playPauseBtn"><i class="ti ti-player-pause-filled"></i></button> 
 <button class="frwdBtn"><i class="ti ti-chevrons-right"></i></button> 
 <div class="timeSlider"><span></span>
 <input type="range" min="0" max="100" value="0" step="1"></div> 
 <div class="playerTimer">
 <p>-00:00</p>
 </div>  
 <button class="settingsBtn"><i class="ti ti-settings"></i></button>
 <button class="fsBtn"><i class="ti ti-maximize"></i></button>
</div>
<!-- settings options -->
<div class="settings">
<p>Speed<b>1x</b><i class="ti ti-caret-right-filled"></i></p>
 <span>     
  <label><input type="radio" name=${videoTag}1>0.75x</label>
  <label><input type="radio" name=${videoTag}1 checked>1x</label>
  <label><input type="radio" name=${videoTag}1>1.25x</label>
  <label><input type="radio" name=${videoTag}1>1.5x</label>
  <label><input type="radio" name=${videoTag}1>1.75x</label>
  <label><input type="radio" name=${videoTag}1>2x</label>
 </span>
<p>Quality<b>auto</b><i class="ti ti-caret-right-filled"></i></p>
  <span>
  <label><input type="radio" name=${videoTag}2 checked>auto</label>
 </span>
</div>
</div>`;
      resolve();
      }//tag loaded
      Promise.all([sPromise, lPromise]).then(onBothLoaded).catch((error) => {
      console.error("Failed to load csPlayerScript or csPlayerLink.");
      });
     });//promise
    },
readyPlayer: (videoTag,playerTagId)=>{
   readyPlayerFunction(videoTag,playerTagId);
    },
init: (videoTag,defaultId)=>{
    return new Promise((resolve, reject) => {
csPlayer.preSetup(videoTag,playerTagId="csPlayer-"+videoTag)
    .then(() => {
    console.log("Player initialized successfully!");
    csPlayers[videoTag] = {}
    csPlayers[videoTag]["videoTag"] = videoTag;
    csPlayers[videoTag]["defaultId"] = defaultId;
csPlayer.readyPlayer(videoTag,playerTagId="csPlayer-"+ videoTag);
    resolve();
    })
    .catch((error) => {
    console.error(error);
    csPlayer.initialized = false;
    });
    });//promise
    },
    
changeVideo: (videoTag,videoId)=>{
    if(csPlayer.initialized){
    csPlayers[videoTag]["videoTag"].loadVideoById(videoId);
    csPlayers[videoTag]["defaultId"] = videoId;   
    }else{
    console.error("Player not initialized yet.");
    }},
pause: (videoTag)=>{
    if(csPlayer.initialized){
    csPlayers[videoTag]["videoTag"].pauseVideo();
    }else{
    console.error("Player not initialized yet.");
    }},
play: (videoTag)=>{
    if(csPlayer.initialized){
    csPlayers[videoTag]["videoTag"].playVideo();
    }else{
    console.error("Player not initialized yet.");
    }},
getDuration: (videoTag)=>{
    if(csPlayer.initialized){
    return csPlayers[videoTag]["videoTag"].getDuration();
    }else{
    console.error("Player not initialized yet.");
    }},
getCurrentTime: (videoTag)=>{
    if(csPlayer.initialized){
    return csPlayers[videoTag]["videoTag"].getCurrentTime();
    }else{
    console.error("Player not initialized yet.");
    }},
};
