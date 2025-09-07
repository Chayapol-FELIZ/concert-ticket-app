import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type Role = 'admin' | 'user'

interface userState {
    _id: string | null;
    name: string;
    role: Role;
}

const initialState: userState = {
    _id: null,
    name: '',
    role: 'user',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleRole: (state) => {
            state.role = state.role === 'admin' ? 'user' : 'admin'
        },
        setRole: (state, action: PayloadAction<Role>) => {
            state.role = action.payload
        },
        setUser: (state, action: PayloadAction<userState>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const { toggleRole, setRole, setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user
export const selectRole = (state: RootState) => state.user.role

export default userSlice.reducer