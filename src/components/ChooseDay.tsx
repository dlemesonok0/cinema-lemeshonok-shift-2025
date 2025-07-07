'use client';

import React, {useState} from 'react';
import {Schedule} from "@/types";
import {format, parse} from "date-fns";
import {ru} from "date-fns/locale";

const ChooseDay = ({schedules, onSelectDate}: {
    schedules: Schedule[],
    onSelectDate: (selectedDate: Schedule) => void
}) => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

    const handleDateSelect = (date: Schedule) => {
        setSelectedSchedule(date);
        onSelectDate(date);
    }

    return (
        <div
            className='inline-flex bg-lightSecondary dark:bg-darkSecondary flex-wrap gap rounded-2xl'>
            {schedules.map((item, index) => {
                const isSelected = selectedSchedule?.date === item.date;
                return (
                    <div key={index}
                         className={`cursor-pointer py-2.5 px-4 ${isSelected ? 'bg-white dark:bg-darkbg' : ''} rounded-2xl border-lightSecondary dark:border-darkSecondary border-2`}
                         onClick={() => handleDateSelect(item)}>
                        {format(parse(item.date, 'dd.MM.yyyy', new Date()), 'EEEEEE, d MMM', {locale: ru})}
                    </div>
                );
            })}
        </div>
    )
}

export default ChooseDay;