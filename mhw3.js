const key_gif = 'mAvCsm3x3r5UhimJjQvAbWmHVSf8Uomb';
const gif_api_endpoint = 'http://api.giphy.com/v1/gifs/search';


function onResponse(response){
    console.log('risposta ricevuta')
    return response.json();
}

function onTokenResponse(response) {
    return response.json();
}

function getToken(json)
{
	token_data = json;
	
}


function onJson(json){
   console.log('json GIF ricevuto');
   console.log(json);
   const risata=document.querySelector('#risata') 
   risata.innerHTML='';
   const results=json.data;
   for(result of results){
    console.log(result+'questo è un result');
   }
   
   for(result of results){
    console.log(result);
    const immagine=result.images.downsized_medium.url;
    const img=document.createElement('img');
    img.src=immagine;
    risata.appendChild(img);
   }
   
}
   
    



function search(event){
    event.preventDefault();
    const a1_input = document.querySelector('#a1');
    const a1_value = encodeURIComponent(a1_input.value);
    gif_request = gif_api_endpoint + '?api_key='  + key_gif + '&q=' + a1_value + '&limit=' + 4;
    fetch(gif_request).then(onResponse).then(onJson);
}

function prevent(event) {
	event.preventDefault();
}


const form = document.querySelector('#gif');
form.addEventListener('submit', search);

const clientId = "462d98b2adef4375958591ff7a2330f2" ; 
const clientSec = "7ca7c516b35746719263a6af1312400a" ; 

function onJsonSpotify(json) {
   
    const song = document.querySelector('#song');
    song.innerHTML = '';

    const result = json.tracks.items[0] ;

    const album = document.createElement('span');
    const name_album = result.album.name;
    album.textContent = "Album: " + name_album;

    const artist = document.createElement('span');
    const name_artist = result.artists[0].name;
    artist.textContent = "Artist: " + name_artist;

    const image = document.createElement('img');
    image.src = result.album.images[0].url;

    const link = document.createElement('a');
    const url_link = result.preview_url;
    link.textContent = "Click per ascoltare";
    link.href = url_link;
   
    
    song.appendChild(image);
    song.appendChild(artist);
    song.appendChild(album);
    song.appendChild(link);   
}

function searchOnSpotify(event){
    event.preventDefault();
	const song_input = document.querySelector('#author');
    const song_value = encodeURIComponent(song_input.value);
    fetch("https://api.spotify.com/v1/search?type=track&include_external=audio&q=" + song_value,
    {
        headers:
        {
            'Authorization': 'Bearer ' + token_data.access_token
        }
    }
    ).then(onResponse).then(onJsonSpotify);
}




let token_data;
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSec)
    }
}
).then(onTokenResponse).then(getToken);



const formMusic = document.querySelector('#music');
formMusic.addEventListener('submit', searchOnSpotify);