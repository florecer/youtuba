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
}

var videoListIds = [];
var videoCount = 0;

function onPlayerStateChange(event) {
  if (event.data == 0) {
    if (videoCount >= videoListIds.length) {
      videoCount = 0;
      player.loadVideoById(videoListIds[videoCount]);
      videoCount++;
    }
    else {
      player.loadVideoById(videoListIds[videoCount]);
      videoCount++;
    }
  }
}

function onPlayerReady() {
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
  videoCount++;
}

var playByKeywordId = 0;
var countSelections = 0;
function selectByButton0() {
  console.log("selectByButton0");
  playByKeywordId = 0;
  videoListIds[countSelections] = catchSearchByKeywordId[0];
  countSelections++;
  addInfo2Playlist(0);
}

function selectByButton1() {
  console.log("selectByButton1");
  playByKeywordId = 1;
  videoListIds[countSelections] = catchSearchByKeywordId[1];
  countSelections++;
  addInfo2Playlist(1);
}

function selectByButton2() {
  console.log("selectByButton2");
  playByKeywordId = 2;
  videoListIds[countSelections] = catchSearchByKeywordId[2];
  countSelections++;
  addInfo2Playlist(2);
}

function selectByButton3() {
  console.log("selectByButton3");
  playByKeywordId = 3;
  videoListIds[countSelections] = catchSearchByKeywordId[3];
  countSelections++;
  addInfo2Playlist(3);
}

function selectByButton4() {
  console.log("selectByButton3");
  playByKeywordId = 4;
  videoListIds[countSelections] = catchSearchByKeywordId[4];
  countSelections++;
  addInfo2Playlist(4);
}

function playListButton() {
  createPlayer();
}

function nextVidButton() {
  if(videoCount < videoListIds.length) {
    player.loadVideoById(videoListIds[videoCount]);
    videoCount++;
  }
  else {
    videoCount = 0;
    player.loadVideoById(videoListIds[videoCount]);
    videoCount++;
  }
}

var add2PlaylistInfo =[];

function addInfo2Playlist(l) {
  add2PlaylistInfo.push(catchSearchByKeywordTitle[l]);
}

function displayPlaylist() {
  for(var k = 0; k < add2PlaylistInfo.length; k++) {
    var para = document.createElement("P");
    var trackNo = document.createTextNode("track No. " + k + " ");
    var info = document.createTextNode(add2PlaylistInfo[k]);
    para.id = k;
    para.addEventListener("click", function playDirect() {
      console.log("event listener");
      console.log(videoListIds);
      console.log(videoListIds.length);
      console.log(k);
      console.log(videoListIds[this.id]);
      console.log(this.id);
      console.log(this);
      player.loadVideoById(videoListIds[this.id]);
      countVideo = this.id;
//      player.loadVideoById(videoListIds[selectText(para.id,8)]);
    });
    para.appendChild(trackNo);
    para.appendChild(info);
    document.getElementById("dispPlaylistContainer").appendChild(para);
  }
}
