import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  I_Business_ROLE,
  I_COMMODITY,
  I_COMMODITY_TREE,
  I_FLOOR,
  I_PERSON,
  I_PLEASE_OF_USE,
  I_PRODUCER,
  I_Project,
  I_SCHEDULED_ACTIVITIES,
  I_SUPPLIER,
  I_UNIT,
  I_Warehouses,
} from '../../core/definition/definition.model.ts';
import {
  AddNewActivityScheduleReq,
  AddNewBusinessRoleReq,
  AddNewCommodityReq,
  AddNewFloorReq,
  AddNewPersonReq,
  AddNewProducerReq,
  AddNewProjectReq,
  AddNewUnitReq,
  AddNewWarehouse,
  GetActivityScheduleDetailsReq,
  GetAllBusinessRolesReq,
  GetAllCommoditiesReq,
  GetAllCommodityOnTreeReq,
  getAllFloorsReq,
  GetAllPersonsReq,
  GetAllPlaseOfUseReq,
  GetAllProducersReq,
  getAllProjectsReq,
  GetAllSuppliersReq,
  GetAllUnitReq,
  GetBusinessRoleDetailesReq,
  GetOneCommodityDetailsReq,
  GetPersonDetailsReq,
  GetScheduleActivitiesReq,
  UpdateBusinessRoleReq,
  UpdateCommodityDetailsReq,
  UpdateFloorReq,
  UpdateNewActivityScheduleReq,
  UpdatePersonReq,
  UpdateProducerInfoReq,
  UpdateProjectReq,
  UpdateUnitReq,
  UpdateWarehouse,
  GetAllWarehouseReq,
  GetManyFloorUnit,
  GetManyUnitUsability,
  GetAllProjects_Floor_Unit_Usability,
  GetOneProjectFloor,
} from '../../core/definition/definition.service.ts';

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.id
    : '1';
};

export interface DefinitionState {
  projects: {
    data: I_Project[];
    pending: boolean;
    addState: boolean;
  };
  warehouses: {
    data: I_Warehouses[];
    pending: boolean;
    addState: boolean;
  };
  floors: {
    data: I_FLOOR[];
    pending: boolean;
    addState: boolean;
  };
  units: {
    data: I_UNIT[];
    pending: boolean;
    addState: boolean;
  };
  persons: {
    data: I_PERSON[];
    pending: boolean;
    addState: boolean;
  };
  businessRoles: {
    data: I_Business_ROLE[];
    pending: boolean;
    addState: boolean;
  };
  scheduledActivities: {
    data: I_SCHEDULED_ACTIVITIES[];
    pending: boolean;
    addState: boolean;
  };
  commodities: {
    data: I_COMMODITY[];
    pending: boolean;
    addState: boolean;
  };
  suppliers: {
    data: I_SUPPLIER[];
    pending: boolean;
    addState: boolean;
  };
  producers: {
    data: I_PRODUCER[];
    pending: boolean;
    addState: boolean;
  };
  pleaseOfUse: {
    data: I_PLEASE_OF_USE[];
    pending: boolean;
  };
  commoditiesOnTree: {
    data: I_COMMODITY_TREE[];
    pending: boolean;
  };
  manyFloorUnit: {
    data: any;
    pending: boolean;
  };
  manyUnitUsability: {
    data: any;
    pending: boolean;
  };
  selectedCommodity: any;
  selectedProject: any;
  selectedFloor: any;
  allProjectsFloorUnitUsability: {
    data: any;
    pending: boolean;
  };

  oneProjectFloor: {
    data: any;
    pending: boolean;
  };
}

const initialState: DefinitionState = {
  projects: {
    data: [],
    pending: false,
    addState: false,
  },
  warehouses: {
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
  },
  commodities: {
    data: [],
    pending: false,
    addState: false,
  },
  producers: {
    data: [],
    pending: false,
    addState: false,
  },
  suppliers: {
    data: [],
    pending: false,
    addState: false,
  },
  pleaseOfUse: {
    data: [],
    pending: false,
  },
  commoditiesOnTree: {
    data: [],
    pending: false,
  },
  manyFloorUnit: {
    data: [],
    pending: false,
  },
  manyUnitUsability: {
    data: [],
    pending: false,
  },
  selectedCommodity: null,
  selectedProject: null,
  selectedFloor: null,
  allProjectsFloorUnitUsability: {
    data: [],
    pending: false,
  },
  oneProjectFloor: {
    data: [],
    pending: false,
  },
};

