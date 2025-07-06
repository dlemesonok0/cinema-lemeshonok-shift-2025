import React from 'react';
import Star from '../../public/Star.svg';
import {Movie} from '@/types';

const StarRating = ({movie}: { movie: Movie }) => {
    return (
        <div className='flex flex-row gap-1'>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star width='24' height='24' key={i}
                      className={movie.userRatings.kinopoisk / 2 >= i ? 'text-indicatorAttention' : 'text-indicatorLight'}></Star>
            ))}
        </div>
    );
}

export default StarRating;