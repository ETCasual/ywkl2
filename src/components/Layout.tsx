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
    // console.log(router.asPath);
    return (
        <>
            <div className="flex w-full sticky top-0 bg-[#342056] border-b-2 rounded-b-md border-[#574478] drop-shadow-lg">
                {layoutLinks.map((link) => (
                    <button
                        key={link.title}
                        className={`w-full cursor-pointer py-1 ${
                            router.asPath === link.path ? 'bg-[#574478]' : ''
                        }`}
                        onClick={() => router.push(link.path)}
                    >
                        <p
                            className={`${
                                router.asPath === link.path
                                    ? 'text-[#FDA500]'
                                    : 'text-[#c5c5c5]'
                            }`}
                        >
                            {link.title}
                        </p>
                    </button>
                ))}
            </div>
            {children}
        </>
    );
};
