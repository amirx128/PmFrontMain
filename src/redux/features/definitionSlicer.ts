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
    UpdateBusinessRoleReq, UpdateFloorReq, UpdateNewActivityScheduleReq,
    UpdatePersonReq, UpdateProjectReq, UpdateUnitReq
} from "../../core/definition/definition.service.ts";


const getUserId = (state) => {
    return state?.user?.user?.id ?? localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.id : '1';
}

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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await getAllProjectsReq(userId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const getAllFloors = createAsyncThunk(
    "definition/getAllFloors",
    async (
        projectId:any,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await getAllFloorsReq(userId,projectId);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetAllUnitReq(userId,body.projectId,body.floorId);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewProjectReq(userId,newName);
            if(data?.isSuccess){
                dispatch(getAllProjects());
            }
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateProject = createAsyncThunk(
    "definition/UpdateProject",
    async (
        body:{id:any,name:any},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await UpdateProjectReq(userId,body?.id,body?.name);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewUnitReq(userId,body.projectId,body.projectfloorId,body.unitName,body.code);
            if(data?.isSuccess){
                dispatch(getAllProjects());
            }
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateUnit = createAsyncThunk(
    "definition/UpdateUnit",
    async (
        body:{projectId: any,id:any,projectfloorId:any,unitName:string,code:string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await UpdateUnitReq(userId,body.id,body.projectId,body.projectfloorId,body.unitName,body.code);
            if(data?.isSuccess){
                dispatch(getAllProjects());
            }
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewFloor = createAsyncThunk(
    "definition/AddNewFloor",
    async (
        body:{projectId:any,floorName:any,code:any},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewFloorReq(userId,body.projectId,body.floorName,body.code);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateFloor = createAsyncThunk(
    "definition/UpdateFloor",
    async (
        body:{projectId:any,id:any,floorName:any,code:any},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await UpdateFloorReq(userId,body.id,body.projectId,body.floorName,body.code);
            if(data?.isSuccess){
                dispatch(getAllProjects());
            }
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetAllCommodityOnTreeReq(userId,body.projectId,body.commodityName,body.code);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetAllCommoditiesReq(userId);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewCommodityReq(userId,body);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetOneCommodityDetailsReq(userId,commodityId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetAllPersons = createAsyncThunk(
    "definition/GetAllPersons",
    async (
        body=undefined,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetAllPersonsReq(userId);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetPersonDetailsReq(userId,id);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewPersonReq(userId,body);
            if(data?.isSuccess){
                dispatch(GetAllPersons());
            }
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await UpdatePersonReq(userId,body?.id,body);
            if(data?.isSuccess){
                dispatch(GetAllPersons());
            }
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetAllBusinessRolesReq(userId);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetBusinessRoleDetailesReq(userId,id);
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewBusinessRoleReq(userId,body.name,body.title);
            if(data?.isSuccess){
                // @ts-ignore
                dispatch(GetAllBusinessRoles());
            }
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await UpdateBusinessRoleReq(userId,body.id,body.name,body.title);
            if(data?.isSuccess){
                // @ts-ignore
                dispatch(GetAllBusinessRoles());
            }
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const GetScheduleActivities = createAsyncThunk(
    "definition/GetScheduleActivities",
    async (
        body=undefined,
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetScheduleActivitiesReq(userId);
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const AddNewActivitySchedule = createAsyncThunk(
    "definition/AddNewActivitySchedule",
    async (
        body: { name: string,desc: string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await AddNewActivityScheduleReq(userId,body.name,body.desc);
            if(data?.isSuccess){
                dispatch(GetScheduleActivities());
            }
            return fulfillWithValue(data);
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
);

export const UpdateNewActivitySchedule = createAsyncThunk(
    "definition/UpdateNewActivitySchedule",
    async (
        body: { id:any,name: string,desc: string},
        {rejectWithValue, fulfillWithValue, dispatch, getState}
    ) => {
        try {
            const state:any = getState();
            debugger;
            const userId = getUserId(state);
            const {data} = await UpdateNewActivityScheduleReq(userId,body.id,body.name,body.desc);
            if(data?.isSuccess){
                dispatch(GetScheduleActivities());
            }
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
            const state:any = getState();
            const userId = getUserId(state);
            const {data} = await GetActivityScheduleDetailsReq(userId,id);
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
        // #region UpdateProject-----
        builder
            .addCase(UpdateProject.pending, (state:DefinitionState) => {
                state.projects.addState = true;
            })
            .addCase(UpdateProject.fulfilled, (state:DefinitionState, {payload}) => {
                state.projects.addState = false;
            })
            .addCase(UpdateProject.rejected, (state:DefinitionState, {error}) => {
                state.projects.addState = false;
            });
        //#endregion
        // #region AddNewFloor-----
        builder
            .addCase(AddNewFloor.pending, (state:DefinitionState) => {
                state.floors.addState = true;
            })
            .addCase(AddNewFloor.fulfilled, (state:DefinitionState, {payload}) => {
                state.floors.addState = false;
            })
            .addCase(AddNewFloor.rejected, (state:DefinitionState, {error}) => {
                state.floors.addState = false;
            });
        //#endregion
        // #region UpdateFloor-----
        builder
            .addCase(UpdateFloor.pending, (state:DefinitionState) => {
                state.floors.addState = true;
            })
            .addCase(UpdateFloor.fulfilled, (state:DefinitionState, {payload}) => {
                state.floors.addState = false;
            })
            .addCase(UpdateFloor.rejected, (state:DefinitionState, {error}) => {
                state.floors.addState = false;
            });
        //#endregion
        // #region AddNewUnit-----
        builder
            .addCase(AddNewUnit.pending, (state:DefinitionState) => {
                state.units.addState = true;
            })
            .addCase(AddNewUnit.fulfilled, (state:DefinitionState, {payload}) => {
                state.units.addState = false;
            })
            .addCase(AddNewUnit.rejected, (state:DefinitionState, {error}) => {
                state.units.addState = false;
            });
        //#endregion
        // #region UpdateUnit-----
        builder
            .addCase(UpdateUnit.pending, (state:DefinitionState) => {
                state.units.addState = true;
            })
            .addCase(UpdateUnit.fulfilled, (state:DefinitionState, {payload}) => {
                state.units.addState = false;
            })
            .addCase(UpdateUnit.rejected, (state:DefinitionState, {error}) => {
                state.units.addState = false;
            });
        //#endregion
        // #region businessRoles-----
        builder
            .addCase(GetAllBusinessRoles.pending, (state:DefinitionState) => {
                state.businessRoles.pending = true;
            })
            .addCase(GetAllBusinessRoles.fulfilled, (state:DefinitionState, {payload}) => {
                state.businessRoles.pending = false;
                state.businessRoles.data = [...payload?.model];
            })
            .addCase(GetAllBusinessRoles.rejected, (state:DefinitionState, {error}) => {
                state.businessRoles.pending = false;
            });
        //#endregion
        // #region GetAllPersons-----
        builder
            .addCase(GetAllPersons.pending, (state:DefinitionState) => {
                state.persons.pending = true;
            })
            .addCase(GetAllPersons.fulfilled, (state:DefinitionState, {payload}) => {
                state.persons.pending = false;
                state.persons.data = [...payload?.model];
            })
            .addCase(GetAllPersons.rejected, (state:DefinitionState, {error}) => {
                state.persons.pending = false;
            });
        //#endregion
        // #region GetScheduleActivities-----
        builder
            .addCase(GetScheduleActivities.pending, (state:DefinitionState) => {
                state.scheduledActivities.pending = true;
            })
            .addCase(GetScheduleActivities.fulfilled, (state:DefinitionState, {payload}) => {
                state.scheduledActivities.pending = false;
                state.scheduledActivities.data = [...payload?.model];
            })
            .addCase(GetScheduleActivities.rejected, (state:DefinitionState, {error}) => {
                state.scheduledActivities.pending = false;
            });
        //#endregion
    }
})

// Action creators are generated for each case reducer function
export const {setProjects} = definitionSlicer.actions

export default definitionSlicer.reducer