'use client';

import React, {useEffect} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import CustomButton from "@/components/CustomButton";
import {useSchedule} from "@/contexts/ScheduleContext";
import ProgressBar from "@/components/ProgressBar";
import Places from "@/components/Places";
import SelectedPlaces from "@/components/SelectedPlaces";
import {format, parse} from "date-fns";
import {ru} from "date-fns/locale";

export default function PlacesPage() {
    const params = useParams();
    const id = params.id;

    const context = useSchedule();
    if (!context) {
        return null;
    }
    const {hall, schedule, time, seats, cleanSeats, isHydrated} = context;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        cleanSeats();
    }, []);

    if (!hall || !schedule || !time || !isHydrated) {
        return null;
    }

    return (
        <div className="flex flex-col px-60 text-textTab dark:text-white mt-12 gap-6">
            <h2 className='font-bold text-3xl'>Выбор фильма</h2>
            <div className="flex flex-col gap-2">
                <h3>Шаг 1 из 3</h3>
                <ProgressBar width={368} percent={1 / 3}/>
            </div>
            <div className='inline-flex flex-col w-fit gap-6 text-sm'>
                <div>
                    <div className='text-center'>Экран</div>
                    <div className='h-4 rounded-2xl bg-indicatorLight'></div>
                </div>
                <span className=''>Ряд</span>
                <Places></Places>
            </div>
            <div>
                <div className='text-xs text-textSecondary dark:text-border'>Зал</div>
                <div className='text-base'>{hall.name}</div>
            </div>
            <div>
                <div className='text-xs text-textSecondary dark:text-border'>Дата и время</div>
                <div
                    className='text-base'>{`${format(parse(schedule.date, 'dd.MM.yyyy', new Date()), 'd MMMM', {locale: ru})} ${time}`}</div>
            </div>
            {seats.length > 0 ? <SelectedPlaces selectedPlaces={seats}></SelectedPlaces> : null}
            {seats.length > 0 ?
                <div className='text-2xl font-semibold'>
                    {`Сумма: ${
                        seats.reduce((total, seat) => {
                            return total + seat.price;
                        }, 0)
                    }₽`}
                </div>
                : null}
            <div className="flex flex-row gap-2">
                <Link href={`/movie/${id}`}>
                    <CustomButton className='bg-transparent border-2 border-indicatorMedium'>
                        <span className='text-textTab dark:text-white'>Назад</span>
                    </CustomButton>
                </Link>
                {seats.length > 0 ? <CustomButton>Купить</CustomButton> : null}
            </div>
        </div>
    );
}