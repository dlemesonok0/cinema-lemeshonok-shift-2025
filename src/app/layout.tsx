import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import React from "react";

const inter = Inter({subsets: ['latin']});

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
        <body className={`${inter.className} bg-white dark:bg-darkbg`}>
        <NavBar/>
        {children}
        </body>
        </html>
    );
}
