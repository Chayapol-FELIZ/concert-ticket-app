"use client";

import React, { useMemo } from 'react'
import CardConcertReserve from '@/components/CardConcertReserve';
import { Concert } from '@/components/OverviewContent';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slice/userSlice';

type Reservation = {
    concert: string;
};

const UserDashboardPage = () => {
    const user = useAppSelector(selectUser);

    const { data: concerts, refetch: refetchConcerts } = useQuery({
        queryKey: ['USER', 'CONCERTS'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts`).then((res) => res.data),
        staleTime: 120,
        retry: 1,
        refetchOnWindowFocus: false,
    });


    const { data: reserveConcerts, refetch: refetchReserveConcerts } = useQuery({
        queryKey: ['USER', 'RESERVATION'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/me/${user._id}`).then((res) => res.data),
        staleTime: 120,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!user._id
    });

    const concertsMemo = useMemo(() => concerts?.data ?? [], [concerts]);
    const reserveConcertsMemo = useMemo(() => reserveConcerts?.data ?? [], [reserveConcerts]);
    const reservedConcertIds = reserveConcertsMemo.map((res: Reservation) => res.concert);


    const handleOnRefetch = () => {
        refetchConcerts()
        refetchReserveConcerts()
    }

    return (
        <div className="flex-1 flex flex-col gap-2 pl-24 md:pl-64 pr-4 py-4">
            {concertsMemo?.map((concert: Concert) =>
                <CardConcertReserve
                    key={concert._id}
                    concert={concert}
                    isReserved={reservedConcertIds.includes(concert._id)}
                    onRefetch={handleOnRefetch}
                />)
            }
        </div>
    )
}

export default UserDashboardPage