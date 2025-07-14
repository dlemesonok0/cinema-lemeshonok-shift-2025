'use client';

import React, {createContext, ReactNode, useContext, useState, useEffect} from 'react';
import {Hall, Place, Schedule} from '@/types';

interface ScheduleContextType {
    schedule: Schedule | null;
    setSchedule: (schedule: Schedule) => void | null;

    time: string | null;
    setTime: (time: string) => void | null;

    hall: Hall | null;
    setHall: (hall: Hall) => void | null;

    seats: Place[];
    setSeats: (seats: Place[]) => void | null;
    addSeat: (seat: Place) => void | null;
    removeSeat: (seat: Place) => void | null;
    cleanSeats: () => void | null;
    hasSeat: (seat: Place) => boolean;

    isHydrated: boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

interface ScheduleProviderProps {
    children: ReactNode;
}

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {

    const getSessionStorageValue = <T,>(key: string, defaultValue: T): T => {
        try {
            const saved = sessionStorage.getItem(key);
            console.log('значение считано из стореджа')
            return saved ? JSON.parse(saved) : defaultValue;
        } catch (error) {
            // console.error(`Ошибка при получении ${key} из sessionStorage:`, error);
            return defaultValue;
        }
    };

    const setSessionStorageValue = <T,>(key: string, value: T) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // console.error(`Ошибка при сохранении ${key} в sessionStorage:`, error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSchedule(getSessionStorageValue<Schedule | null>('schedule', null));
            setTime(getSessionStorageValue<string | null>('time', null));
            setHall(getSessionStorageValue<Hall | null>('hall', null));
            setSeats(getSessionStorageValue<Place[]>('seats', []));
            setIsHydrated(true);
            console.log('Значения загружены из sessionStorage после монтирования.');
        }
    }, []);

    const [schedule, setSchedule] = useState<Schedule | null>(() =>
        getSessionStorageValue<Schedule | null>('schedule', null)
    );
    const [time, setTime] = useState<string | null>(() =>
        getSessionStorageValue<string | null>('time', null)
    );
    const [hall, setHall] = useState<Hall | null>(() =>
        getSessionStorageValue<Hall | null>('hall', null)
    );
    // eslint-disable-next-line prefer-const
    let [seats, setSeats] = useState<Place[]>(() =>
        getSessionStorageValue<Place[]>('seats', [])
    );

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (isHydrated) {
            setSessionStorageValue('schedule', schedule);
        }
    }, [schedule, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            setSessionStorageValue('time', time);
        }
    }, [time, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            setSessionStorageValue('hall', hall);
        }
    }, [hall, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            setSessionStorageValue('seats', seats);
        }
    }, [seats, isHydrated]);

    const addSeat = (seat: Place) => {
        if (!seats) {
            setSeats([]);
        }
        setSeats([...seats, seat]);
    };

    const removeSeat = (seat: Place) => {
        if (!seats) {
            return;
        }
        setSeats(seats.filter(item => item.column !== seat.column || item.row !== seat.row));
    }

    const cleanSeats = () => {
        setSeats([]);
    }

    const hasSeat = (seat: Place) => {
        if (!seats) {
            return false;
        }
        return !!seats.find((item) => item.column == seat.column && item.row == seat.row);
    }

    const contextValue = {
        schedule, setSchedule,
        time, setTime,
        hall, setHall,
        seats, setSeats, addSeat, removeSeat, cleanSeats, hasSeat,
        isHydrated
    }

    return (
        <ScheduleContext.Provider value={contextValue}>
            {children}
        </ScheduleContext.Provider>
    )
}

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
}