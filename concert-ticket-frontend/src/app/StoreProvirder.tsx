"use client"

import { Provider } from 'react-redux'
import { store } from '@/store/store'

interface Props {
    children: React.ReactNode
}

export default function StoreProvider({ children }: Props) {
    return <Provider store={store}> {children} </Provider>
}

// "use client"

// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '@/store/store'

// interface Props {
//     children: React.ReactNode
// }

// export default function StoreProvider({ children }: Props) {
//     const storeRef = useRef<AppStore>(undefined);

//     if (!storeRef.current) {
//         storeRef.current = makeStore()
//     }

//     return <Provider store={storeRef.current}>{children}</Provider>
// }