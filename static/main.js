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
let recent_timeout = null;
let slide_recent = 0;
let popular_timeout = null;
let slide_popular = 0;

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

async function getCarouselData(type) {
    let anime_names = document.querySelectorAll(`.${type}-anime > .anime-name`);
    let anime_slides = document.querySelectorAll(`.${type}-anime > img`);

    let animes = [];
    if(type === 'recent')
        animes = await fetchAnime(SEARCH.recent);
    else
        animes = await fetchAnime(SEARCH.popular);

    for(let i=0; i<MAX_RECENT; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title];
        anime_slides[i].src = animes[i][ANIME.image];
    }
}

function addGenres(select) {
    for(i=0; i<GENRE.length; i++)
        select.innerHTML += `<option value="${GENRE[i]}">${GENRE[i]}</option>`;
}

function nextSlide(type) {
    if(type === 'recent')
        clearTimeout(recent_timeout);
    else
        clearTimeout(popular_timeout);

    showAnimes(type);
}

function prevSlide(type) {
    if(type === 'recent')
        clearTimeout(recent_timeout);
    else
        clearTimeout(popular_timeout);

    let prev = true;
    showAnimes(type, prev);
}

function showAnimes(type, prev=false) {
    let slides = document.querySelectorAll(`.${type}-anime`);
    let dots = document.querySelectorAll(`.${type}-carousel > .dot-line > .dot`);
    let i;

    for(i=0; i<MAX_RECENT; i++)
        slides[i].style.display = 'none';
    for(i=0; i<MAX_RECENT; i++)
        dots[i].className = dots[i].className.replace(' active', '');

    if(type === 'recent') {
        if(!prev) {
            slide_recent++;
            if(slide_recent > MAX_RECENT)
                slide_recent = 1;
        }
        else {
            slide_recent--;
            if(slide_recent < 1)
                slide_recent = MAX_RECENT;
        }
    }
    else {
        if(!prev) {
            slide_popular++;
            if(slide_popular > MAX_RECENT)
                slide_popular = 1;
        }
        else {
            slide_popular--;
            if(slide_popular < 1)
                slide_popular = MAX_RECENT;
        }
    }
    
    if(type === 'recent') {
        slides[slide_recent - 1].style.display = 'block';
        dots[slide_recent - 1].className += ' active';
        recent_timeout = setTimeout(() => {showAnimes(type)}, 2000);
    }
    else {
        slides[slide_popular - 1].style.display = 'block';
        dots[slide_popular - 1].className += ' active';
        popular_timeout = setTimeout(() => {showAnimes(type)}, 2000);
    }
}


addGenres(document.querySelector('#searchGenre'));
getCarouselData('recent');
showAnimes('recent');
getCarouselData('popular');
showAnimes('popular');





let search = document.querySelector('#searchName');

search.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        if(search.value !== '')
            console.log(await fetchAnime(SEARCH.by_name, search.value));
    }
});