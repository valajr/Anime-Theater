const API_LINK = 'https://api.consumet.org/meta/anilist/';

const SEARCH = {
    'by_name': '',
    'recent': 'recent-episodes?provider=zoro&page=1&perPage=25',
    'recent_2': 'recent-episodes?provider=gogoanime',
    'advanced': 'advanced-search/',
    'by_genre': 'genre?genres=',
    'random': 'random-anime',
    'trending': 'trending',
    'popular': 'popular',
    'info': 'info/',
    'stream': 'watch/',
    'movies': 'advanced-search?format=MOVIE',
    'season': 'advanced-search?season=',
    'year': '2022'
}

const ANIME = {
    'title': 'title',
    'rom': 'romaji',
    'eng': 'english',
    'nat': 'native',
    'image': 'image',
    'status': 'status',
    'episodes': 'totalEpisodes',
    'synopsis': 'description'
}

const GENRE = ["Action", "Adventure", "Cars", "Comedy", "Drama", "Fantasy", "Horror", "Mahou Shoujo", 
            "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", 
            "Supernatural", "Thriller"];

const MAX_ANIME = 5;
const MAX_ANIME_API = 10;
let banner_timeout = null;
let slide_banner = 0;

function createElementHTML(tag, cl='dynamic', text='', action='') {
    let element = document.createElement(tag);
    
    element.classList.add(cl);
    element.innerHTML = text;
    element.onclick = action;

    return element;
}

function createBanner() {
    let carousel = document.querySelector('.banner-carousel');
    for(let i=0; i<MAX_ANIME; i++) {
        let banner = createElementHTML('div', 'banner-anime');
        let name = createElementHTML('span', 'anime-name', '', () => {toAnimePage(i, 'banner')});
        let img = createElementHTML('img', 'anime-img', '', () => {toAnimePage(i, 'banner')});
        img.src = '#';
        let synopsis = createElementHTML('span', 'anime-synopsis');

        banner.appendChild(name);
        banner.appendChild(img);
        banner.appendChild(synopsis);
        carousel.appendChild(banner);
    }
    let prev = createElementHTML('a', 'prev', '&#10094;', prevSlide);
    let next = createElementHTML('a', 'next', '&#10095;', nextSlide)

    carousel.appendChild(prev);
    carousel.appendChild(next);

    let dot_line = createElementHTML('div', 'dot-line');
    for(let d=0; d<MAX_ANIME; d++) {
        let dot = createElementHTML('span', 'dot', '', () => {toBanner(d)});
        dot_line.appendChild(dot);
    }
    carousel.appendChild(dot_line);
    showCarousel();
    getBannerData();
}

function createTopList() {
    let top = document.querySelector('.top-list');

    let top_title = createElementHTML('span', 'top-title', 'Trending Anime');
    top.appendChild(top_title);
    let list = createElementHTML('ul');
    for(let i=0; i<MAX_ANIME; i++) {
        let item = createElementHTML('li', 'top-anime', '', () => {toAnimePage(i, 'top')});
        let rank = createElementHTML('span', 'top-rank', i+1);
        let img = createElementHTML('img', 'top-img');
        let data = createElementHTML('div', 'top-data');
        let title = createElementHTML('span', 'top-name');
        let episodes = createElementHTML('span', 'top-episodes');

        item.appendChild(rank);
        item.appendChild(img);
        data.appendChild(title);
        data.appendChild(episodes);
        item.appendChild(data);
        list.appendChild(item);
        let hr = createElementHTML('hr', 'bd-hr');
        list.appendChild(hr);
    }
    top.appendChild(list);
    getTopListData();
}

function createMovieList() {
    let movies = document.querySelector('.movie-list');

    let movie_title = createElementHTML('span', 'movie-title', 'Anime Movies');
    movies.appendChild(movie_title);
    let list = createElementHTML('ul');
    for(let i=0; i<MAX_ANIME; i++) {
        let item = createElementHTML('li', 'movie-anime', '', () => {toAnimePage(i, 'movie')});
        let rank = createElementHTML('span', 'movie-rank', i+1);
        let img = createElementHTML('img', 'movie-img');
        let data = createElementHTML('div', 'movie-data');
        let title = createElementHTML('span', 'movie-name');

        item.appendChild(rank);
        item.appendChild(img);
        data.appendChild(title);
        item.appendChild(data);
        list.appendChild(item);
        let hr = createElementHTML('hr', 'bd-hr');
        list.appendChild(hr);
    }
    movies.appendChild(list);
    getMovieListData();
}