export const getAllWarehouses = createAsyncThunk(
  'definition/getAllWarehouses',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllWarehouseReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const getAllProjects = createAsyncThunk(
  'definition/getAllProjects',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await getAllProjectsReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetAllProjects_Floor_Unit_UsabilityAction = createAsyncThunk(
  'definition/GetAllProjects_Floor_Unit_UsabilityAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllProjects_Floor_Unit_Usability(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllProducers = createAsyncThunk(
  'definition/GetAllProducers',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllProducersReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllPleaseOfUse = createAsyncThunk(
  'definition/GetAllPleaseOfUse',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllPlaseOfUseReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllSuppliers = createAsyncThunk(
  'definition/GetAllSuppliers',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllSuppliersReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetManyFloorUnitAction = createAsyncThunk(
  'definition/GetManyFloorUnitAction',
  async (
    body: { ids: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetManyFloorUnit(userId, body.ids);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetManyUnitUsabilityAction = createAsyncThunk(
  'definition/GetManyUnitUsabilityAction',
  async (
    body: { ids: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetManyUnitUsability(userId, body.ids);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const getAllFloors = createAsyncThunk(
  'definition/getAllFloors',
  async (
    projectId: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await getAllFloorsReq(userId, projectId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const getAllUnits = createAsyncThunk(
  'definition/getAllUnits',
  async (
    body: { projectId: any; floorId: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllUnitReq(
        userId,
        body.projectId,
        body.floorId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewProject = createAsyncThunk(
  'definition/AddNewProject',
  async (
    body: { newName: any; commodities?: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewProjectReq(
        userId,
        body?.newName,
        body?.commodities
      );
      if (data?.isSuccess) {
        dispatch(getAllProjects());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdateProject = createAsyncThunk(
  'definition/UpdateProject',
  async (
    body: { id: any; name: any; commodities?: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateProjectReq(
        userId,
        body?.id,
        body?.name,
        body?.commodities
      );
      if (data?.isSuccess) {
        dispatch(getAllProjects());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewUnit = createAsyncThunk(
  'definition/AddNewUnit',
  async (
    body: {
      projectfloorId: any;
      unitName: string;
      code: string;
      commodities?: any;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewUnitReq(
        userId,
        body.projectfloorId,
        body.unitName,
        body.code,
        body?.commodities
      );
      if (data?.isSuccess) {
        dispatch(getAllProjects());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdateUnit = createAsyncThunk(
  'definition/UpdateUnit',
  async (
    body: {
      id: any;
      projectfloorId: any;
      unitName: string;
      code: string;
      commodities?: any;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateUnitReq(
        userId,
        body.id,
        body.projectfloorId,
        body.unitName,
        body.code,
        body?.commodities
      );
      if (data?.isSuccess) {
        dispatch(getAllProjects());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewFloor = createAsyncThunk(
  'definition/AddNewFloor',
  async (
    body: { projectId: any; floorName: any; code: any; commodities?: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewFloorReq(
        userId,
        body.projectId,
        body.floorName,
        body.code,
        body.commodities
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdateFloor = createAsyncThunk(
  'definition/UpdateFloor',
  async (
    body: {
      projectId: any;
      id: any;
      floorName: any;
      code: any;
      commodities?: any;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateFloorReq(
        userId,
        body.id,
        body.projectId,
        body.floorName,
        body.code,
        body?.commodities
      );
      if (data?.isSuccess) {
        dispatch(getAllProjects());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetAllCommodityOnTree = createAsyncThunk(
  'definition/GetAllCommodityOnTree',
  async (
    body: { projectId: any; commodityName: string; code: string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllCommodityOnTreeReq(
        userId,
        body.projectId,
        body.commodityName,
        body.code
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewCommodity = createAsyncThunk(
  'definition/AddNewCommodity',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewCommodityReq(userId, body);
      if (data?.isSuccess) {
        dispatch(GetAllCommodities());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdateCommodityDetails = createAsyncThunk(
  'definition/UpdateCommodityDetails',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateCommodityDetailsReq(userId, body);
      if (data?.isSuccess) {
        dispatch(GetAllCommodities());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetOneCommodityDetails = createAsyncThunk(
  'definition/GetOneCommodityDetails',
  async (
    commodityId: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetOneCommodityDetailsReq(userId, commodityId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllPersons = createAsyncThunk(
  'definition/GetAllPersons',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllPersonsReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetPersonDetails = createAsyncThunk(
  'definition/GetPersonDetails',
  async (
    id: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetPersonDetailsReq(userId, id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewPerson = createAsyncThunk(
  'definition/AddNewPerson',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewPersonReq(userId, body);
      if (data?.isSuccess) {
        dispatch(GetAllPersons());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdatePerson = createAsyncThunk(
  'definition/UpdatePerson',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdatePersonReq(userId, body?.id, body);
      if (data?.isSuccess) {
        dispatch(GetAllPersons());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllBusinessRoles = createAsyncThunk(
  'definition/GetAllBusinessRoles',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllBusinessRolesReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetBusinessRoleDetailes = createAsyncThunk(
  'definition/GetBusinessRoleDetailes',
  async (
    id: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetBusinessRoleDetailesReq(userId, id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewBusinessRole = createAsyncThunk(
  'definition/AddNewBusinessRole',
  async (
    body: { name: string; title: string; projectId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewBusinessRoleReq(
        userId,
        body.name,
        body.title,
        body.projectId
      );
      if (data?.isSuccess) {
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
  'definition/UpdateBusinessRole',
  async (
    body: { name: string; title: string; id: any; projectId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateBusinessRoleReq(
        userId,
        body.id,
        body.name,
        body.title,
        body.projectId
      );
      if (data?.isSuccess) {
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
  'definition/GetScheduleActivities',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetScheduleActivitiesReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewActivitySchedule = createAsyncThunk(
  'definition/AddNewActivitySchedule',
  async (
    body: { name: string; desc: string; fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewActivityScheduleReq(
        userId,
        body.name,
        body.desc,
        body.fromDate,
        body.toDate
      );
      if (data?.isSuccess) {
        dispatch(GetScheduleActivities());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddNewProducer = createAsyncThunk(
  'definition/AddNewProducer',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewProducerReq(userId, body);
      if (data?.isSuccess) {
        dispatch(GetAllProducers());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const AddWarehouse = createAsyncThunk(
  'definition/AddWarehouse',
  async (
    body: {
      name: string;
      relatedCommodities: number[];
      projects: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { name, relatedCommodities, projects } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewWarehouse(
        userId,
        name,
        relatedCommodities,
        projects
      );
      if (data?.isSuccess) {
        dispatch(getAllWarehouses());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const UpdateWarehouseInfo = createAsyncThunk(
  'definition/UpdateWarehouseInfo',
  async (
    body: {
      name: string;
      id: number;
      relatedCommodities: number[];
      projects: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { name, relatedCommodities, projects, id } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateWarehouse(
        userId,
        id,
        name,
        relatedCommodities,
        projects
      );
      if (data?.isSuccess) {
        dispatch(getAllWarehouses());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdateProducerInfo = createAsyncThunk(
  'definition/UpdateProducerInfo',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateProducerInfoReq(userId, body);
      if (data?.isSuccess) {
        dispatch(GetAllProducers());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const UpdateNewActivitySchedule = createAsyncThunk(
  'definition/UpdateNewActivitySchedule',
  async (
    body: { id: any; name: string; desc: string; fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateNewActivityScheduleReq(
        userId,
        body.id,
        body.name,
        body.desc,
        body.fromDate,
        body.toDate
      );
      if (data?.isSuccess) {
        dispatch(GetScheduleActivities());
      }
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllCommodities = createAsyncThunk(
  'definition/GetAllCommodities',
  async (
    body = undefined,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllCommoditiesReq(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetActivityScheduleDetails = createAsyncThunk(
  'definition/GetActivityScheduleDetails',
  async (
    id: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetActivityScheduleDetailsReq(userId, id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetOneProjectFloorAction = createAsyncThunk(
  'definition/GetOneProjectFloorAction',
  async (
    body: { selectedItemId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetOneProjectFloor(userId, body.selectedItemId);
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
    clearSelectedCommodity: (
      state: DefinitionState,
      action: PayloadAction<any>
    ) => {
      state.selectedCommodity = action.payload;
    },
    setSelectedProjectAction: (
      state: DefinitionState,
      action: PayloadAction<any>
    ) => {
      state.selectedProject = action.payload;
    },
    setSelectedFloorAction: (
      state: DefinitionState,
      action: PayloadAction<any>
    ) => {
      state.selectedFloor = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region getAllProjects-----
    builder
      .addCase(getAllProjects.pending, (state: DefinitionState) => {
        state.projects.pending = true;
      })
      .addCase(
        getAllProjects.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.projects.pending = false;
          state.projects.data = [...payload?.model];
        }
      )
      .addCase(getAllProjects.rejected, (state: DefinitionState, { error }) => {
        state.projects.pending = false;
      });
    //#endregion
    //#region GetAllProjects_Floor_Unit_UsabilityAction-----
    builder
      .addCase(
        GetAllProjects_Floor_Unit_UsabilityAction.pending,
        (state: DefinitionState) => {
          state.allProjectsFloorUnitUsability.pending = true;
        }
      )
      .addCase(
        GetAllProjects_Floor_Unit_UsabilityAction.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.allProjectsFloorUnitUsability.pending = false;
          state.allProjectsFloorUnitUsability.data = payload?.model;
        }
      )
      .addCase(
        GetAllProjects_Floor_Unit_UsabilityAction.rejected,
        (state: DefinitionState, { error }) => {
          state.allProjectsFloorUnitUsability.pending = false;
        }
      );
    //#endregion
    //#region getAllWarehouses-----
    builder
      .addCase(getAllWarehouses.pending, (state: DefinitionState) => {
        state.warehouses.pending = true;
      })
      .addCase(
        getAllWarehouses.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.warehouses.pending = false;
          state.warehouses.data = [...payload?.model];
        }
      )
      .addCase(
        getAllWarehouses.rejected,
        (state: DefinitionState, { error }) => {
          state.warehouses.pending = false;
        }
      );
    //#endregion
    // #region getAllFloors-----
    builder
      .addCase(getAllFloors.pending, (state: DefinitionState) => {
        state.floors.pending = true;
      })
      .addCase(
        getAllFloors.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.floors.pending = false;
          state.floors.data = [...payload?.model];
        }
      )
      .addCase(getAllFloors.rejected, (state: DefinitionState, { error }) => {
        state.floors.pending = false;
      });
    //#endregion
    // #region getAllUnits-----
    builder
      .addCase(getAllUnits.pending, (state: DefinitionState) => {
        state.units.pending = true;
      })
      .addCase(getAllUnits.fulfilled, (state: DefinitionState, { payload }) => {
        state.units.pending = false;
        state.units.data = [...payload?.model];
      })
      .addCase(getAllUnits.rejected, (state: DefinitionState, { error }) => {
        state.units.pending = false;
      });
    //#endregion
    // #region AddNewProject-----
    builder
      .addCase(AddNewProject.pending, (state: DefinitionState) => {
        state.projects.addState = true;
      })
      .addCase(
        AddNewProject.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.projects.addState = false;
        }
      )
      .addCase(AddNewProject.rejected, (state: DefinitionState, { error }) => {
        state.projects.addState = false;
      });
    //#endregion
    // #region UpdateProject-----
    builder
      .addCase(UpdateProject.pending, (state: DefinitionState) => {
        state.projects.addState = true;
      })
      .addCase(
        UpdateProject.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.projects.addState = false;
        }
      )
      .addCase(UpdateProject.rejected, (state: DefinitionState, { error }) => {
        state.projects.addState = false;
      });
    //#endregion
    // #region AddNewFloor-----
    builder
      .addCase(AddNewFloor.pending, (state: DefinitionState) => {
        state.floors.addState = true;
      })
      .addCase(AddNewFloor.fulfilled, (state: DefinitionState, { payload }) => {
        state.floors.addState = false;
      })
      .addCase(AddNewFloor.rejected, (state: DefinitionState, { error }) => {
        state.floors.addState = false;
      });
    //#endregion
    // #region GetManyFloorUnitAction-----
    builder
      .addCase(GetManyFloorUnitAction.pending, (state: DefinitionState) => {
        state.manyFloorUnit.pending = true;
      })
      .addCase(
        GetManyFloorUnitAction.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.manyFloorUnit.pending = false;
          state.manyFloorUnit.data = payload.model;
        }
      )
      .addCase(
        GetManyFloorUnitAction.rejected,
        (state: DefinitionState, { error }) => {
          state.manyFloorUnit.pending = false;
        }
      );
    //#endregion
    // #region GetManyUnitUsabilityAction-----
    builder
      .addCase(GetManyUnitUsabilityAction.pending, (state: DefinitionState) => {
        state.manyUnitUsability.pending = true;
      })
      .addCase(
        GetManyUnitUsabilityAction.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.manyUnitUsability.pending = false;
          state.manyUnitUsability.data = payload.model;
        }
      )
      .addCase(
        GetManyUnitUsabilityAction.rejected,
        (state: DefinitionState, { error }) => {
          state.manyUnitUsability.pending = false;
        }
      );
    //#endregion
    // #region AddWarehouse-----
    builder
      .addCase(AddWarehouse.pending, (state: DefinitionState) => {
        state.warehouses.addState = true;
      })
      .addCase(
        AddWarehouse.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.warehouses.addState = false;
        }
      )
      .addCase(AddWarehouse.rejected, (state: DefinitionState, { error }) => {
        state.warehouses.addState = false;
      });
    //#endregion
    // #region UpdateWarehouseInfo-----
    builder
      .addCase(UpdateWarehouseInfo.pending, (state: DefinitionState) => {
        state.warehouses.addState = true;
      })
      .addCase(
        UpdateWarehouseInfo.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.warehouses.addState = false;
        }
      )
      .addCase(
        UpdateWarehouseInfo.rejected,
        (state: DefinitionState, { error }) => {
          state.warehouses.addState = false;
        }
      );
    //#endregion
    // #region UpdateFloor-----
    builder
      .addCase(UpdateFloor.pending, (state: DefinitionState) => {
        state.floors.addState = true;
      })
      .addCase(UpdateFloor.fulfilled, (state: DefinitionState, { payload }) => {
        state.floors.addState = false;
      })
      .addCase(UpdateFloor.rejected, (state: DefinitionState, { error }) => {
        state.floors.addState = false;
      });
    //#endregion
    // #region AddNewUnit-----
    builder
      .addCase(AddNewUnit.pending, (state: DefinitionState) => {
        state.units.addState = true;
      })
      .addCase(AddNewUnit.fulfilled, (state: DefinitionState, { payload }) => {
        state.units.addState = false;
      })
      .addCase(AddNewUnit.rejected, (state: DefinitionState, { error }) => {
        state.units.addState = false;
      });
    //#endregion
    // #region UpdateUnit-----
    builder
      .addCase(UpdateUnit.pending, (state: DefinitionState) => {
        state.units.addState = true;
      })
      .addCase(UpdateUnit.fulfilled, (state: DefinitionState, { payload }) => {
        state.units.addState = false;
      })
      .addCase(UpdateUnit.rejected, (state: DefinitionState, { error }) => {
        state.units.addState = false;
      });
    //#endregion
    // #region businessRoles-----
    builder
      .addCase(GetAllBusinessRoles.pending, (state: DefinitionState) => {
        state.businessRoles.pending = true;
      })
      .addCase(
        GetAllBusinessRoles.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.businessRoles.pending = false;
          state.businessRoles.data = [...payload?.model];
        }
      )
      .addCase(
        GetAllBusinessRoles.rejected,
        (state: DefinitionState, { error }) => {
          state.businessRoles.pending = false;
        }
      );
    //#endregion
    // #region GetAllPersons-----
    builder
      .addCase(GetAllPersons.pending, (state: DefinitionState) => {
        state.persons.pending = true;
      })
      .addCase(
        GetAllPersons.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.persons.pending = false;
          state.persons.data = [...payload?.model];
        }
      )
      .addCase(GetAllPersons.rejected, (state: DefinitionState, { error }) => {
        state.persons.pending = false;
      });
    //#endregion
    // #region GetScheduleActivities-----
    builder
      .addCase(GetScheduleActivities.pending, (state: DefinitionState) => {
        state.scheduledActivities.pending = true;
      })
      .addCase(
        GetScheduleActivities.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.scheduledActivities.pending = false;
          state.scheduledActivities.data = [...payload?.model];
        }
      )
      .addCase(
        GetScheduleActivities.rejected,
        (state: DefinitionState, { error }) => {
          state.scheduledActivities.pending = false;
        }
      );
    //#endregion
    // #region GetAllCommodities-----
    builder
      .addCase(GetAllCommodities.pending, (state: DefinitionState) => {
        state.commodities.pending = true;
      })
      .addCase(
        GetAllCommodities.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.commodities.pending = false;
          state.commodities.data = [...payload?.model];
        }
      )
      .addCase(
        GetAllCommodities.rejected,
        (state: DefinitionState, { error }) => {
          state.commodities.pending = false;
        }
      );
    //#endregion
    // #region GetAllProducers-----
    builder
      .addCase(GetAllProducers.pending, (state: DefinitionState) => {
        state.producers.pending = true;
      })
      .addCase(
        GetAllProducers.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.producers.pending = false;
          state.producers.data = [...payload?.model];
        }
      )
      .addCase(
        GetAllProducers.rejected,
        (state: DefinitionState, { error }) => {
          state.producers.pending = false;
        }
      );
    //#endregion
    // #region GetAllSuppliers-----
    builder
      .addCase(GetAllSuppliers.pending, (state: DefinitionState) => {
        state.suppliers.pending = true;
      })
      .addCase(
        GetAllSuppliers.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.suppliers.pending = false;
          state.suppliers.data = [...payload?.model];
        }
      )
      .addCase(
        GetAllSuppliers.rejected,
        (state: DefinitionState, { error }) => {
          state.suppliers.pending = false;
        }
      );
    //#endregion
    // #region GetAllPleaseOfUse-----
    builder
      .addCase(GetAllPleaseOfUse.pending, (state: DefinitionState) => {
        state.pleaseOfUse.pending = true;
      })
      .addCase(
        GetAllPleaseOfUse.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.pleaseOfUse.pending = false;
          state.pleaseOfUse.data = [...payload?.model];
        }
      )
      .addCase(
        GetAllPleaseOfUse.rejected,
        (state: DefinitionState, { error }) => {
          state.pleaseOfUse.pending = false;
        }
      );
    //#endregion
    // #region GetAllCommodityOnTree-----
    builder
      .addCase(GetAllCommodityOnTree.pending, (state: DefinitionState) => {
        state.commoditiesOnTree.pending = true;
      })
      .addCase(
        GetAllCommodityOnTree.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.commoditiesOnTree.pending = false;
          state.commoditiesOnTree.data = [...payload?.model];
        }
      )
      .addCase(
        GetAllCommodityOnTree.rejected,
        (state: DefinitionState, { error }) => {
          state.commoditiesOnTree.pending = false;
        }
      );
    //#endregion
    // #region GetOneCommodityDetails-----
    builder
      .addCase(GetOneCommodityDetails.pending, (state: DefinitionState) => {
        state.selectedCommodity = null;
      })
      .addCase(
        GetOneCommodityDetails.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.selectedCommodity = { ...payload?.model };
        }
      )
      .addCase(
        GetOneCommodityDetails.rejected,
        (state: DefinitionState, { error }) => {
          state.selectedCommodity = null;
        }
      );
    //#endregion
    // #region AddNewCommodity-----
    builder
      .addCase(AddNewCommodity.pending, (state: DefinitionState) => {
        state.commodities.addState = true;
      })
      .addCase(
        AddNewCommodity.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.commodities.addState = false;
        }
      )
      .addCase(
        AddNewCommodity.rejected,
        (state: DefinitionState, { error }) => {
          state.commodities.addState = false;
        }
      );
    //#endregion
    // #region GetOneProjectFloorAction-----
    builder
      .addCase(GetOneProjectFloorAction.pending, (state: DefinitionState) => {
        state.oneProjectFloor.pending = true;
      })
      .addCase(
        GetOneProjectFloorAction.fulfilled,
        (state: DefinitionState, { payload }) => {
          state.oneProjectFloor.pending = false;
          state.oneProjectFloor.data = payload.model;
        }
      )
      .addCase(
        GetOneProjectFloorAction.rejected,
        (state: DefinitionState, { error }) => {
          state.oneProjectFloor.pending = false;
        }
      );
    //#endregion
  },
});

// Action creators are generated for each case reducer function
export const {
  clearSelectedCommodity,
  setSelectedProjectAction,
  setSelectedFloorAction,
} = definitionSlicer.actions;

export default definitionSlicer.reducer;
