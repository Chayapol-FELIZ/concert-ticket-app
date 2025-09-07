"use client";

import React, { useRef } from 'react'
import HeaderContent, { HeaderContentRefType } from '@/components/HeaderContent'
import MainContent from '@/components/MainContent'

const AdminDashboardPage = () => {
    const statusRef = useRef<HeaderContentRefType>(null);

    return (
        <div className="flex-1 flex-col pl-24 md:pl-64 pr-4 py-4">
            <HeaderContent ref={statusRef} />
            <MainContent onRefetch={statusRef.current?.refetchStatus ?? (() => { })} />
        </div>
    )
}

export default AdminDashboardPage