'use client';

// import Link from 'next/link';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Movie from '../types';
import MovieCard from "@/components/MovieCard";

const Posters: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://shift-intensive.ru/api/cinema/films')
            .then(response => (
                setMovies(response.data.films)
            ))
            .catch(error =>
                console.log(error)
            )
            .finally(() =>
                setLoading(false)
            );
    }, []);

    return (
        <div className='flex flex-wrap gap-8 min-w-4xl text-textTab dark:text-white'>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default Posters;