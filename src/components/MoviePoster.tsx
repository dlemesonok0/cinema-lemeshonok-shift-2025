import React from 'react';
import Movie from '@/types';
import Image from "next/image";

const MoviePoster = ({movie}: {movie: Movie}) => {
    return (
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
    );
}

export default MoviePoster;