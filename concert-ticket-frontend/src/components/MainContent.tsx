"use client";

import React, { useMemo, useState } from 'react'
import CreateForm from './CreateForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import OverviewContent from './OverviewContent';

export const tabs: string[] = ["overview", "create"];

interface MainContentProps {
    onRefetch: () => void;
}

const MainContent = ({ onRefetch }: MainContentProps) => {

    const { data, refetch } = useQuery({
        queryKey: ['ADMIN', 'CONCERTS'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts`).then((res) => res.data),
        staleTime: 120,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const dataMemo = useMemo(() => data?.data ?? [], [data]);

    const [tabActive, setTabActive] = useState(tabs[0]);
    const [overview, create] = tabs;

    const handleOnRefetch = () => {
        refetch();
        onRefetch();
    }

    return (
        <div className='flex flex-col'>
            <div className='flex my-4'>
                {tabs.map((tab, index) => {
                    const isActive = tab === tabActive;
                    return (
                        <button onClick={() => setTabActive(tab)} key={index} className={`px-4 border-b-2 ${isActive ? `border-blue-500` : 'border-transparent'} cursor-pointer transition-colors`}>
                            <p className={`capitalize text-xl ${isActive ? `text-blue-500` : `text-gray-800`}`}>{tab}</p>
                        </button>
                    )
                })}
            </div>

            {tabActive === overview && <OverviewContent data={dataMemo} onRefetch={handleOnRefetch} />}
            {tabActive === create && <CreateForm onRefetch={handleOnRefetch} />}
        </div>
    )
}

export default MainContent