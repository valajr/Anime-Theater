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