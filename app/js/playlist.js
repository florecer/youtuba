function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
}

var inputKeySearch = "";

function search() {
    inputKeySearch = document.getElementById("keyWordSearch").value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: inputKeySearch,
        type: "video"
    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
  showResponse(response);
}

var catchSearchByKeywordId = [];
var catchSearchByKeywordTitle = [];
var catchSearchByKeywordDesc = [];

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML += responseString;
  for (var i =0; i<response.items.length; i++) {
    catchSearchByKeywordTitle[i] = response.items[i].snippet.title;
    catchSearchByKeywordDesc[i] = response.items[i].snippet.description;
    catchSearchByKeywordId[i] = response.items[i].id.videoId;
    document.getElementById("dispInfoTitle" + i).innerHTML = catchSearchByKeywordTitle[i];
    document.getElementById("dispInfoDesc" + i).innerHTML = catchSearchByKeywordDesc[i];
  }
}

function onYouTubeIframeAPIReady() {
  console.log("onIframeApi()");
//  createPlayer();
}

var videoListIds = [];
var videoCount = 0;

function onPlayerStateChange(event) {
  if (event.data == 0) {
    videoCount++;
    console.log("video ended");
    console.log(videoCount);
    console.log(videoListIds[videoCount]);
    player.loadVideoById(videoListIds[videoCount]);
  }
}

function playList() {
  player.loadVideoById(videoListIds[countSelections]);
}

function onPlayerReady() {
  console.log("onPlayerReady()");
}

var player = {};
function createPlayer() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoListIds[0],
    playerVars: { 'autoplay': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var playByKeywordId = 0;
var countSelections = -1;
function selectByButton0() {
  console.log("selectByButton0");
  countSelections++;
  playByKeywordId = 0;
  videoListIds[countSelections] = catchSearchByKeywordId[0];
//  player.loadVideoById(catchSearchByKeywordId[0]);
}

function selectByButton1() {
  console.log("selectByButton1");
  countSelections++;
  playByKeywordId = 1;
  videoListIds[countSelections] = catchSearchByKeywordId[1];
//  player.loadVideoById(catchSearchByKeywordId[1]);
}

function selectByButton2() {
  console.log("selectByButton2");
  countSelections++;
  playByKeywordId = 2;
  videoListIds[countSelections] = catchSearchByKeywordId[2];
//  player.loadVideoById(catchSearchByKeywordId[2]);
}

function selectByButton3() {
  console.log("selectByButton3");
  countSelections++;
  playByKeywordId = 3;
  videoListIds[countSelections] = catchSearchByKeywordId[3];
//  player.loadVideoById(catchSearchByKeywordId[3]);
}

function selectByButton4() {
  console.log("selectByButton4");
  countSelections++;
  playByKeywordId = 4;
//  player.loadVideoById(catchSearchByKeywordId[4]);
videoListIds[countSelections] = catchSearchByKeywordId[4];
}

function playListButton() {
  createPlayer();
}
