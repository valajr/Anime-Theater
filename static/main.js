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
let slide_timeout = null;
let slide = 0;

async function fetchAnime(type, key='') {
    key.replace(/ /g,"-");
    let api_response = await fetch(API_LINK + type + key);
    let data = await api_response.json();
    return data;
}

async function searchGenre() {
    let genre = document.querySelector('#searchGenre').value;
    console.log(await fetchAnime(SEARCH.by_genre + genre))
}

async function searchRecent() {
    let anime_names = document.querySelectorAll('.slide-anime');
    let anime_slides = document.querySelectorAll('.slide > img');
    let recent_animes = await fetchAnime(SEARCH.recent);

    for(let i=0; i<MAX_RECENT; i++) {
        anime_names[i].innerHTML = recent_animes[i][ANIME.title];
        anime_slides[i].src = recent_animes[i][ANIME.image];
    }
}

function addGenres(select) {
    for(i=0; i<GENRE.length; i++)
        select.innerHTML += `<option value="${GENRE[i]}">${GENRE[i]}</option>`;
}

function nextSlide() {
    clearTimeout(slide_timeout);

    showRecents();
}

function prevSlide() {
    clearTimeout(slide_timeout);

    let prev = true;
    showRecents(prev);
}

function showRecents(prev=false) {
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    let i;

    for(i=0; i<MAX_RECENT; i++)
        slides[i].style.display = 'none';
    for(i=0; i<MAX_RECENT; i++)
        dots[i].className = dots[i].className.replace(' active', '');

    if(!prev) {
        slide++;
        if(slide > MAX_RECENT)
            slide = 1;
    }
    else {
        slide--;
        if(slide < 1)
            slide = MAX_RECENT;
    }
    
    slides[slide - 1].style.display = 'block';
    dots[slide - 1].className += ' active';
    slide_timeout = setTimeout(showRecents, 2000);
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