function createRecentAnimes() {
    let recent = document.querySelector('.recent-animes');

    for(let i=0; i<MAX_ANIME_API; i++) {
        let anime = createElementHTML('div', 'recent-anime', '', () => {toAnimePage(i, 'recent')});
        let img = createElementHTML('img', 'recent-img');
        let name = createElementHTML('span', 'recent-name');
        anime.appendChild(img);
        anime.appendChild(name);
        anime.classList.add('bd-pattern');
        recent.appendChild(anime);
    }
    getRecentData();
}

function prevSlide() {
    clearTimeout(banner_timeout);
    let prev = true;
    showCarousel(prev);
}

function nextSlide() {
    clearTimeout(banner_timeout);
    showCarousel();
}

function toBanner(id) {
    slide_banner = id;
    clearTimeout(banner_timeout);
    showCarousel();
}

let search = document.querySelector('#searchName');
search.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        if(search.value !== '')
            console.log(await fetchAnime(SEARCH.by_name, search.value));
    }
});

async function getBannerData() {
    let animes = await fetchAnime(SEARCH.popular);
    let anime_names = document.querySelectorAll('.anime-name');
    let anime_imgs = document.querySelectorAll('.anime-img');
    let anime_synopses = document.querySelectorAll('.anime-synopsis');


    for(let i=0; i<MAX_ANIME; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title][ANIME.rom];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title][ANIME.rom];
        let anime_detail = await fetchAnime(SEARCH.by_name, animes[i][ANIME.title][ANIME.rom]);
        if(anime_detail.length > 1)
            anime_detail = anime_detail[0];
        anime_synopses[i].innerHTML = anime_detail[ANIME.synopsis];
    }
}

function showCarousel(prev=false) {
    let slides = document.querySelectorAll('.banner-anime');
    let dots = document.querySelectorAll('.banner-carousel > .dot-line > .dot');
    let i;

    for(i=0; i<MAX_ANIME; i++) {
        slides[i].classList.add('hidden');
        slides[i].classList.remove('show');
        dots[i].className = dots[i].className.replace(' active', '');
    }

    if(!prev) {
        slide_banner++;
        if(slide_banner > MAX_ANIME)
            slide_banner = 1;
    }
    else {
        slide_banner--;
        if(slide_banner < 1)
            slide_banner = MAX_ANIME;
    }
    slides[slide_banner - 1].classList.remove('hidden');
    slides[slide_banner - 1].classList.add('show');
    dots[slide_banner - 1].className += ' active';
    banner_timeout = setTimeout(() => {showCarousel()}, 5000);
}

async function getTopListData() {
    let animes = await fetchAnime(SEARCH.trending);
    let anime_imgs = document.querySelectorAll('.top-img');
    let anime_names = document.querySelectorAll('.top-name');
    let anime_episodes = document.querySelectorAll('.top-episodes');


    for(let i=0; i<MAX_ANIME; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title][ANIME.rom];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title][ANIME.rom];
        anime_episodes[i].innerHTML = animes[i][ANIME.episodes];
    }
}

async function getMovieListData() {
    let animes = await fetchAnime(SEARCH.movies);
    let anime_imgs = document.querySelectorAll('.movie-img');
    let anime_names = document.querySelectorAll('.movie-name');


    for(let i=0; i<MAX_ANIME; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title][ANIME.rom];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title][ANIME.rom];
    }
}

async function getRecentData() {
    let animes = await fetchAnime(SEARCH.recent);
    if(animes.statusCode) {
        animes = await fetchAnime(SEARCH.recent_2);
    }
    let anime_imgs = document.querySelectorAll('.recent-img');
    let anime_names = document.querySelectorAll('.recent-name');


    for(let i=0; i<MAX_ANIME_API; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title][ANIME.rom];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title][ANIME.rom];
    }
}

function toAnimePage(id, type) {
    let anime_name;
    switch(type) {
        case 'banner':
            anime_name = document.querySelectorAll('.anime-name');
            break;
        case 'top':
            anime_name = document.querySelectorAll('.top-name');
            break;
        case 'movie':
            anime_name = document.querySelectorAll('.movie-name');
            break;
        case 'recent':
            anime_name = document.querySelectorAll('.recent-name');
    }
    anime_name = anime_name[id].innerHTML;
    console.log(anime_name);
}

createBanner();
createTopList();
createRecentAnimes();
createMovieList();