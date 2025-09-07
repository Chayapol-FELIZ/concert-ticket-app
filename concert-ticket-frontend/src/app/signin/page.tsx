'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockUsers } from '@/constants/MockUsers'
import { FieldErrors, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slice/userSlice'

export interface FormInput {
    username: string;
    password: string;
}

export default function MockLoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const methods = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        // resolver: zodResolver(schema)
    });

    const { register, handleSubmit } = methods;

    // const handleLogin = () => {
    //     const user = mockUsers.find(
    //         (u) => u.username === username && u.password === password
    //     )

    //     if (!user) {
    //         setError('Invalid username or password')
    //         return
    //     }

    //     // Login success
    //     localStorage.setItem('mockUser', JSON.stringify(user));
    //     router.push(`/${user.role}`)
    // }

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        const { username, password } = data;
        const user = mockUsers.find(
            (u) => u.username === username && u.password === password
        )
        if (!user) {
            setError('Invalid username or password')
            return
        }

        localStorage.setItem('mockUser', JSON.stringify(user));
        dispatch(setUser(user));
        router.push(`/${user.role}`);
    }

    const onError = (error: FieldErrors<FormInput>) => {
        console.error('error', error)
    }

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className='my-4'>
                        <div className='flex flex-col w-full gap-4'>
                            <div>
                                <p className='text-gray-800 mb-2'>Username</p>
                                <input
                                    {...register("username")}
                                    placeholder='admin / user'
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                />
                            </div>
                            <div>
                                <p className='text-gray-800 mb-2'>Password</p>
                                <input
                                    {...register("password")}
                                    placeholder='P@ssw0rd'
                                    className="w-full px-3 py-2 border rounded focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Sign In
                    </button>
                </form>
            </FormProvider>

            {/* <div className="space-y-4">
                <div>
                    <label className="block mb-1">Username</label>
                    <input
                        className="w-full px-3 py-2 border rounded focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin / user"
                    />
                </div>

                <div>
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="P@ssw0rd"
                    />
                </div>

                {error && <p className="text-red-600">{error}</p>}

                <button
                    className="w-full bg-blue-600 text-white py-2 rounded"
                    onClick={handleLogin}
                >
                    Sign In
                </button>
            </div> */}
        </div>
    )
}