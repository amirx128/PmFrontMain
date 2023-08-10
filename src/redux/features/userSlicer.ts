import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    user: any,
    isLoggined: boolean,
}

const initialState: UserState = {
    user: null,
    isLoggined: false,
};

export const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state:UserState, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        setLoggined: (state:UserState, action: PayloadAction<any>) => {
            state.isLoggined = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser,setLoggined } = userSlicer.actions

export default userSlicer.reducer