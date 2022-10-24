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
    'last_ep': 'latestEp',
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

const MAX_ANIME = 5;
const MAX_ANIME_API = 20;
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

function createTopAiring() {
    let top = document.querySelector('.top-airing');

    let top_title = createElementHTML('span', 'top-list', 'Top Airing Anime');
    top.appendChild(top_title);
    let list = createElementHTML('ul');
    for(let i=0; i<MAX_ANIME; i++) {
        let item = createElementHTML('li', 'top-anime');
        let rank = createElementHTML('span', 'top-rank', i+1);
        let img = createElementHTML('img', 'top-img', '', () => {toAnimePage(i, 'top')});
        let data = createElementHTML('div', 'top-data', '', () => {toAnimePage(i, 'top')});
        let title = createElementHTML('span', 'top-title');
        let episodes = createElementHTML('span', 'top-episodes');

        item.appendChild(rank);
        item.appendChild(img);
        data.appendChild(title);
        data.appendChild(episodes);
        item.appendChild(data);
        list.appendChild(item);
        if(i+1 != MAX_ANIME) {
            let hr = createElementHTML('hr', 'bd-hr');
            list.appendChild(hr);
        }
    }
    top.appendChild(list);
    getTopAiringData();
}

function createRecentAnimes() {
    let recent = document.querySelector('.recent-animes');

    for(let i=0; i<MAX_ANIME_API; i++) {
        let anime = createElementHTML('div', 'recent-anime');
        let img = createElementHTML('img', 'recent-img');
        let name = createElementHTML('span', 'recent-name');
        anime.appendChild(img);
        anime.appendChild(name);
        recent.appendChild(anime);
        if(i+1 != MAX_ANIME_API) {
            let hr = createElementHTML('hr', 'bd-hr');
            recent.appendChild(hr);
        }
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

async function getBannerData() {
    let animes = await fetchAnime(SEARCH.popular);
    let anime_names = document.querySelectorAll('.anime-name');
    let anime_imgs = document.querySelectorAll('.anime-img');
    let anime_synopses = document.querySelectorAll('.anime-synopsis');


    for(let i=0; i<MAX_ANIME; i++) {
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

async function getTopAiringData() {
    let animes = await fetchAnime(SEARCH.top_airing);
    let anime_imgs = document.querySelectorAll('.top-img');
    let anime_names = document.querySelectorAll('.top-title');
    let anime_episodes = document.querySelectorAll('.top-episodes');


    for(let i=0; i<MAX_ANIME; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title];
        anime_episodes[i].innerHTML = animes[i][ANIME.last_ep];
    }
}

function toAnimePage(id, type) {
    let anime_name;
    switch(type) {
        case 'banner':
            anime_name = document.querySelectorAll('.anime-name');
            anime_name = anime_name[id].innerHTML;
            console.log(anime_name);
            break;
        case 'top':
            anime_name = document.querySelectorAll('.top-title');
            anime_name = anime_name[id].innerHTML;
            console.log(anime_name);
            break;
    }
}

async function getRecentData() {
    let animes = await fetchAnime(SEARCH.recent);
    let anime_imgs = document.querySelectorAll('.recent-img');
    let anime_names = document.querySelectorAll('.recent-name');


    for(let i=0; i<MAX_ANIME_API; i++) {
        anime_names[i].innerHTML = animes[i][ANIME.title];
        anime_imgs[i].src = animes[i][ANIME.image];
        anime_imgs[i].alt = animes[i][ANIME.title];
    }
}

createBanner();
createTopAiring();
createRecentAnimes();
addGenres(document.querySelector('#searchGenre'));