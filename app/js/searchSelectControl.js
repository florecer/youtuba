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

var player = {};

function onYouTubeIframeAPIReady() {
  console.log("onIframeApi()");
}

function onPlayerStateChange(event) {
  if (event.data == 0) {
    console.log("video ended");
    player.loadVideoById(catchSearchByKeywordId[1]);
  }
}

function onPlayerReady() {
  console.log("onPlayerReady()");
}

function createPlayer() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: catchSearchByKeywordId[0],
    playerVars: { 'autoplay': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  console.log(player);
}

function selectByButton() {
  console.log("selectByButton()");
}
