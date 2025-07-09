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

export default function PlacesPage() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const {data} = usePersonalData();

    const handleSubmit = () => {
        if (!data.lastName || !data.firstName || !data.phone) {
            alert("Please enter a data");
            return;
        }

        router.push(`/movie/${id}/places/person/payment`)
    }

    return (
        <div className="flex flex-col px-60 text-textTab dark:text-white mt-12 gap-6">
            <h2 className='font-bold text-3xl'>Введите ваши данные</h2>
            <div className="flex flex-col gap-2">
                <h3>Шаг 2 из 3</h3>
                <ProgressBar width={368} percent={2 / 3}/>
            </div>
            <ValidatedInput
                label='Фамилия'
                initValue={data.lastName}
                type='lastName'
                required={true}
                pattern={/^[А-ЯЁа-яё-]+$/}
                minLength={2}
                errorMessages={{
                    required: 'Пожалуйста, введите фамилию',
                    pattern: 'Только русские буквы и дефис',
                    minLength: 'Минимум 2 символа'
                }}
                placeholder='Иванов'/>
            <ValidatedInput
                label="Имя"
                initValue={data.firstName}
                type='firstName'
                required
                pattern={/^[А-ЯЁа-яё-]+$/}
                minLength={2}
                errorMessages={{
                    required: 'Пожалуйста, введите имя',
                    pattern: 'Только русские буквы и дефис',
                    minLength: 'Минимум 2 символа'
                }}
                placeholder='Иван'
            />
            <ValidatedInput
                label="Телефон"
                initValue={data.phone}
                type="phone"
                required
                pattern={/^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/}
                errorMessages={{
                    required: 'Пожалуйста, введите телефон',
                    pattern: 'Формат: +7 (XXX) XXX-XX-XX'
                }}
                placeholder="+7 (XXX) XXX-XX-XX"
            />
            <ValidatedInput
                label="Email"
                initValue={data.email}
                type="email"
                pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                errorMessages={{
                    required: 'Пожалуйста, введите email',
                    pattern: 'Некорректный формат email'
                }}
                placeholder="example@mail.ru"
            />
            <ValidatedInput
                label="Адрес"
                initValue={data.address}
                type="address"
                placeholder="г. Новосибирск, ул. Кирова, д. 86"
            />
            <div className="flex flex-row gap-2">
                <Link href={`/movie/${id}/places`}>
                    <Button className='bg-transparent border-2 border-indicatorMedium'>
                        <span className='text-textTab dark:text-white'>Назад</span>
                    </Button>
                </Link>
                <Button onClick={handleSubmit}>Продолжить</Button>
            </div>
        </div>
    );
}