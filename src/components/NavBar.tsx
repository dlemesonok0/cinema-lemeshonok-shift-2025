import Link from 'next/link';
import React, {} from 'react';
import Image from 'next/image';
import Tab from '@/components/Tab';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserIcon from '../../public/User.svg';
import TicketIcon from '../../public/Ticket.svg';
import ExitIcon from '../../public/Exit.svg';

const NavBar: React.FC = () => {
    return (
        <nav
            className="bg-white dark:bg-black pt-6 pb-6 pr-60 pl-60 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href=''><Image src="Logo_Cinema.svg" alt="logo" width="118" height="34"/></Link>
                <Link href=''><Tab className='flex items-center gap-2 text-textTab dark:text-white'>
                    <UserIcon width={24} height={24}/>Профиль</Tab></Link>
                <Link href=''><Tab className='flex items-center gap-2 text-textTab dark:text-white'>
                    <TicketIcon width={24} height={24}/>Билеты</Tab></Link>
            </div>
            <div className="flex items-center gap-8">
                <Link href=''><Tab className='flex items-center gap-2 text-textTab dark:text-white'>
                    <ExitIcon width={24} height={24}/>Выйти</Tab></Link>
                <ThemeSwitcher/>
            </div>
        </nav>
    )
}

export default NavBar;