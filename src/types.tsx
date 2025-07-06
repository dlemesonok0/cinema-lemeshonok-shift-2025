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

export interface Movie {
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

export interface Schedule {
    date: string;
    seances: Seance[];
}

export interface Seance {
    time: string;
    hall: Hall;
}

export interface Hall {
    name: string;
    places: object[];
}