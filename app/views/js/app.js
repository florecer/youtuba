var player = {};
var videoList = [];
var inputKeySearch = "";
var nextPageToken, prevPageToken;
var elemByPag = 5;
var totalPages = 0;
var currentPage = 0;
var elemPlaylist = 0;
var searchList = true;

function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
	gapi.client.setApiKey('AIzaSyCof2cba1gVvh3rRscjl59wZOSBpD634PA');
}

function onSearchViewReady() {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function search(pageToken) {
	searchList = true;
	inputKeySearch = document.getElementById("keywordSearch").value;
	var playlistButton = document.getElementById("show-playlist");
	if(videoList.length > 0 && playlistButton.disabled == true) {
		playlistButton.disabled = false;
		currentPage = Math.ceil((elemPlaylist+1)/elemByPag)-1;
	}
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
		var divMedia = document.createElement("div");
		divMedia.className = "media";
		var divMediaL = document.createElement("div");
		divMediaL.className = "media-left";
		var imgMediaObjet = document.createElement("img");
		imgMediaObjet.className = "media-object";
		imgMediaObjet.src =  response.items[i].snippet.thumbnails.default.url;
		var divMediaB = document.createElement("div");
		divMediaB.className = "media-body";
		var divInputGroup = document.createElement("div");
		divInputGroup.className = "input-group";
		var titleText = document.createTextNode(response.items[i].snippet.title);
		var aTitle = document.createElement("p");
		var inputGroupSpan = document.createElement("span");
		inputGroupSpan.className = "input-group-btn";
		var inputGroupBtn = document.createElement("button");
		inputGroupBtn.idvideo = response.items[i].id.videoId;
		inputGroupBtn.titlevideo = response.items[i].snippet.title;
		inputGroupBtn.thumbnailvideo = response.items[i].snippet.thumbnails.default.url;
		inputGroupBtn.className = "btn btn-success";
		inputGroupBtn.type = "button";
		inputGroupBtn.onclick = function() {
			saveToPlaylist(this.idvideo,this.titlevideo,this.thumbnailvideo);
		};
		var spanBtn = document.createElement("span");
		spanBtn.className = "glyphicon glyphicon-ok";

		inputGroupBtn.appendChild(spanBtn);
		inputGroupSpan.appendChild(inputGroupBtn);
		aTitle.appendChild(titleText);
		divInputGroup.appendChild(aTitle);
		divInputGroup.appendChild(inputGroupSpan);
		divMediaB.appendChild(divInputGroup);
		divMediaL.appendChild(imgMediaObjet);
		divMedia.appendChild(divMediaL);
		divMedia.appendChild(divMediaB);
		listElement.appendChild(divMedia);
		document.getElementById("list").appendChild(listElement);
	}
}

function onYouTubeIframeAPIReady() {
	createPlayer();
}

function onPlayerStateChange(event) {
	if (event.data == 0) {
		if (elemPlaylist >= videoList.length-1) {
			elemPlaylist = 0;
			currentPage = 0;
			if(!searchList) {
				showPlaylist();
			}
			player.loadVideoById(videoList[elemPlaylist].id);
		}
		else {
			if((currentPage*elemByPag+elemByPag)-1 == elemPlaylist) {
				currentPage++;
			}
			elemPlaylist++;
			player.loadVideoById(videoList[elemPlaylist].id);
			if(!searchList) {
				showPlaylist();
			}
		}
	}
	var ButtonDisabled = (event.data == 0 || event.data == 1 || event.data == 2) ? false : true;
	var saveButton = document.getElementById("save-button");
	if(saveButton) {
		saveButton.disabled = ButtonDisabled;
	}
	var removeButton = document.getElementById("remove-button");
	if(removeButton) {
		removeButton.disabled = ButtonDisabled;
	}
}

function onPlayerReady() {

}

