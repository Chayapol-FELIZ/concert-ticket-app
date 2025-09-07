'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/slice/userSlice'
import { getCurrentUser } from '@/utils/getUserCurrent'

export default function AppInit({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const user = getCurrentUser();

        if (!user) {
            router.replace('/signin');
            return;
        }
        dispatch(setUser(user));
        router.replace(`/${user?.role}`);
    }, [])

    return <>{children}</>
}