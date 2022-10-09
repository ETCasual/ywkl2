import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Home from '../pages/home';
import { Testimony } from '../pages/testimony';

type LayoutProps = {
    children: ReactNode;
};

export const Layout: NextPage<LayoutProps> = ({ children }) => {
    const layoutLinks = [
        {
            title: 'Home',
            path: '/home',
            component: <Home />
        },
        {
            title: 'Testimony',
            path: '/testimony',
            component: <Testimony />
        }
    ];

    const router = useRouter();
    return (
        <>
            <div className="flex w-full px-5 py-1">
                {layoutLinks.map((link) => (
                    <button
                        key={link.title}
                        className="w-[100px]"
                        onClick={() => router.push(link.path)}
                    >
                        {link.title}
                    </button>
                ))}
            </div>
            {children}
        </>
    );
};
