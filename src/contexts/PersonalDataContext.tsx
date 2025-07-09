'use client';

import React, {createContext, ReactNode, useContext, useState, useEffect, useCallback} from 'react';
import {Hall, PersonalData, Place, Schedule} from '@/types';

interface PersonalDataContextType {
    data: PersonalData;
    updateField: <K extends keyof PersonalData>(field: K, value: PersonalData[K]) => void;
}

const PersonalDataContext = createContext<PersonalDataContextType | undefined>(undefined);

interface PersonalDataProviderProps {
    children: ReactNode;
}

export const PersonalDataProvider = ({ children }: PersonalDataProviderProps) => {
    const [data, setData] = useState<PersonalData>({
        lastName: '',
        firstName: '',
        phone: '',
        email: '',
        address: ''
    });

    const updateField = useCallback(<K extends keyof PersonalData>(field: K, value: PersonalData[K]) => {
        setData(prev => ({ ...prev, [field]: value }));
    }, []);

    return (
        <PersonalDataContext.Provider value={{data, updateField}}>
            {children}
        </PersonalDataContext.Provider>
    )
}

export const usePersonalData = () => {
    const context = useContext(PersonalDataContext);
    if (!context) {
        throw new Error('usePersonalData must be used within a PersonalDataProvider');
    }
    return context;
}