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
    'episodes': 'totalEpisodes',
    'synopsis': 'synopsis'
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
let banner_timeout = null;
let slide_banner = 0;

async function fetchAnime(type, key='', img=false) {
    if(!img) {
        key = key.replace(/!|\?|:|\(|\)/g,"");
        key = key.replace(/ - /g,"-");
        key = key.replace(/ /g,"-");
    }
    else {
        key = key.replace(/https:\/\/gogocdn.net\/cover\//g, '');
        key = key.replace(/.png/g, '');
    }

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
    console.log(await fetchAnime(SEARCH.by_genre + genre))
}

let search = document.querySelector('#searchName');
search.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        if(search.value !== '')
            console.log(await fetchAnime(SEARCH.by_name, search.value));
    }
});

function nextSlide() {
    clearTimeout(banner_timeout);
    showCarousel();
}

function prevSlide() {
    clearTimeout(banner_timeout);
    let prev = true;
    showCarousel(prev);
}

async function getBannerData() {
    let animes = await fetchAnime(SEARCH.recent);
    let anime_names = document.querySelectorAll('.anime-name');
    let anime_imgs = document.querySelectorAll('.banner-anime > img');
    let anime_synopses = document.querySelectorAll('.anime-synopsis');


    for(let i=0; i<MAX_RECENT; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title];
        let anime_detail = await fetchAnime(SEARCH.anime_details, animes[i][ANIME.title]);
        if(anime_detail.error)
            anime_detail = await fetchAnime(SEARCH.anime_details, anime_imgs[i].src, true);
        if(anime_detail.length > 1)
            anime_detail = anime_detail[0];
        anime_synopses[i].innerHTML = anime_detail[ANIME.synopsis];
    }
}

function showCarousel(prev=false) {
    let slides = document.querySelectorAll('.banner-anime');
    let dots = document.querySelectorAll('.banner-carousel > .dot-line > .dot');
    let i;

    for(i=0; i<MAX_RECENT; i++) {
        slides[i].classList.add('hidden');
        slides[i].classList.remove('show');
    }
    for(i=0; i<MAX_RECENT; i++)
        dots[i].className = dots[i].className.replace(' active', '');

    if(!prev) {
        slide_banner++;
        if(slide_banner > MAX_RECENT)
            slide_banner = 1;
    }
    else {
        slide_banner--;
        if(slide_banner < 1)
            slide_banner = MAX_RECENT;
    }
    slides[slide_banner - 1].classList.remove('hidden');
    slides[slide_banner - 1].classList.add('show');
    dots[slide_banner - 1].className += ' active';
    banner_timeout = setTimeout(() => {showCarousel()}, 5000);
}

addGenres(document.querySelector('#searchGenre'));

getBannerData();
showCarousel();