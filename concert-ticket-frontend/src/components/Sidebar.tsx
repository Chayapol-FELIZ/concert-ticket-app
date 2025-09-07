"use client";

import Link from 'next/link';
import React from 'react'
import { Home, RefreshCcw, Inbox, LogOut } from "lucide-react";
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectRole, setUser, toggleRole } from '@/store/slice/userSlice';
import { getCurrentUser } from '@/utils/getUserCurrent';

const menus = [
    { label: "Home", icon: <Home size={20} />, href: "/admin" },
    { label: "History", icon: <Inbox size={20} />, href: "/admin/history" },
];

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const role = useAppSelector(selectRole);
    const dispatch = useAppDispatch();

    const handleToggleRole = () => {
        const user = getCurrentUser();
        if (!user) redirect('/signin');

        const updateRole = {
            ...user,
            role: role === 'admin' ? 'user' : 'admin'
        }
        localStorage.setItem('mockUser', JSON.stringify(updateRole));

        dispatch(setUser(updateRole));
        // dispatch(toggleRole());
        router.push(`/${updateRole.role}`)
    }

    const handleLogout = () => {
        window.location.assign('/signin');
        localStorage.removeItem('mockUser');
    }

    return (
        <div className="w-20 md:w-60 bg-white border-r border-gray-300 fixed h-full p-4 flex flex-col justify-between transition-all">
            <div>
                <h1 className="text-md md:text-xl font-bold mb-6 capitalize">{role}</h1>
                <nav className="flex flex-col gap-2">
                    {role === 'admin' &&
                        menus.map((menu) => {
                            const isActive = pathname === menu.href;
                            return (
                                <Link
                                    key={menu.href}
                                    href={menu.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 ${isActive ? "bg-blue-50 text-black font-medium" : ""
                                        }`}
                                >
                                    {menu.icon}
                                    <span className="hidden md:inline text-nowrap">{menu.label}</span>
                                </Link>
                            );
                        })
                    }
                    <button onClick={handleToggleRole} className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
                        <RefreshCcw size={20} />
                        <span className="hidden md:inline text-nowrap">{`Switch to ${role === 'admin' ? 'user' : 'admin'}`}</span>
                    </button>
                </nav>
            </div>
            <div>

                <button onClick={handleLogout} className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 w-full cursor-pointer'>
                    <LogOut size={20} />
                    <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar