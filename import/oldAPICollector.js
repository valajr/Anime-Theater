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

/* 
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
genre = ['action', 'adventure', 'cars', 'comedy', 'crime', 'dementia',
    'demons', 'drama', 'dub', 'ecchi', 'family', 'fantasy', 'game',
    'gourmet', 'harem', 'historical', 'horror', 'josei', 'kids', 'magic',
    'martial-arts', 'mecha', 'military', 'mystery', 'parody', 'police',
    'psychological', 'romance', 'samurai', 'school', 'sci-fi', 'seinen',
    'shoujo', 'shoujo-ai', 'shounen', 'shounen-ai', 'slice-of-Life',
    'space', 'sports', 'super-power', 'supernatural', 'suspense',
    'thriller', 'vampire', 'yaoi', 'yuri'];
*/

async function fetchAnime(type, key='', img=false) {
    if(!img) {
        key = key.replace(/!|\?|:|\(|\)|,|\.|;\\|\||@|\$|%|&|\*|\[|\]|{|}|=|\+/g,"");
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