import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import React from "react";
import {ScheduleProvider} from "@/contexts/ScheduleContext";
import {PersonalDataProvider} from "@/contexts/PersonalDataContext";

const inter = Inter({subsets: ['latin', "cyrillic"]});

export const metadata: Metadata = {
    title: 'Мой Первый Next.js Проект',
    description: 'Изучаем Next.js, React и TypeScript',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`flex flex-col ${inter.className} bg-white dark:bg-darkbg text-textTab dark:text-white`}>
        <NavBar/>
        <PersonalDataProvider>
            <ScheduleProvider>
                {children}
            </ScheduleProvider>
        </PersonalDataProvider>
        </body>
        </html>
    );
}
