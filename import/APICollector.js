/*
    by name: 
        https://api.consumet.org/meta/anilist/{query}
            {query}= {anime name}

    recent ep: 
        https://api.consumet.org/meta/anilist/recent-episodes?provider={query}&page=1&perPage={pp}
            {query}= ["gogoanime", "zoro"]
            pp= (gogoanime) 11, (zoro) 18

    advanced: 
        https://api.consumet.org/meta/anilist/advanced-search/{query}
            {query}= {anime name}
            ?type= ["ANIME", "MANGA]
            ?page= {number}?1
            ?perPage= {number}?20
            ?season= ["WINTER", "SPRING", "SUMMER", "FALL"]
            ?format= ["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", "MUSIC"]
            ?sort= ["POPULARITY_DESC", "POPULARITY", "TRENDING_DESC", "TRENDING", "UPDATED_AT_DESC", 
                "UPDATED_AT", "START_DATE_DESC", "START_DATE", "END_DATE_DESC", "END_DATE", "FAVOURITES_DESC", 
                "FAVOURITES", "SCORE_DESC", "SCORE", "TITLE_ROMAJI_DESC", "TITLE_ROMAJI", "TITLE_ENGLISH_DESC", 
                "TITLE_ENGLISH", "TITLE_NATIVE_DESC", "TITLE_NATIVE", "EPISODES_DESC", "EPISODES", "ID", 
                "ID_DESC"]?["POPULARITY_DESC","SCORE_DESC"]
            ?genres= ["Action", "Adventure", "Cars", "Comedy", "Drama", "Fantasy", "Horror", "Mahou Shoujo", 
                "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", 
                "Supernatural", "Thriller"]
            ?id= {anilist id}
            ?year= {number}
            ?status= ["RELEASING", "NOT_YET_RELEASED", "FINISHED", "CANCELLED", "HIATUS"]
            
    genres:
        https://api.consumet.org/meta/anilist/genre?genres={query}
            {query}= ["Action", "Adventure", "Cars", "Comedy", "Drama", "Fantasy", "Horror", "Mahou Shoujo", 
            "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", 
            "Supernatural", "Thriller"]
    
    random:
        https://api.consumet.org/meta/anilist/random-anime

    trending:
        https://api.consumet.org/meta/anilist/trending
            ?page= {number}
            ?perPage= {number}

    popular:
        https://api.consumet.org/meta/anilist/popular
            ?page= {number}
            ?perPage= {number}
    
    airing schedule (weekStart and End do not work):
        https://api.consumet.org/meta/anilist/airing-schedule
            ?page= {number}
            ?perPage= {number}
            ?weekStart= ["Saturday = 0", "Sunday = 1", "Monday = 2", "Tuesday = 3", "Wednesday = 4", 
                "Thursday = 5", "Friday = 6"]
            ?weekEnd= ["Saturday = 0", "Sunday = 1", "Monday = 2", "Tuesday = 3", "Wednesday = 4",
                "Thursday = 5", "Friday = 6"]
            ?notYetAired= [true, false]?false
        
    info:
        https://api.consumet.org/meta/anilist/info/{id}
            {id}= anilist id

    streaming:
        https://api.consumet.org/meta/anilist/watch/{episodeId}
            {episodeId}= {anime-name}+[-episode]+{number}
*/

async function fetchAnime(type, key='') {
    let api_response = await fetch(API_LINK + type + key);
    let data = await api_response.json();
    return data.results;
}