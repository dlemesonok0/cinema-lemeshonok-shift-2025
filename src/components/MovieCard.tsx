import Link from 'next/link';
import React, {} from 'react';
import {Movie} from '@/types';
import StarRating from "../components/StarRating";
import MoviePoster from "@/components/MoviePoster";
import CustomButton from '@/components/CustomButton';

const MovieCard = ({movie}: { movie: Movie }) => {
    return (
        <div className='flex flex-col gap-2'>
            <MoviePoster movie={movie} />
            <div className="gap-1">
                <div className='hyphens-auto max-w-3xs text-2xl font-semibold'>{`${movie.name} (${movie.ageRating})`}</div>
                <div className='text-textSecondary dark:text-textSecondary text-sm'>{movie.genres.includes('мультфильм') ? 'Мультфильм' : 'Фильм'}</div>
            </div>
            <div className="gap-1">
                <StarRating movie={movie}/>
                <div className='text-sm font-normal text-textSecondary dark:text-textSecondary'>{`Kinopoisk - ${movie.userRatings.kinopoisk}`}</div>
            </div>
            <Link href={`/movie/${movie.id}`}>
                <CustomButton>Подробнее</CustomButton>
            </Link>
        </div>
    )
}

export default MovieCard;