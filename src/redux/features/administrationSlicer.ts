import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AddNewUserReq, GetAllRolesReq, UpdateUserReq} from "../../core/administrations/administrations.service.ts";
import {I_ROLE} from "../../core/administrations/administrations.model.ts";


const getUserId = (state) => {
    return state?.user?.user?.id ?? localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.id : '1';
}

export interface AdministrationState {
    roles: {
        data: I_ROLE[],
        pending: boolean,
        addState: boolean,
    }
    users: {
        addState: boolean
    }
}

const initialState: AdministrationState = {
    roles: {
        data: [],
        pending: false,
        addState: false,
    },
    users: {
        addState: false,
    }
};

export const GetAllRoles = createAsyncThunk(
    "administrations/GetAllRoles",
    async (
        body = undefined,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state: any = getState();
            const userId = getUserId(state);
            const {data} = await GetAllRolesReq(userId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewUser = createAsyncThunk(
    "administrations/AddNewUser",
    async (
        body: any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state: any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewUserReq(userId, body);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateUser = createAsyncThunk(
    "administrations/UpdateUser",
    async (
        body: any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state: any = getState();
            const userId = getUserId(state);
            const {data} = await UpdateUserReq(userId, body);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const administrationSlicer = createSlice({
    name: 'administrations',
    initialState,
    reducers: undefined,
    extraReducers: (builder) => {
        //#region GetAllRoles-----
        builder
            .addCase(GetAllRoles.pending, (state: AdministrationState) => {
                state.roles.pending = true;
            })
            .addCase(GetAllRoles.fulfilled, (state: AdministrationState, {payload}) => {
                state.roles.pending = false;
                state.roles.data = [...payload?.model];
            })
            .addCase(GetAllRoles.rejected, (state: AdministrationState, {error}) => {
                state.roles.pending = false;
            });
        //#endregion
        // #region AddNewUser-----
        builder
            .addCase(AddNewUser.pending, (state: AdministrationState) => {
                state.users.addState = true;
            })
            .addCase(AddNewUser.fulfilled, (state: AdministrationState, {payload}) => {
                state.users.addState = false;
            })
            .addCase(AddNewUser.rejected, (state: AdministrationState, {error}) => {
                state.users.addState = false;
            });
        //#endregion
        // #region UpdateUser-----
        builder
            .addCase(UpdateUser.pending, (state: AdministrationState) => {
                state.users.addState = true;
            })
            .addCase(UpdateUser.fulfilled, (state: AdministrationState, {payload}) => {
                state.users.addState = false;
            })
            .addCase(UpdateUser.rejected, (state: AdministrationState, {error}) => {
                state.users.addState = false;
            });
        //#endregion
    }
})

// Action creators are generated for each case reducer function

export default administrationSlicer.reducer