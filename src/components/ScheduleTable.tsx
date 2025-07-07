'use client';

import React, {useState, useEffect} from 'react';
import {Movie, Schedule} from '@/types';
import axios from "axios";
import ChooseDay from '@/components/ChooseDay';
import SeanceListForDay from '@/components/SeanceListForDay';

const ScheduleTable = ({movie}: { movie: Movie }) => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [schedule, setSchedule] = useState<Schedule>();
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://shift-intensive.ru/api/cinema/film/${movie.id}/schedule`)
            .then(response => (
                setSchedules(response.data.schedules)
            ))
            .catch(error =>
                console.log(error)
            )
            .finally(() =>
                setLoading(false)
            );
    }, []);

    const handleSchedule = (schedule: Schedule) => {
        setSchedule(schedule);
    }

    const handleTime = (time: string) => {
        setTime(time);
    }

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-3xl font-bold'>Расписание</h2>
            <ChooseDay schedules={schedules} onSelectDate={handleSchedule}/>
            {schedule ? <SeanceListForDay schedule={schedule} onSelectTime={handleTime}/> : null}
        </div>
    );
}

export default ScheduleTable;