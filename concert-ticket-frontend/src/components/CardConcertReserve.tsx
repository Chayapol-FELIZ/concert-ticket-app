"use client";

import React from 'react'
import { User } from 'lucide-react';
import { Concert } from './OverviewContent';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slice/userSlice';

interface CardConcertProps {
    concert: Concert;
    isReserved: boolean;
    onRefetch: () => void;
}


interface MutationProps {
    concertId: string;
    body: {
        userId: string | null;
        username: string;
    }
}

const CardConcertReserve = ({ concert, isReserved, onRefetch }: CardConcertProps) => {
    const user = useAppSelector(selectUser);

    const { mutate: onReserve } = useMutation({
        mutationFn: ({ concertId, body }: MutationProps) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/${concertId}`, body).then((res) => res.data),
    });

    const { mutate: onCancel } = useMutation({
        mutationFn: ({ concertId, body }: MutationProps) => axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/${concertId}`, body).then((res) => res.data),
    });

    const handleReserve = async () => {
        const body = {
            userId: user?._id,
            username: user?.name
        }

        if (isReserved) {
            await onCancel({ concertId: concert._id, body }, {
                onSuccess: () => {
                    toast.success('Cancel concert ticket successfully');
                    onRefetch();
                },
                onError: (error: Error) => {
                    if (axios.isAxiosError(error)) {
                        const message = error.response?.data?.message;
                        toast.error(message);
                    }
                }
            });
        } else {
            await onReserve({ concertId: concert._id, body }, {
                onSuccess: () => {
                    toast.success('Reserve concert ticket successfully');
                    onRefetch();
                },
                onError: (error: Error) => {
                    if (axios.isAxiosError(error)) {
                        const message = error.response?.data?.message;
                        toast.error(message);
                    }
                }
            });
        }
    }

    return (
        <div className='bg-white px-4 pb-4 border border-gray-300 rounded-lg'>
            <p className='text-2xl font-bold text-blue-500 py-4 border-b border-gray-300'>{concert.name}</p>
            <div className='my-4'>
                {concert.description}
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <User />
                    <p>{concert.totalOfSeat}</p>
                </div>
                <button onClick={handleReserve} className={`flex items-center justify-center gap-2 px-4 py-2 ${isReserved ? 'bg-red-500' : 'bg-blue-500'}  hover:opacity-80 rounded-md cursor-pointer transition-all`}>
                    {isReserved ? <p className='text-white font-medium'>Cancel</p> :
                        <p className='text-white font-medium'>Reserve</p>
                    }
                </button>
            </div>
        </div>
    )
}

export default CardConcertReserve