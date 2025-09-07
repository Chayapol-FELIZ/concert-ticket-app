"use client";

import React, { useMemo } from 'react'
import TableComponent, { Column } from '@/components/TableComponent'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const columns: readonly Column[] = [
    {
        key: 'dateTime',
        label: 'Date time'
    },
    {
        key: 'username',
        label: 'Username'
    },
    {
        key: 'concertName',
        label: 'Concert name'
    },
    {
        key: 'action',
        label: 'Action'
    }
]

const HistoryPage = () => {
    const { data } = useQuery({
        queryKey: ['ADMIN', 'CONCERTS', 'LOGS'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/logs`).then((res) => res.data),
        staleTime: 120,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const dataMemo = useMemo(() => data?.data ?? [], [data]);

    return (
        <div className="flex-1 flex-col pl-24 md:pl-64 pr-4 py-4">
            <TableComponent
                columns={columns}
                rows={dataMemo}
            />
        </div>
    )
}

export default HistoryPage