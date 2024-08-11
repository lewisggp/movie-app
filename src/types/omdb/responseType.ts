interface Ratings {
    Source: string;
    Value: string;
}

export interface OMDBSeasonResponse {
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: {
        Title: string;
        Released: string;
        Episode: string;
        imdbRating: string;
        imdbID: string;
    }[];
    Response: string;
}

export interface OMDBTitleResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Ratings[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    totalSeasons?: number;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: string;
    Error?: string;
}

export interface OMDBSearchResponse {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
}

