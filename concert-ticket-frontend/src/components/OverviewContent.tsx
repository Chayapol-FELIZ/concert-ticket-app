import React, { useState } from 'react'
import CardConcert from './CardConcert';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface Concert {
    _id: string;
    name: string;
    description: string;
    totalOfSeat: number;
}

export interface OverviewContentProps {
    data: Concert[];
    isLoading?: boolean;
    onRefetch: () => void;
}

const OverviewContent = ({ data = [], onRefetch }: OverviewContentProps) => {
    const { mutate } = useMutation({
        mutationFn: (id: string) => axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts/${id}`).then((res) => res.data),
    })

    const [deleteConcert, setDeleteConcert] = useState<Concert | null>(null);

    const handleDelete = async () => {
        if (!deleteConcert?._id) return;

        await mutate(deleteConcert?._id, {
            onSuccess: () => {
                toast.success('Delete concert ticket successfully');
                onRefetch();
            },
            onError: (error: Error) => {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message;
                    toast.error(message);
                }
            }
        })

    }

    return (
        <div className='w-full flex flex-col gap-2'>
            {data.map((concert) =>
                <CardConcert
                    key={concert?._id}
                    name={concert?.name}
                    description={concert?.description}
                    totalOfSeat={concert?.totalOfSeat}
                    onClickDelete={() => setDeleteConcert(concert)}
                />)
            }
            <ConfirmDeleteDialog
                isOpen={!!deleteConcert}
                onClose={() => setDeleteConcert(null)}
                onConfirm={handleDelete}
                concertName={deleteConcert?.name}
            />
        </div>
    )
}

export default OverviewContent