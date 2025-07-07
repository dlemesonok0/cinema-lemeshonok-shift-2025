'use client';

import React, {useState, useEffect} from "react";
import MoonIcon from '../../public/Mode.svg';
import SunIcon from '../../public/Sun.svg';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark' || !('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.dataset.theme = 'dark';
            setTheme('dark');
        } else {
            document.documentElement.dataset.theme = 'light';
            setTheme('light');
        }
    })

    const toggleTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            setTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    return (
        <button className='cursor-pointer' onClick={toggleTheme}>
            { theme !== 'dark'
                ? <MoonIcon className='text-indicatorMedium' width='24' height='24'/>
                : <SunIcon width='24' height='24'/>
            }
        </button>
    );
}

export default ThemeSwitcher;