'use client';
import React, {useContext, useState} from 'react';
import {usePersonalData} from "@/contexts/PersonalDataContext";
import {PersonalData} from "@/types";

type ValidatedInputProps = {
    label: string;
    type: keyof PersonalData;
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    placeholder?: string;
    initValue?: string;
    errorMessages?: {
        required?: string;
        pattern?: string;
        minLength?: string;
    };
    className?: string;
};

const ValidatedInput = ({
                            label,
                            type,
                            required = false,
                            pattern,
                            minLength,
                            placeholder = '',
                            errorMessages = {},
                            className = '',
                        }: ValidatedInputProps) => {
    const {data, updateFieldData} = usePersonalData();

    const [value, setValue] = useState(data[type]);
    const [error, setError] = useState('');

    const validate = (val: string) => {
        if (required && !val.trim()) {
            return errorMessages.required || 'Обязательное поле';
        }
        if (pattern && !pattern.test(val)) {
            return errorMessages.pattern || 'Неверный формат';
        }
        if (minLength && val.length < minLength) {
            return errorMessages.minLength || `Минимум ${minLength} символов`;
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        setError(validate(val));
        if (error.length == 0 && val.length > 0) {
            updateFieldData(type, val);
        }
    };

    return (
        <div className={``}>
            <label className="block text-sm font-medium mb-1">
                {label} {required && '*'}
            </label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                className={`w-[368px] ${className} p-2 border rounded-xl ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default ValidatedInput;