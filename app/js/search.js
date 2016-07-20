// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

var catchPlayByKeyword = {};
var catchSearchByKeywordTitle = "";
var catchSearchByKeywordDesc = "";
var catchSearchByKeywordKind = "";

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
    catchPlayByKeyword = response.items[0].id.videoId;
    if( response.items[0].id.kind != "youtube#video") {
      catchPlayByKeyword = "tbwUSJ7a_K0";
    }
    catchSearchByKeywordTitle = response.items[0].snippet.title;
    catchSearchByKeywordDesc = response.items[0].snippet.description;
    catchSearchByKeywordKind = response.items[0].id.kind;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');

//    search();
}

var inputKeySearch = "";

function search() {
    inputKeySearch = document.getElementById("keyWordSearch").value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: inputKeySearch
    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function getUsrInput() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: catchPlayByKeyword,
    key: 'AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var videoCounter = 0;

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  getUsrInput();
  event.target.playVideo();
}

function stopVideo() {
  player.stopVideo();
}

function onPlayerStateChange(event) {
  console.log(event.data);

  if(event.data === YT.PlayerState.ENDED) {
    player.videoId = 'dCmJ5KmCKMs';  //tbwUSJ7a_K0
    videoCounter ++;
    console.log("on onPlayerChangeState function PlayerState.ENDED");
    console.log("Set player.videoId to " + player.videoId);
    console.log("videoCounter = " + videoCounter);
  }
}

// Helper function to display keyWordSearch JavaScript vars value on HTML page.
function showKeyWordSearch(keyWordSearchDisplay) {
    document.getElementById('keyWordSearchDisplay').innerHTML += catchSearchByKeywordTitle;
    document.getElementById('keyWordSearchDisplay').innerHTML += "<br>";
    document.getElementById('keyWordSearchDisplay').innerHTML += catchSearchByKeywordDesc;
    document.getElementById('keyWordSearchDisplay').innerHTML += "<br>";
    document.getElementById('keyWordSearchDisplay').innerHTML += catchSearchByKeywordKind;
    document.getElementById('keyWordSearchDisplay').innerHTML += "<br>";
}
