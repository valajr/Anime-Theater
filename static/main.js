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

const GENRE = ['action', 'adventure', 'cars', 'comedy', 'crime', 'dementia',
            'demons', 'drama', 'dub', 'ecchi', 'family', 'fantasy', 'game',
            'gourmet', 'harem', 'historical', 'horror', 'josei', 'kids', 'magic',
            'martial-arts', 'mecha', 'military', 'mystery', 'parody', 'police',
            'psychological', 'romance', 'samurai', 'school', 'sci-fi', 'seinen',
            'shoujo', 'shoujo-ai', 'shounen', 'shounen-ai', 'slice-of-Life',
            'space', 'sports', 'super-power', 'supernatural', 'suspense',
            'thriller', 'vampire', 'yaoi', 'yuri'];

const MAX_RECENT = 5;
let SLIDE_TIMEOUT = null;
let SLIDE = 0;

async function fetchAnime(type, key='') {
    key.replace(/ /g,"-");
    let api_response = await fetch(API_LINK + type + key);
    let data = await api_response.json();
    return data;
}

function addGenres(select) {
    for(i=0; i<GENRE.length; i++)
        select.innerHTML += `<option value="${GENRE[i]}">${GENRE[i]}</option>`;
}

async function searchGenre() {
    let genre = document.querySelector('#searchGenre').value;
    console.log(genre);
    console.log(await fetchAnime(SEARCH.by_genre + genre))
}

async function searchRecent() {
    let anime_names = document.querySelectorAll('.slide-anime-name');
    let anime_slides= document.querySelectorAll('.slide > img');
    let recent_animes = await fetchAnime(SEARCH.recent);

    for(let i=0; i<MAX_RECENT; i++) {
        console.log(anime_names[i]);
        console.log(anime_slides[i]);
        console.log(recent_animes[i]);
        anime_names[i].innerHTML = recent_animes[i].animeTitle;
        anime_slides[i].src = recent_animes[i].animeImg;
    }
}

function showRecents() {
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    let i;

    for(i=0; i<MAX_RECENT; i++)
        slides[i].style.display = 'none';
    for(i=0; i<MAX_RECENT; i++)
        dots[i].className = dots[i].className.replace(' active', '');

    SLIDE++;
    if(SLIDE > MAX_RECENT)
        SLIDE = 1;
    
    slides[SLIDE - 1].style.display = 'block';
    dots[SLIDE - 1].className += ' active';
    SLIDE_TIMEOUT = setTimeout(showRecents, 2000);
}


addGenres(document.querySelector('#searchGenre'));
searchRecent();
showRecents();





let search = document.querySelector('#searchName');

search.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        if(search.value !== '')
            console.log(await fetchAnime(SEARCH.by_name, search.value));
    }
});