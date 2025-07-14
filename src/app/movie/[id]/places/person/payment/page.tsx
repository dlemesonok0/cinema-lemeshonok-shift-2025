'use client';

import React, {useState} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import Button from "@/components/Button";
import {useSchedule} from "@/contexts/ScheduleContext";
import ProgressBar from "@/components/ProgressBar";
import {usePersonalData} from "@/contexts/PersonalDataContext";
import {useRouter} from 'next/navigation';
import BankCard from "@/components/BankCard";
import axios from "axios";
import {API_URL} from "@/constants";

export default function PlacesPage() {
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const {data, setApiResponse} = usePersonalData();
    const {schedule, time, isHydrated, hall, seats} = useSchedule();

    if (!isHydrated || !schedule || !time || !hall) {
        return null;
    }

    const handleSubmit = async () => {
        if (!data.card_number || !data.card_date || !data.card_cvv) {
            alert("Please enter a data");
            return;
        }

        setIsLoading(true);

        console.log({
            filmId: params.id,
            person: {
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                phone: data.phone,
            },
            debitCard: {
                "pan": data.card_number.slice(0, 9),
                "expireDate": data.card_date,
                "cvv": data.card_cvv,
            },
            seance: {
                date: schedule.date,
                time: time,
            },
            tickets:
                seats.map(seat => {
                    return {row: seat.row, column: seat.column};
                })
        })

        const response = await axios.post(`${API_URL}cinema/payment`, {
            filmId: params.id,
            person: {
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                phone: data.phone,
            },
            debitCard: {
                "pan": data.card_number.slice(0, 9),
                "expireDate": data.card_date,
                "cvv": data.card_cvv,
            },
            seance: {
                date: schedule.date,
                time: time,
            },
            tickets:
                seats.map(seat => {
                    return {row: seat.row, column: seat.column};
                })
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(response => {
                setIsLoading(response.data)
                setApiResponse(response.data)
                router.push(`/movie/results`)
            })
            .catch(error => {
                    console.log(error)
                }
            )
            .finally(() =>
                setIsLoading(false)
            )

        // if (response.data && response.data.success) {
        //     router.push(`/`);
        //     setIsLoading(false);
        // } else {
        //     console.log(response.data.reason);
        //     setIsLoading(false);
        //     throw new Error(response.data.message || "Ошибка оплаты");
        // }
    };

    return (
        !isLoading ?
            <div className="flex flex-col px-60 text-textTab dark:text-white mt-12 gap-6">
                <h2 className='font-bold text-3xl'>Введите данные карты для оплаты</h2>
                <div className="flex flex-col gap-2">
                    <h3>Шаг 3 из 3</h3>
                    <ProgressBar width={368} percent={3 / 3}/>
                </div>
                <BankCard></BankCard>
                <div className="flex flex-row gap-2">
                    <Link href={`/movie/${id}/places`}>
                        <Button className='bg-transparent border-2 border-indicatorMedium'>
                            <span className='text-textTab dark:text-white'>Назад</span>
                        </Button>
                    </Link>
                    <Button onClick={handleSubmit}>Оплатить</Button>
                </div>
            </div>
            : "Покупаем билет"
    );
}