function createPlayer() {
	player = new YT.Player('player', {
		playerVars: { 'autoplay': 1 },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function saveToPlaylist(id,title,thumbnail) {
	var videoData = {};
	videoData.id =  id;
	videoData.title =  title;
	videoData.thumbnail =  thumbnail;
	videoList.push(videoData);
	var playlistButton = document.getElementById("show-playlist");
	if(playlistButton.disabled == true) {
		playlistButton.disabled = false;
	}
	var msj = "<strong>The video has been successfully saved to playlist</strong>";
	showAlert(msj);
}

function removeFromPlaylist(remElem) {
	if(remElem == elemPlaylist) {
		var lastElement = false;
		if(videoList.length == elemPlaylist+1) {
			lastElement = true;
		}
		videoList.splice(elemPlaylist, 1);
		var msj="<strong>The video has been successfully removed from playlist</strong>";
		showAlert(msj);
		if(videoList.length == 0) {
			player.destroy();
			player = new YT.Player('player', {
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
		else {
			if(lastElement) {
				currentPage = 0;
				elemPlaylist = 0;
			}
			player.loadVideoById(videoList[elemPlaylist].id);
			showPlaylist();
		}
	}
	else {
		if(remElem < elemPlaylist){
			videoList.splice(remElem, 1);
			var msj = "<strong>The video has been successfully removed from playlist</strong>";
			showAlert(msj);
			elemPlaylist--;
			showPlaylist();
		}
		else {
			videoList.splice(remElem, 1);
			var msj = "<strong>The video has been successfully removed from playlist</strong>";
			showAlert(msj);
			showPlaylist();
		}
	}
}

function nextPage() {
	if(searchList) {
		search(nextPageToken);
	}
	else {
		currentPage++;
		showPlaylist();
	}
}

function previousPage() {
	if(searchList) {
		search(prevPageToken);
	}
	else {
		currentPage--;
		showPlaylist();
	}
}

function showPlaylist() {
	searchList = false;
	var playlistButton = document.getElementById("show-playlist");
	if(playlistButton.disabled == false) {
		playlistButton.disabled = true;
		document.getElementById("keywordSearch").value="";
	}
		totalPages = Math.ceil(videoList.length / elemByPag)-1;
		if(currentPage > totalPages) {
			currentPage = totalPages;
		}
		showPagePlaylist();
		var nextListVis = (currentPage<totalPages) ? false : true;
		document.getElementById("next-button").disabled = nextListVis;
		var prevtListVis = (currentPage == 0) ? true : false;
		document.getElementById("prev-button").disabled = prevtListVis;
}

function showPagePlaylist() {
	var pagina;
	var pag = currentPage*elemByPag;
	if(videoList.length > pag) {
		pagina = videoList.slice(pag, pag + elemByPag);
		clearList();
		for (var i =0; i<pagina.length; i++) {
			var listElement = document.createElement("li");
			listElement.className = "list-group-item";
			if(elemPlaylist == i+currentPage*elemByPag) {
				listElement.className += " active";
			}
			var divMedia = document.createElement("div");
			divMedia.className = "media";
			
			var divMediaL = document.createElement("div");
			divMediaL.className = "media-left";
			var imgMediaObjet = document.createElement("img");
			imgMediaObjet.className = "media-object";
			imgMediaObjet.src =  pagina[i].thumbnail;
			
			var divMediaB = document.createElement("div");
			divMediaB.className = "media-body";
			var divInputGroup = document.createElement("div");
			divInputGroup.className = "input-group";
			var titleText = document.createTextNode(pagina[i].title);
			var aTitle = document.createElement("a");
			aTitle.idvideo = pagina[i].id;
			aTitle.positionlist = i;
			aTitle.onclick = function() {
				player.loadVideoById(this.idvideo);
				elemPlaylist=this.positionlist+currentPage*elemByPag;
				$(this).parent().parent().parent().parent().addClass('active').siblings().removeClass('active');
			};
			var inputGroupSpan = document.createElement("span");
			inputGroupSpan.className = "input-group-btn";
			var inputGroupBtn = document.createElement("button");
			inputGroupBtn.positionlist = i;
			inputGroupBtn.className = "btn btn-danger";
			inputGroupBtn.type = "button";
			inputGroupBtn.onclick = function() {
				removeFromPlaylist(this.positionlist+currentPage*elemByPag);
			};
			var spanBtn = document.createElement("span");
			spanBtn.className = "glyphicon glyphicon-remove";

			inputGroupBtn.appendChild(spanBtn);
			inputGroupSpan.appendChild(inputGroupBtn);
			aTitle.appendChild(titleText);
			divInputGroup.appendChild(aTitle);
			divInputGroup.appendChild(inputGroupSpan);
			divMediaB.appendChild(divInputGroup);
			divMediaL.appendChild(imgMediaObjet);
			divMedia.appendChild(divMediaL);
			divMedia.appendChild(divMediaB);
			listElement.appendChild(divMedia);
			document.getElementById("list").appendChild(listElement);
		}
	}
}

function clearList() {
	var childPlayList = document.getElementsByClassName("list-group-item");
	if(childPlayList.length>0) {
		for(var a = childPlayList.length-1; 0 <= a; a--) {
			if(childPlayList[a] && childPlayList[a].parentElement) {
				childPlayList[a].parentElement.removeChild(childPlayList[a]);
			}
		}
	}
}

function showAlert(msj) {
	document.getElementById('success-alert').innerHTML = msj;
	$("#success-alert").removeClass('hidden');
	$("#success-alert").fadeTo(2000, 500).slideUp(500, function() {});
}