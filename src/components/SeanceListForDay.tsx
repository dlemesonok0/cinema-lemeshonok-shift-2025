'use client';

import React, {useState} from 'react';
import {Hall, Schedule, Seance} from "@/types";

const SeanceListForDay = ({schedule, onSelectTime}: { schedule: Schedule, onSelectTime: (time: string) => void }) => {
    const [time, setTime] = useState('');
    const [hall, setHall] = useState('');
    const groupedSeances: Record<string, Seance[]> = schedule.seances.reduce((acc, seance) => {
        const hallName = seance.hall.name;
        if (!acc[hallName]) {
            acc[hallName] = [];
        }
        acc[hallName].push(seance);
        return acc;
    }, {} as Record<string, Seance[]>);

    const sortedHallNames = Object.keys(groupedSeances).sort();

    const handleTime = (time: string, hall: Hall) => {
        setTime(time);
        onSelectTime(time);
        setHall(hall.name);
    }

    return (
        <div className="flex flex-col gap-6">
            {sortedHallNames.map((hallName) => {
                return (
                    <div className='flex flex-col gap-4' key={hallName}>
                        <h3 className='text-sm'>Зал {hallName}</h3>
                        <div className='flex flex-row gap-2'>
                            {groupedSeances[hallName].sort((a, b) => a.time.localeCompare(b.time)).map((seance) => {
                                const isSelected = seance.time === time && hall === hallName;
                                return (
                                    <span
                                        className={`cursor-pointer border-1 border-indicatorLight rounded-2xl py-2.5 px-4 ${isSelected ? 'bg-indicatorLight dark:bg-textSecondary border-none' : null}`}
                                        key={seance.time}
                                        onClick={() => handleTime(seance.time, seance.hall)}>{seance.time}</span>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default SeanceListForDay;