import Link from 'next/link';
import React, {} from 'react';
import Image from 'next/image';
import Tab from '@/components/Tab';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-white pt-6 pb-6 pr-60 pl-60 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href=''><Image src="Logo_Cinema.svg" alt="logo" width="118" height="34"/></Link>
                <Link href=''><Tab className='flex items-center gap-2 text-textTab' iconSrc="User.svg" iconAlt='user'
                                   iconHeight='24'
                                   iconWidth='24'>Профиль</Tab></Link>
                <Link href=''><Tab className='flex items-center gap-2 text-textTab' iconSrc="Ticket.svg"
                                   iconAlt='ticket'
                                   iconHeight='24' iconWidth='24'>Билеты</Tab></Link>
            </div>
            <div className="flex items-center gap-8">
                <Link href=''><Tab className='flex items-center gap-2 text-textTab' iconSrc="Exit.svg" iconAlt='ticket'
                                   iconHeight='24' iconWidth='24'>Выйти</Tab></Link>
                <Link href=''><Image src='Mode.svg' alt='moon' width='24' height='24'/></Link>
            </div>
        </nav>
    )
}

export default NavBar;