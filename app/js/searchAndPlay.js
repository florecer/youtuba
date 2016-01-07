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
    console.log(catchSearchByKeywordTitle);

}

var player;


function playVideo0() {
  console.log("http://www.youtube.com/embed/" + catchSearchByKeywordId[0] + "?autoplay=1");
  document.getElementById('iFramePlay').src = "http://www.youtube.com/embed/" + catchSearchByKeywordId[0] + "?autoplay=1";
}

function playVideo1() {
  console.log("http://www.youtube.com/embed/" + catchSearchByKeywordId[1] + "?autoplay=1");
  document.getElementById('iFramePlay').src = "http://www.youtube.com/embed/" + catchSearchByKeywordId[1] + "?autoplay=1";
}

function playVideo2() {
  console.log("http://www.youtube.com/embed/" + catchSearchByKeywordId[2] + "?autoplay=1");
  document.getElementById('iFramePlay').src = "http://www.youtube.com/embed/" + catchSearchByKeywordId[2] + "?autoplay=1";
}

function playVideo3() {
  console.log("http://www.youtube.com/embed/" + catchSearchByKeywordId[3] + "?autoplay=1");
  document.getElementById('iFramePlay').src = "http://www.youtube.com/embed/" + catchSearchByKeywordId[3] + "?autoplay=1";
}

function playVideo4() {
  console.log("http://www.youtube.com/embed/" + catchSearchByKeywordId[4] + "?autoplay=1");
  document.getElementById('iFramePlay').src = "http://www.youtube.com/embed/" + catchSearchByKeywordId[4] + "?autoplay=1";
}
