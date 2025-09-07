import React from 'react'
import { formatNumber } from '@/utils/formatNumber';

export interface CardStatusProps {
    title: string;
    amount: number;
    color: string;
    icon?: React.ElementType;
}

const CardStatus = ({ title = "CardStatus", color, amount = 0, icon: Icon }: CardStatusProps) => {
    return (
        <div style={{ backgroundColor: color }} className={`col-span-1 flex flex-col justify-start items-center rounded-lg p-4 overflow-hidden border border-gray-300`}>
            {Icon && <Icon sx={{ fontSize: 40, color: "white" }} />}
            <p className='text-xl text-white'>{title}</p>
            <p className='text-5xl text-white my-4'>{formatNumber(amount)}</p>
        </div>
    )
}

export default CardStatus