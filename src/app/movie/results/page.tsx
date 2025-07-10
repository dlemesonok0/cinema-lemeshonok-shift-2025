'use client';

import React, {useEffect} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import Button from "@/components/Button";
import {useSchedule} from "@/contexts/ScheduleContext";
import ProgressBar from "@/components/ProgressBar";
import Places from "@/components/Places";
import SelectedPlaces from "@/components/SelectedPlaces";
import {format, parse} from "date-fns";
import {ru} from "date-fns/locale";
import ValidatedInput from "@/components/ValidatedInput";
import {usePersonalData} from "@/contexts/PersonalDataContext";
import { useRouter } from 'next/navigation';
import {apiResponce} from "@/types";

export default function ResultPage() {
    const {data, apiResponse} = usePersonalData();

    if (!apiResponse) {
        return null;
    }
    else {
        console.log(apiResponse);
    }

    function formatTickets(tickets: apiResponce['order']['tickets']) {
        const groupedByRow = tickets.reduce((acc, ticket) => {
            const row = ticket.row;
            if (!acc[row]) {
                acc[row] = [];
            }
            acc[row].push(ticket.column);
            return acc;
        }, {} as Record<number, number[]>);

        return Object.entries(groupedByRow)
            .map(([row, columns]) => {
                const sortedColumns = columns.sort((a, b) => a - b);
                return `${row} ряд - ${sortedColumns.join(', ')}`;
            })
            .join('<br/>');
    }

    return (
        <div className="flex flex-col px-60 text-textTab dark:text-white mt-12 gap-6">
            <h2 className='font-bold text-3xl'>Оплата прошла успешно!</h2>
            
            <div className='border-indicatorLight border-1 flex flex-col gap-4 rounded-4xl p-6'>
                <div className='flex flex-col'>
                    <span className='text-xs text-textSecondary dark:text-border'>Номер билета</span>
                    <span className='text-base'>{apiResponse.order.orderNumber}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs text-textSecondary dark:text-border'>Фильм</span>
                    <span className='text-base'>{apiResponse.order.film.name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs text-textSecondary dark:text-border'>Дата и время</span>
                    <span className='text-base'>{`${format(parse(apiResponse.order.tickets[0].seance.date, 'dd.MM.yyyy', new Date()), 'd MMMM', {locale: ru})} ${apiResponse.order.tickets[0].seance.time}`}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs text-textSecondary dark:text-border'>Места</span>
                    <span className='text-base'>{formatTickets(apiResponse.order.tickets)}</span>
                </div>
                <span className='text-base text-textSecondary dark:text-border'>Вся информация была продублирована в SMS</span>
            </div>
            
            <div className="flex flex-row gap-2">
                <Link href={``}>
                    <Button className='bg-transparent border-2 border-indicatorMedium'>
                        <span className='text-textTab dark:text-white'>Детали заказа</span>
                    </Button>
                </Link>
                <Link href={`/`}><Button>На главную</Button></Link>
            </div>
        </div>
    );
}