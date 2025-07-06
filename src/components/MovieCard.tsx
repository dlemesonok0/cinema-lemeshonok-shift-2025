// import Link from 'next/link';
import React, {} from 'react';
import Image from 'next/image';
import Movie from '../types';
import StarRating from "../components/StarRating";

const MovieCard = ({movie}: { movie: Movie }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className="relative w-[300px] h-[300px] overflow-hidden rounded-lg">
                <Image className='object-cover object-center' src={`https://shift-intensive.ru/api${movie.img}`} alt={movie.name}
                       width={300} height={300}></Image>
                <div className="absolute inset-0 flex justify-end items-end font-roboto" >
                    <div
                        className='text-sm flex flex-col text-right bg-lightSecondary dark:bg-darkSecondary px-4 py-2 rounded-tl-lg rounded-br-lg'>
                        <span className='font-medium'>{movie.genres[0]}</span>
                        <span>{`${movie.country.name}, ${movie.releaseDate.match(/\d{4}/)?.[0] ?? '0000'}`}</span>
                    </div>
                </div>
            </div>
            <div className="gap-1">
                <div className='hyphens-auto max-w-3xs text-2xl font-semibold'>{`${movie.name} (${movie.ageRating})`}</div>
                <div className='text-textTab dark:text-white text-sm'>{movie.genres.includes('мультфильм') ? 'Мультфильм' : 'Фильм'}</div>
            </div>
            <div className="gap-1">
                <StarRating movie={movie}/>
                <div className='text-sm font-normal'>{`Kinopoisk - ${movie.userRatings.kinopoisk}`}</div>
            </div>

            <button className='bg-primary w-[300px] px-8 py-4 rounded-2xl text-2xl font-semibold text-white'>Подробнее</button>
        </div>
    )
}

export default MovieCard;