import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    I_Business_ROLE,
    I_FLOOR,
    I_PERSON,
    I_Project,
    I_SCHEDULED_ACTIVITIES,
    I_UNIT
} from "../../core/definition/definition.model.ts";
import {getAllFloorsReq, getAllProjectsReq, GetAllUnitReq} from "../../core/definition/definition.service.ts";

export interface DefinitionState {
    projects: {
        data: I_Project[],
        pending: boolean,
    },
    floors: {
        data: I_FLOOR[],
        pending: boolean,
    },
    units: {
        data: I_UNIT[],
        pending: boolean,
    },
    commodities: {
        data: any[],
        pending: boolean,
    },
    persons: {
        data: I_PERSON[],
        pending: boolean,
    },
    businessRoles: {
        data: I_Business_ROLE[],
        pending: boolean,
    },
    scheduledActivities: {
        data: I_SCHEDULED_ACTIVITIES[],
        pending: boolean,
    }
}

const initialState: DefinitionState = {
    projects: {
        data: [],
        pending: false,
    },
    floors: {
        data: [],
        pending: false,
    },
    units: {
        data: [],
        pending: false,
    },
    commodities: {
        data: [],
        pending: false,
    },
    persons: {
        data: [],
        pending: false,
    },
    businessRoles: {
        data: [],
        pending: false,
    },
    scheduledActivities: {
        data: [],
        pending: false,
    }
};

export const getAllProjects = createAsyncThunk(
    "definition/getAllProjects",
    async (
        body=null,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await getAllProjectsReq(state?.user?.user?.id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const getAllFloors = createAsyncThunk(
    "definition/getAllFloors",
    async (
        projectId,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await getAllFloorsReq(state?.user?.user?.id,projectId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const getAllUnits = createAsyncThunk(
    "definition/getAllFloors",
    async (
        body: {projectId: any,floorId: any},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetAllUnitReq(state?.user?.user?.id,body.projectId,body.floorId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const definitionSlicer = createSlice({
    name: 'definition',
    initialState,
    reducers: {
        setProjects: (state: DefinitionState, action: PayloadAction<any>) => {
            state.projects.data = action.payload
        },
    },
    extraReducers: (builder) => {
        //#region getAllProjects-----
        builder
            .addCase(getAllProjects.pending, (state:DefinitionState) => {
                state.projects.pending = true;
            })
            .addCase(getAllProjects.fulfilled, (state:DefinitionState, {payload}) => {
                state.projects.pending = false;
                state.projects.data = [...payload?.model];
            })
            .addCase(getAllProjects.rejected, (state:DefinitionState, {error}) => {
                state.projects.pending = false;
            });
        //#endregion
        // #region getAllFloors-----
        builder
            .addCase(getAllFloors.pending, (state:DefinitionState) => {
                state.floors.pending = true;
            })
            .addCase(getAllFloors.fulfilled, (state:DefinitionState, {payload}) => {
                state.floors.pending = false;
                state.floors.data = [...payload?.model];
            })
            .addCase(getAllFloors.rejected, (state:DefinitionState, {error}) => {
                state.floors.pending = false;
            });
        //#endregion
        // #region getAllUnits-----
        builder
            .addCase(getAllUnits.pending, (state:DefinitionState) => {
                state.units.pending = true;
            })
            .addCase(getAllUnits.fulfilled, (state:DefinitionState, {payload}) => {
                state.units.pending = false;
                state.units.data = [...payload?.model];
            })
            .addCase(getAllUnits.rejected, (state:DefinitionState, {error}) => {
                state.units.pending = false;
            });
        //#endregion
    }
})

// Action creators are generated for each case reducer function
export const {setProjects} = definitionSlicer.actions

export default definitionSlicer.reducer