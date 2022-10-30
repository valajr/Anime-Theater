function toSearchPage(type, search='') {
    console.log(fetchAnime(type, search));
}

async function randomSearch() {
    let url = location.href;
    url = url.replace(/\/presentation\/index.html/g, '');
    url = url.replace(/\/search\/index.html/g, '');
    if(url.endsWith('pages'))
        window.location.assign('../../pages/presentation/index.html');
    else
        window.location.assign('pages/presentation/index.html');
}

function movieSearch() {
    toSearchPage(SEARCH.movies);
}

function getSeason() {
    let d = new Date;
    let s = Math.floor((d.getMonth() / 12 * 4)) % 4;
    return [SEASON[s], d.getFullYear()];
}

function seasonSearch() {
    let season;
    let year;
    [season, year] = getSeason();
    let search = SEARCH.season + season + SEARCH.year + year;

    toSearchPage(search);
}

function toHomePage() {
    window.location.assign('../../index.html');
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
            break;
        case 'relation':
            anime_name = document.querySelectorAll('.relation-name');
    }
    localStorage.setItem('anime', anime_name[id].innerHTML);
    
    let url = location.href;
    url = url.replace(/\/presentation\/index.html/g, '');
    url = url.replace(/\/search\/index.html/g, '');
    if(url.endsWith('pages'))
        window.location.assign('../../pages/presentation/index.html');
    else
        window.location.assign('pages/presentation/index.html');
}