// anime search https://gogoanime.herokuapp.com/search?keyw=naruto
// genre https://gogoanime.herokuapp.com/genre/action
// anime details https://gogoanime.herokuapp.com/anime-details/naruto
// recent episode https://gogoanime.herokuapp.com/recent-release 
// popular anime https://gogoanime.herokuapp.com/popular 
// top airing https://gogoanime.herokuapp.com/top-airing
// anime movies https://gogoanime.herokuapp.com/anime-movies
// anime streaming https://gogoanime.herokuapp.com/vidcdn/watch/naruto-episode-220
// anime streaming 2 https://gogoanime.herokuapp.com/streamsb/watch/naruto-episode-220
// anime thread https://gogoanime.herokuapp.com/thread/spy-x-family-episode-9?page=1

const API_LINK = 'https://gogoanime.herokuapp.com/';

const SEARCH = {
    'by_name': 'search?keyw=',
    'by_genre': 'genre/',
    'anime_details': 'anime-details/',
    'recent': 'recent-release',
    'popular': 'popular',
    'top_airing': 'top-airing',
    'movies': 'anime-movies',
    'stream_01': 'vidcdn/watch/',
    'stream_02': 'streamsb/watch/',
    'thread': 'thread/'
}

const ANIME = {
    'title': 'animeTitle',
    'image': 'animeImg',
    'status': 'status',
    'episodes': 'totalEpisodes'
}

async function fetchAnime(type, key='') {
    key.replace(/ /g,"-");
    let api_response = await fetch(API_LINK + type + key);
    let data = await api_response.json();
    return data;
}

let search = document.querySelector('#searchName');

search.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        if(search.value !== '')
            console.log(await fetchAnime(SEARCH.by_name, search.value));
    }
});