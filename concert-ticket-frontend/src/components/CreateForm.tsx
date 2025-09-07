import React from 'react'
import { FieldErrors, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormInput {
    name: string;
    totalOfSeat: number;
    description: string;
}

const schema = z.object({
    name: z.string().min(1, "Concert name is required"),
    totalOfSeat: z.number().min(1, "Total seat must be at least 1"),
    description: z.string().min(1, "Description is required")
});

const inputStyles = `w-full py-1 px-2 text-sm text-gray-800 border border-gray-300 focus:outline-none rounded-md`

export interface CreateFormProps {
    onRefetch: () => void
}

const CreateForm = (props: CreateFormProps) => {
    const { onRefetch } = props;

    const methods = useForm({
        defaultValues: {
            name: "",
            totalOfSeat: 0,
            description: ""
        },
        // resolver: zodResolver(schema)
    });

    const { register, handleSubmit } = methods;


    const { mutate, isPending } = useMutation({
        mutationFn: (body: FormInput) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/concerts`, body).then((res) => res.data),
    })

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        await mutate(data, {
            onSuccess: () => {
                toast.success('Create concert ticket successfully');
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

    const onError = (error: FieldErrors<FormInput>) => {
        console.log('error', error)
    }

    return (
        <div className='bg-white px-4 pb-4 border border-gray-300 rounded-lg'>
            <p className='text-2xl font-bold text-blue-500 py-4 border-b border-gray-300'>Create</p>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className='my-4'>
                        <div className='flex flex-row w-full gap-4'>
                            <div className='w-1/2'>
                                <p className='text-gray-800 mb-2'>Concert Name</p>
                                <input
                                    {...register("name")}
                                    placeholder='Please input concert name'
                                    className={inputStyles} />
                            </div>
                            <div className='w-1/2'>
                                <p className='text-gray-800 mb-2'>Total of seat</p>
                                <input
                                    {...register("totalOfSeat", { valueAsNumber: true })}
                                    placeholder='Please input total of seat'
                                    className={inputStyles}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-gray-800 mb-2'>Description</p>
                            <textarea
                                {...register("description")}
                                rows={4}
                                placeholder='Please input description'
                                className={inputStyles}
                            />
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button disabled={isPending} className='flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:opacity-80 rounded-md cursor-pointer transition-all'>
                            <SaveOutlinedIcon sx={{ color: 'white' }} />
                            <p className='text-white font-medium'>Save</p>
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreateForm