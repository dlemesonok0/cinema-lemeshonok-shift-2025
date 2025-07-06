import React from 'react';
import {Movie} from "@/types";
import MoviePoster from './MoviePoster';
import StarRating from "@/components/StarRating";
import ExpandableText from "@/components/ExpandableText";


const MovieAbout = ({movie}: { movie: Movie }) => {
    return (
        <div>
            <div className='flex flex-row gap-8'>
                <div className='flex-shrink w-[300px]'>
                    <MoviePoster movie={movie}/>
                </div>
                <div className='flex flex-col gap-4 font-normal'>
                    <div className="gap-1">
                        <div
                            className='text-5xl font-semibold dark:text-white'>{`${movie.name} (${movie.ageRating})`}</div>
                        <div
                            className='text-textSecondary dark:text-textSecondary text-sm'>{movie.genres.includes('мультфильм') ? 'Мультфильм' : 'Фильм'}</div>
                    </div>
                    <div className="gap-1">
                        <StarRating movie={movie}/>
                        <div
                            className='text-sm font-normal text-textSecondary dark:text-textSecondary'>{`Kinopoisk - ${movie.userRatings.kinopoisk}`}</div>
                    </div>
                    <ExpandableText className='text-sm' text={movie.description}></ExpandableText>
                </div>
            </div>
        </div>
    );
}

export default MovieAbout;