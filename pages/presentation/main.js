let anime_data = document.querySelector('.anime-data');
let anime_episodes = document.querySelector('anime-episodes');

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
    console.log(anilist_id);
    let ani_data = await fetchAnime(SEARCH.info, anilist_id);
    console.log(ani_data);

    image.src = data[ANIME.image];
    image.alt = data[ANIME.image];
    rating.innerHTML = 'Rating: ' + data[ANIME.rating];
    year.innerHTML = 'Year: ' + data[ANIME.year];
    status.innerHTML = 'Status: ' + data[ANIME.status];
    type.innerHTML = 'Type: ' + data[ANIME.type];
    name.innerHTML = data[ANIME.title][ANIME.rom];
    genres.innerHTML = data[ANIME.genres].join(', ');
    synopsis.innerHTML = data[ANIME.synopsis];

    let relations = ani_data[ANIME.relations];
    for(let i=0; i<relations.length; i++) {
        let other = createElementHTML('div', 'other-anime');
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

    
    
    left_side = appendAll(left_side, [image, rating, year, status, type])
    right_side = appendAll(right_side, [name, genres, synopsis]);
    if(relations.length)
        right_side.appendChild(anime_relations);
    anime_data.appendChild(left_side);
    anime_data.appendChild(right_side);
}

window.onload = () => {
    createAnimePage();
}