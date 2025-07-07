'use client';

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Movie} from "@/types";
import {useParams} from "next/navigation";
import axios from "axios";
import MovieAbout from '@/components/MovieAbout';
import ScheduleTable from '@/components/ScheduleTable';
import ArrowSmallLeft from '../../../../public/ArrowSmallLeft.svg';
import Tab from "@/components/Tab";
import CustomButton from "@/components/CustomButton";

export default function MoviePage() {
    const [movie, setMovie] = useState<Movie>();
    const [loading, setLoading] = useState(true);

    // TODO: прокинуть дату, время и зал в состояние этой страницы

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (!id) return;

        axios.get(`https://shift-intensive.ru/api/cinema/film/${id}`)
            .then(response => (
                setMovie(response.data.film)
            ))
            .catch(error =>
                console.log(error)
            )
            .finally(() =>
                setLoading(false)
            );
    }, [id]);

    if (!movie) {
        return (
            <div className="text-center">
                Загрузка
            </div>
        );
    }

    return (
        <div className="flex flex-col px-60 text-textTab dark:text-white">
            <Link href={`/`} className='py-4'>
                <Tab className='flex items-center gap-4 text-textSecondary dark:text-textSecondary text-base'>
                    <ArrowSmallLeft width={24} height={24}/>Назад</Tab>
            </Link>
            <div className='flex flex-col gap-12'>
                <MovieAbout movie={movie}/>
                <ScheduleTable movie={movie}/>
                <CustomButton>Продолжить</CustomButton>
            </div>
        </div>
    );
}