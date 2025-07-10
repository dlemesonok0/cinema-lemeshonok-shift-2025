'use client';

import React, {createContext, ReactNode, useContext, useState, useEffect, useCallback} from 'react';
import {apiResponce, Hall, PersonalData, Place, Schedule} from '@/types';

interface PersonalDataContextType {
    data: PersonalData;
    updateFieldData: <K extends keyof PersonalData>(field: K, value: PersonalData[K]) => void;
    apiResponse: apiResponce | undefined;
    setApiResponse: (response: apiResponce) => void;
}

const PersonalDataContext = createContext<PersonalDataContextType | undefined>(undefined);

interface PersonalDataProviderProps {
    children: ReactNode;
}

export const PersonalDataProvider = ({ children }: PersonalDataProviderProps) => {
    const [data, setData] = useState<PersonalData>({
        lastname: '',
        firstname: '',
        middlename: '',
        phone: '',
        email: '',
        address: ''
    });

    const [apiResponse, setApiResponse] = useState<apiResponce | undefined>(undefined);

    const updateFieldData = useCallback(<K extends keyof PersonalData>(field: K, value: PersonalData[K]) => {
        setData(prev => ({ ...prev, [field]: value }));
    }, []);

    return (
        <PersonalDataContext.Provider value={{data, updateFieldData, apiResponse, setApiResponse}}>
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