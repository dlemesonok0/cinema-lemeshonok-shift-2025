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
    places: Place[][];
}

export interface Place {
    price: number;
    type: 'BLOCKED' | 'ECONOM' | 'COMFORT';
    col?: number;
    row?: number;
}

export interface PersonalData {
    lastName: string;
    firstName: string;
    phone?: string;
    email?: string;
    address?: string;
}