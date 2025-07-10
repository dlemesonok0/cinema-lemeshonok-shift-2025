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
    column?: number;
    row?: number;
}

export interface PersonalData {
    lastname: string;
    firstname: string;
    middlename: string;
    card_number?: string;
    card_date?: string;
    card_cvv?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface apiResponce {
    success: boolean;
    reason: string;
    order: {
        film: Movie;
        orderNumber: number;
        tickets: {
            filmId: string;
            orderId: string,
            row: number,
            column: number,
            seance: {
                date: string,
                time: string
            },
            "phone": string,
            "status": string
        }[]
    },
    person: PersonalData,
    status: string;
}