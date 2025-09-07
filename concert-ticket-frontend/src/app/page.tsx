import { Loader2 } from 'lucide-react'
import React from 'react'

const Home = () => {
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <Loader2 size={30} className=' animate-spin' />
        </div>
    )
}

export default Home