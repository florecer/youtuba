var player = {};
var videoList = [];
var inputKeySearch = "";
var nextPageToken, prevPageToken;
var currentViewPL = false;
var elemByPag = 5;
var totalPages = 0;
var currentPage = 0;
var elemPlaylist = 0;
var searchCurrentId = "";

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCof2cba1gVvh3rRscjl59wZOSBpD634PA');
}

function search(pageToken) {
	inputKeySearch = document.getElementById("keyWordSearch").value;
	var requestOptions = {
		part: 'snippet',
		q: inputKeySearch,
		type: "video"
	 };
	if (pageToken) {
		requestOptions.pageToken = pageToken;
	}
	var request = gapi.client.youtube.search.list(requestOptions);
	request.execute(onSearchResponse);
}

function onSearchResponse(response) {
	nextPageToken = response.result.nextPageToken;
    var nextVis = nextPageToken ? false : true;
	document.getElementById("next-button").disabled = nextVis;

    prevPageToken = response.result.prevPageToken;
    var prevVis = prevPageToken ? false : true;
    document.getElementById("prev-button").disabled = prevVis;

	 showResponse(response);
}

function showResponse(response) {
	clearList();
	for (var i =0; i<response.items.length; i++) {
		var listElement = document.createElement("li");
		listElement.className = "list-group-item";
		listElement.idvideo=response.items[i].id.videoId;
		if(searchCurrentId==listElement.idvideo){
			listElement.className += " active";
		}
		listElement.addEventListener("click", function playDirect() {
			player.loadVideoById(this.idvideo);
			searchCurrentId=this.idvideo;
			$(this).addClass('active').siblings().removeClass('active');
		});
		var divMedia = document.createElement("div");
		divMedia.className = "media";
		var divMediaB = document.createElement("div");
		divMediaB.className = "media-body";
		var infoText = document.createElement("a");
		var titleText = document.createTextNode(response.items[i].snippet.title);
		infoText.appendChild(titleText);
		divMediaB.appendChild(infoText);
		divMedia.appendChild(divMediaB);
		listElement.appendChild(divMedia);
		document.getElementById("search-list").appendChild(listElement);
	}
}

function onYouTubeIframeAPIReady() {
	 createPlayer();
}

function onPlayerStateChange(event) {
	if(currentViewPL){
		if (event.data == 0) {
			if (elemPlaylist >= videoList.length-1) {
				elemPlaylist = 0;
				currentPage = 0;
				showPlaylist();
				player.loadVideoById(videoList[elemPlaylist].id);
			}
			else {
				if((currentPage*elemByPag+elemByPag)-1==elemPlaylist){
					currentPage++;
				}
				elemPlaylist++;
				player.loadVideoById(videoList[elemPlaylist].id);
				showPlaylist();
			}
		}
	}
	var ButtonDisabled = (event.data == 0 || event.data == 1 || event.data == 2) ? false : true;
	var saveButton=document.getElementById("save-button");
	if(saveButton){
		saveButton.disabled = ButtonDisabled;
	}
	var removeButton=document.getElementById("remove-button");
	if(removeButton){
		removeButton.disabled = ButtonDisabled;
	}
}

function onPlayerReady() {

}

