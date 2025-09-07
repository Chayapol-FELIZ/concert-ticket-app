"use client";

import React from 'react'
import { Trash2, User } from 'lucide-react';

interface CardConcertProps {
    name: string;
    description: string;
    totalOfSeat: number;
    onClickDelete: () => void
}

const CardConcert = ({ name, description, totalOfSeat, onClickDelete }: CardConcertProps) => {
    return (
        <div className='bg-white px-4 pb-4 border border-gray-300 rounded-lg'>
            <p className='text-2xl font-bold text-blue-500 py-4 border-b border-gray-300'>{name}</p>
            <div className='my-4'>
                {description}
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <User />
                    <p>{totalOfSeat}</p>
                </div>
                <button onClick={onClickDelete} className='flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:opacity-80 rounded-md cursor-pointer transition-all'>
                    <Trash2 className='text-white' />
                    <p className='text-white font-medium'>Delete</p>
                </button>
            </div>
        </div>
    )
}

export default CardConcert