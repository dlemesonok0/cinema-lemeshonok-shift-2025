'use client';

import React from 'react';
import {useSchedule} from "@/contexts/ScheduleContext";

const Places = () => {
    const context = useSchedule();
    if (!context) {
        return null;
    }
    const {
        schedule, time, hall,
        addSeat, removeSeat, hasSeat,
        isHydrated
    } = context;

    if (!schedule || !hall || !time || !isHydrated) {
        return null;
    }

    if (!schedule.seances.find(seance => (seance.time === time && seance.hall.name === hall.name))) {
        return null;
    }

    const places = schedule.seances.find(seance => (seance.time === time && seance.hall.name === hall.name))!.hall.places;
    const rows = places.length;
    const cols = places[0].length;

    return (
        <div className="flex flex-row w-fit h-full">
            <div className="flex flex-col gap-6 text-sm">
                {places.map((place, i) => (
                    <span className='self-center align-middle mr-6 h-4' key={i}>{i + 1}</span>
                ))}
            </div>
            <div className={`grid gap-6 w-max overflow-visible relative`}
                 style={{
                     gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                     gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                 }}
            >
                {places.map((row, rowIndex) => (
                    row.map((place, colIndex) => {
                        place.row = rowIndex;
                        place.column = colIndex;

                        const isBlocked = place.type === 'BLOCKED';
                        const isSelected = hasSeat(place);

                        return (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                className={`
                                        w-4 h-4 rounded-sm items-center justify-center text-sm text-white font-bold
                                        ${isBlocked ? 'bg-indicatorLight cursor-not-allowed' : ''}
                                        ${hasSeat(place) ? 'bg-indicatorPositive' : ''}
                                        ${!isBlocked && !isSelected && place.type === 'ECONOM' ? 'bg-primary' : ''}
                                        ${!isBlocked && !isSelected && place.type === 'COMFORT' ? 'bg-indicatorAttention' : ''}
                                        ${!isBlocked ? 'cursor-pointer' : ''}
                                        relative group
                                        transition-all duration-200 ease-in-out 
                                        hover:scale-200 hover:z-10 
                                        flex items-center justify-center
                                    `}
                                onClick={() => hasSeat(place) ? removeSeat(place) : addSeat(place)}
                                disabled={isBlocked}
                            >
                                {!isBlocked && (
                                    <span
                                        className="opacity-0 group-hover:opacity-100 text-sm font-bold transition-opacity self-center transform scale-100 ">
                                        {colIndex + 1}
                                    </span>
                                )}

                                {!isBlocked && (
                                    <span
                                        className="flex flex-col items-start scale-none absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                                        style={{"zIndex": 100}}
                                    >
                                        <span className='text-[10px]'>{place.price} руб.</span>
                                        <span className='text-[7px]'>{rowIndex + 1} ряд, {colIndex + 1} место</span>
                                    </span>
                                )}</button>
                        );
                    })
                ))}
            </div>
        </div>
    )
}

export default Places;