function createPlayer() {
  player = new YT.Player('player', {
		//height: '390',
		//width: '640',
		//videoId: '2GLe6hEC0zg',
		playerVars: { 'autoplay': 1 },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function saveToPlaylist(){
	var videoData = {};
	videoData.id =  player.getVideoData()['video_id'];
	videoData.title =  player.getVideoData()['title'];

	videoList.push(videoData);
	var msj="<strong>The video has been successfully saved to playlist</strong>";
	showAlert(msj);
}

function removeFromPlaylist(){
	var obtRem;
	var lastElement=false;
	if(videoList.length==elemPlaylist+1){
		lastElement=true;
	}
	obtRem=videoList.splice(elemPlaylist, 1);
	var msj="<strong>The video has been successfully removed from playlist</strong>";
	showAlert(msj);
	if(videoList.length == 0){
		player.destroy();
		document.getElementById("remove-button").disabled=true;
		player = new YT.Player('player', {
			//height: '390',
			//width: '640',
			//videoId: '2GLe6hEC0zg',
			playerVars: { 'autoplay': 1 },
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		clearList();
		currentPage = 0;
		elemPlaylist = 0;
	}
	else{
		if(lastElement){
			currentPage = 0;
			elemPlaylist = 0;
		}
		player.loadVideoById(videoList[elemPlaylist].id);
		showPlaylist();
	}

}

function nextPage() {
  search(nextPageToken);
}

function previousPage() {
  search(prevPageToken);
}

function playlistView(){
	player.destroy();
	currentPage = 0;
	elemPlaylist = 0;
	currentViewPL=true;
	$("#container").load("playlist.html",function(){
		var vId=null;
		if(videoList.length > 0){
			vId=videoList[elemPlaylist].id;
		}
		player = new YT.Player('player', {
			//height: '390',
			//width: '640',
			videoId: vId,
			playerVars: { 'autoplay': 1 },
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		showPlaylist();
	});
}

function searchView(){
	player.destroy();
	searchCurrentId = "";
	$("#container").load("search.html",function(){
		player = new YT.Player('player', {
			//height: '390',
			//width: '640',
			//videoId: '2GLe6hEC0zg',
			playerVars: { 'autoplay': 1 },
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		currentViewPL=false;
	});
}

function showPlaylist(){
	if(videoList.length>0){
		totalPages = Math.ceil(videoList.length / elemByPag)-1;
		if(currentPage>totalPages){
			currentPage=totalPages;
		}
		showPagePlaylist();
		var nextListVis = (currentPage<totalPages) ? false : true;
		document.getElementById("next-button-list").disabled = nextListVis;
		var prevtListVis = (currentPage==0) ? true : false;
		document.getElementById("prev-button-list").disabled = prevtListVis;
	}
}

function showPagePlaylist(){
	var pagina;
	var pag=currentPage*elemByPag;
	if(videoList.length > pag){
		pagina = videoList.slice(pag, pag + elemByPag);
		clearList();
		for (var i =0; i<pagina.length; i++) {
			var listElement = document.createElement("li");
			listElement.className = "list-group-item";
			if(elemPlaylist==i+currentPage*elemByPag){
				listElement.className += " active";
			}
			listElement.id="list-elem-"+i;
			listElement.idvideo=pagina[i].id;
			listElement.positionlist=i;
			listElement.addEventListener("click", function playDirect() {
				player.loadVideoById(this.idvideo);
				elemPlaylist=this.positionlist+currentPage*elemByPag;
				$(this).addClass('active').siblings().removeClass('active');
			});
			var divMedia = document.createElement("div");
			divMedia.className = "media";
			var divMediaB = document.createElement("div");
			divMediaB.className = "media-body";
			var infoText = document.createElement("a");
			var titleText = document.createTextNode(pagina[i].title);
			infoText.appendChild(titleText);
			divMediaB.appendChild(infoText);
			divMedia.appendChild(divMediaB);
			listElement.appendChild(divMedia);
			document.getElementById("play-list").appendChild(listElement);
		}
	}
}

function nextPageList(){
	currentPage++;
	showPlaylist();
}

function previousPageList(){
	currentPage--;
	showPlaylist();
}

function clearList(){
	var childPlayList = document.getElementsByClassName("list-group-item");
	if(childPlayList.length>0){
		for(var a = childPlayList.length-1; 0 <= a; a--){
			if(childPlayList[a] && childPlayList[a].parentElement){
				childPlayList[a].parentElement.removeChild(childPlayList[a]);
			}
		}
	}
}

function showAlert(msj) {
	document.getElementById('success-alert').innerHTML=msj;
	$("#success-alert").removeClass('hidden');
	$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){});
}
