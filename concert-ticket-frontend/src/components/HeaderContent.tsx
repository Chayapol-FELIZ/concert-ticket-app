"use client";

import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import CardStatus from './CardStatus';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface StatusListProps {
    id: string;
    title: string;
    color: string;
    icon?: React.ElementType;
}

export const statusLists: StatusListProps[] = [
    {
        id: "totalOfSeats",
        title: "Total of seats",
        color: "#0070a4",
        icon: PersonOutlineOutlinedIcon
    },
    {
        id: "reserve",
        title: "Reserve",
        color: "#00a58a",
        icon: WorkspacePremiumOutlinedIcon
    },
    {
        id: "cancel",
        title: "Cancel",
        color: "#f96464",
        icon: HighlightOffIcon
    }
]

interface DataMemo {
    cancel: number;
    reserve: number;
    totalOfSeats: number;
}

export interface HeaderContentRefType {
    refetchStatus: () => void;
}

const HeaderContent = forwardRef<HeaderContentRefType>((_, ref) => {
    const { data, refetch } = useQuery({
        queryKey: ['ADMIN', 'RESERVATION', 'SUMMARY'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/summary`).then((res) => res.data),
        staleTime: 120,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const dataMemo: DataMemo = useMemo(() => data?.data, [data]);

    useImperativeHandle(ref, () => ({
        refetchStatus: () => refetch(),
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statusLists.map((status, index) => {
                const resultAmount = dataMemo?.[status?.id as keyof DataMemo] ?? 0;
                return (
                    <CardStatus
                        key={index}
                        title={status.title}
                        icon={status.icon}
                        amount={resultAmount}
                        color={status.color}
                    />
                )
            })
            }
        </div>
    )
});

HeaderContent.displayName = 'HeaderContent';

export default HeaderContent