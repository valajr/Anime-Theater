let anime_data = document.querySelector('.anime-data');

const DAYS_MONTH = {
    '0': 31,
    '1': 28,
    '2': 31,
    '3': 30,
    '4': 31,
    '5': 30,
    '6': 31, 
    '7': 31,
    '8': 30,
    '9': 31,
    '10': 30,
    '11': 31
}

function openTicketModal() {
    let modal = document.querySelector('.ticket-modal');
    modal.style.display = 'block';
    let content = document.querySelector('.ticket-content');
    if(content.innerHTML === '<span class="close">×</span>')
        createTicketContent();
}

function closeTicketModal() {
    let modal = document.querySelector('.ticket-modal');
    modal.style.display = 'none';
}

function showSessions() {

}

async function createAnimePage() {
    let left_side = createElementHTML('div', 'left-side');
    let image = createElementHTML('img', 'anime-img');
    let rating = createElementHTML('span', 'anime-rating');
    let year = createElementHTML('span', 'anime-year');
    let status = createElementHTML('span', 'anime-status');
    let type = createElementHTML('span', 'anime-type');

    let right_side = createElementHTML('div', 'right-side');
    let name = createElementHTML('span', 'anime-name');
    let genres = createElementHTML('span', 'anime-genres');
    let synopsis = createElementHTML('span', 'anime-synopsis');
    let anime_relations = createElementHTML('div', 'anime-relations');


    let anime = localStorage.getItem('anime');
    localStorage.removeItem('anime');
    let data;
    if(anime)
        data = await fetchAnimeResult(SEARCH.advanced, anime);
    else 
        data = await fetchAnime(SEARCH.random);
    if(data.length)
        data=data[0];

    let anilist_id = data[ANIME.id]
    let ani_data = await fetchAnime(SEARCH.info, anilist_id);

    image.src = data[ANIME.image];
    image.alt = data[ANIME.image];
    rating.innerHTML = 'Rating: ' + data[ANIME.rating];
    year.innerHTML = 'Year: ' + data[ANIME.year];
    status.innerHTML = 'Status: ' + data[ANIME.status];
    type.innerHTML = 'Type: ' + data[ANIME.type];
    name.innerHTML = data[ANIME.title][ANIME.rom];
    document.title = data[ANIME.title][ANIME.rom];
    genres.innerHTML = data[ANIME.genres].join(', ');
    synopsis.innerHTML = data[ANIME.synopsis];

    let relations = ani_data[ANIME.relations];
    for(let i=0; i<relations.length; i++) {
        let other = createElementHTML('div', 'other-anime', '', () => {toAnimePage(i, 'relation')});
        let rel_name = createElementHTML('span', 'relation-name');
        let rel_image = createElementHTML('img', 'relation-img');
        let rel_type = createElementHTML('span', 'relation-type');

        rel_name.innerHTML = relations[i][ANIME.title][ANIME.rom];
        rel_name.title = relations[i][ANIME.title][ANIME.rom];
        rel_image.src = relations[i][ANIME.image];
        rel_image.alt = relations[i][ANIME.title][ANIME.rom];
        rel_image.title = relations[i][ANIME.title][ANIME.rom];
        rel_type.innerHTML = relations[i][ANIME.relation_type].replace(/_/g, ' ');

        other = appendAll(other, [rel_type, rel_image, rel_name]);
        anime_relations.appendChild(other);
    }

    let hr = createElementHTML('hr', 'bd-hr');

    let anime_episodes = createElementHTML('div', 'anime-episodes');
    let episode_separator = createElementHTML('span', 'episode-separator', 'Episodes: <br>');
    let episodes = ani_data.episodes;
    for(let e=0; e<episodes.length; e++) {
        let episode_button = createElementHTML('button', 'episode-btn', episodes[e].number, openTicketModal);
        episode_button.classList.add('bd-btn', 'bd-btn-outline');
        episode_button.setAttribute('id', episodes[e].id);
        anime_episodes.appendChild(episode_button);
    }
    
    let modal = createElementHTML('div', 'ticket-modal');
    let modal_content = createElementHTML('div', 'ticket-content');
    modal_content.classList.add('bd-pattern');
    let close = createElementHTML('span', 'close', '&times;', closeTicketModal);
    modal_content.appendChild(close);
    modal.appendChild(modal_content);

    left_side = appendAll(left_side, [image, rating, year, status, type])
    right_side = appendAll(right_side, [name, genres, synopsis]);
    if(relations.length)
        right_side.appendChild(anime_relations);
    right_side = appendAll(right_side, [hr, episode_separator, anime_episodes]);
    anime_data.appendChild(left_side);
    anime_data.appendChild(right_side);
    anime_data.appendChild(modal);
}

window.onclick = function(event) {
    let modal = document.querySelector('.ticket-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = () => {
    createAnimePage();
    localStorage.removeItem('days-menu');
}