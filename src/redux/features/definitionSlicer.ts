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
import {
    AddNewActivityScheduleReq,
    AddNewBusinessRoleReq,
    AddNewCommodityReq,
    AddNewFloorReq,
    AddNewPersonReq,
    AddNewProjectReq,
    AddNewUnitReq, GetActivityScheduleDetailsReq,
    GetAllBusinessRolesReq,
    GetAllCommoditiesReq,
    GetAllCommodityOnTreeReq,
    getAllFloorsReq,
    GetAllPersonsReq,
    getAllProjectsReq,
    GetAllUnitReq,
    GetBusinessRoleDetailesReq,
    GetOneCommodityDetailsReq,
    GetPersonDetailsReq, GetScheduleActivitiesReq,
    UpdateBusinessRoleReq, UpdateNewActivityScheduleReq,
    UpdatePersonReq
} from "../../core/definition/definition.service.ts";

export interface DefinitionState {
    projects: {
        data: I_Project[],
        pending: boolean,
        addState: boolean,
    },
    floors: {
        data: I_FLOOR[],
        pending: boolean,
        addState: boolean,
    },
    units: {
        data: I_UNIT[],
        pending: boolean,
        addState: boolean,
    },
    commodities: {
        data: any[],
        pending: boolean,
    },
    persons: {
        data: I_PERSON[],
        pending: boolean,
        addState: boolean,
    },
    businessRoles: {
        data: I_Business_ROLE[],
        pending: boolean,
        addState: boolean,
    },
    scheduledActivities: {
        data: I_SCHEDULED_ACTIVITIES[],
        pending: boolean,
        addState: boolean,
    }
}

const initialState: DefinitionState = {
    projects: {
        data: [],
        pending: false,
        addState: false,
    },
    floors: {
        data: [],
        pending: false,
        addState: false,
    },
    units: {
        data: [],
        pending: false,
        addState: false,
    },
    commodities: {
        data: [],
        pending: false,
    },
    persons: {
        data: [],
        pending: false,
        addState: false,
    },
    businessRoles: {
        data: [],
        pending: false,
        addState: false,
    },
    scheduledActivities: {
        data: [],
        pending: false,
        addState: false,
    }
};

export const getAllProjects = createAsyncThunk(
    "definition/getAllProjects",
    async (
        body=undefined,
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
    "definition/getAllUnits",
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

export const AddNewProject = createAsyncThunk(
    "definition/AddNewProject",
    async (
        newName:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewProjectReq(state?.user?.user?.id,newName);
            if(data?.isSuccess){
                dispatch(getAllProjects());
            }
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewUnit = createAsyncThunk(
    "definition/AddNewUnit",
    async (
        body:{projectId: any,projectfloorId:any,unitName:string,code:string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewUnitReq(state?.user?.user?.id,body.projectId,body.projectfloorId,body.unitName,body.code);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewFloor = createAsyncThunk(
    "definition/AddNewFloor",
    async (
        body:{projectId:any,floorName:string,code:string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewFloorReq(state?.user?.user?.id,body.projectId,body.floorName,body.code);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetAllCommodityOnTree = createAsyncThunk(
    "definition/GetAllCommodityOnTree",
    async (
        body:{projectId:any,commodityName:string,code:string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetAllCommodityOnTreeReq(state?.user?.user?.id,body.projectId,body.commodityName,body.code);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetAllCommodities = createAsyncThunk(
    "definition/GetAllCommodities",
    async (
        body:{projectId:any,commodityName:string,code:string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetAllCommoditiesReq(state?.user?.user?.id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewCommodity = createAsyncThunk(
    "definition/AddNewCommodity",
    async (
        body:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewCommodityReq(state?.user?.user?.id,body);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetOneCommodityDetails = createAsyncThunk(
    "definition/GetOneCommodityDetails",
    async (
        commodityId:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetOneCommodityDetailsReq(state?.user?.user?.id,commodityId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetAllPersons = createAsyncThunk(
    "definition/GetAllPersons",
    async (
        commodityId:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetAllPersonsReq(state?.user?.user?.id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetPersonDetails = createAsyncThunk(
    "definition/GetPersonDetails",
    async (
        id:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetPersonDetailsReq(state?.user?.user?.id,id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewPerson = createAsyncThunk(
    "definition/AddNewPerson",
    async (
        body:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewPersonReq(state?.user?.user?.id,body);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdatePerson = createAsyncThunk(
    "definition/UpdatePerson",
    async (
        body:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await UpdatePersonReq(state?.user?.user?.id,body?.id,body);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetAllBusinessRoles = createAsyncThunk(
    "definition/GetAllBusinessRoles",
    async (
        body:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetAllBusinessRolesReq(state?.user?.user?.id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetBusinessRoleDetailes = createAsyncThunk(
    "definition/GetBusinessRoleDetailes",
    async (
        id:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetBusinessRoleDetailesReq(state?.user?.user?.id,id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewBusinessRole = createAsyncThunk(
    "definition/AddNewBusinessRole",
    async (
        body: { name: string,title: string },
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewBusinessRoleReq(state?.user?.user?.id,body.name,body.title);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateBusinessRole = createAsyncThunk(
    "definition/UpdateBusinessRole",
    async (
        body: { name: string,title: string,id: any },
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await UpdateBusinessRoleReq(state?.user?.user?.id,body.id,body.name,body.title);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetScheduleActivities = createAsyncThunk(
    "definition/GetScheduleActivities",
    async (
        body: { name: string,title: string,id: any },
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetScheduleActivitiesReq(state?.user?.user?.id);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewActivitySchedule = createAsyncThunk(
    "definition/AddNewActivitySchedule",
    async (
        body: { activityName: string,desc: string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await AddNewActivityScheduleReq(state?.user?.user?.id,body.activityName,body.desc);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateNewActivitySchedule = createAsyncThunk(
    "definition/UpdateNewActivitySchedule",
    async (
        body: { id:any,activityName: string,desc: string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await UpdateNewActivityScheduleReq(state?.user?.user?.id,body.id,body.activityName,body.desc);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetActivityScheduleDetails = createAsyncThunk(
    "definition/GetActivityScheduleDetails",
    async (
        id:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state = getState();
            const {data} = await GetActivityScheduleDetailsReq(state?.user?.user?.id,id);
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
        // #region AddNewProject-----
        builder
            .addCase(AddNewProject.pending, (state:DefinitionState) => {
                state.projects.addState = true;
            })
            .addCase(AddNewProject.fulfilled, (state:DefinitionState, {payload}) => {
                state.projects.addState = false;
            })
            .addCase(AddNewProject.rejected, (state:DefinitionState, {error}) => {
                state.projects.addState = false;
            });
        //#endregion
    }
})

// Action creators are generated for each case reducer function
export const {setProjects} = definitionSlicer.actions

export default definitionSlicer.reducer