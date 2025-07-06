interface Country {
    name: string;
    id: number;
    code: string;
    code2: string;
}

interface UserRatings {
    imdb: number;
    kinopoisk: number;
}

interface Movie {
    id: number;
    name: string;
    originalName: string;
    description: string;
    releaseDate: string;
    img: string;
    ageRating: string;
    userRatings: UserRatings;
    country: Country;
    genres: string[];
}

export default Movie;