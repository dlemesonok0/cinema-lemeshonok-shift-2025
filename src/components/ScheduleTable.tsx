'use client';

import React, {useState, useEffect} from 'react';
import {Movie, Schedule} from '@/types';
import axios from "axios";
import ChooseDay from '@/components/ChooseDay';
import SeanceListForDay from '@/components/SeanceListForDay';
import {useSchedule} from "@/contexts/ScheduleContext";
import {API_URL} from "@/constants";

const ScheduleTable = ({movie}: { movie: Movie }) => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}cinema/film/${movie.id}/schedule`)
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

    const context = useSchedule();
    if (!context) {
        return null;
    }
    const {
        schedule,
    } = context;

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-3xl font-bold'>Расписание</h2>
            <ChooseDay schedules={schedules}/>
            {schedule ? <SeanceListForDay schedule={schedule}/> : null}
        </div>
    );
}

export default ScheduleTable;