import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  GetAllOriginalItems,
  GetOriginalItemsData,
  AddNewOriginalItem,
  UpdateOriginalItem,
  GetAllSubItems,
  GetSubItemsData,
  AddNewSubItem,
  UpdateSubItem,
  GetAllUsability,
  AddNewUsability,
  GetAllCheckLists,
  GetCheckListsData,
  AddNewCheckList,
  UpdateCheckList,
  GetUsabilityData,
  UpdateUsability,
  AllActiveCheckLists,
  CreateCheckListInstances,
  GetManySubItemsCheckLists,
  GetAllContractor,
  GetManyOrginalItemSubItems,
  GetAllOrginal_SubItem_ChechLists,
  GetCheckListStates,
  GetOneInstanceData,
  UpdateQcInstance,
  DeleteQcInstance,
  ContractorAddDateQ,
  ContractorAddDateSentItems,
  TechnicalApproveScheduleQ,
  TechnicalApproveScheduleSentItems,
  GetOneSubItemDetails,
  GetDuplicated,
  ContractorAddDate,
  technicalApproveSchedule,
  SetQcDate,
  SetQcDateQ,
  SetQcDateSentItems,
  InspectorEntryCheckListQ,
  InspectorEntryCheckListSentItems,
  InspectorEntryCheckList,
  InspectControlCheckListQ,
  InspectControlCheckListSentItems,
  InspectControlCheckList,
  QcManagerControlCheckListQ,
  QcManagerControlCheckListSentItems,
  QcManagerControlCheckList,
  QcFinalApproveQ,
  QcFinalApproveSentItems,
  QcFinalApprove,
  GetCheckListsDataAndValues,
  GetControlCheckListStates,
  ContractorSetIsDoneQ,
  ContractorSetIsDoneSentItems,
  ContractorSetIsDone,
  TechnicalOfficeAddOrdersQ,
  TechnicalOfficeAddOrdersSentItems,
  TechnicalOfficeAddOrders,
  QcFinalApproveCheckListRows,
  GetOneValueHistory,
  GetSubItemLevels,
  DeleteOriginalItem,
  DeleteSubItem,
} from '../../core/QC/qc.service';

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.id
    : '1';
};

export interface QcState {
  originalItems: {
    data: any;
    pending: boolean;
  };
  originalItemsAddState: {
    pending: boolean;
  };
  originalItemsUpdateState: {
    pending: boolean;
  };
  originalItemsDeleteState: {
    pending: boolean;
  };
  subItemsDeleteState: {
    pending: boolean;
  };

  selectedOriginalItem: {
    data: any;
    pending: boolean;
  };
  subItems: {
    data: any;
    pending: boolean;
  };
  subItemAddState: {
    pending: boolean;
  };
  subItemsUpdateState: {
    pending: boolean;
  };
  selectedSubItem: {
    data: any;
    pending: boolean;
  };
  usabilities: {
    data: any;
    pending: boolean;
  };
  usabilityAddState: {
    pending: boolean;
  };
  usabilityUpdateState: {
    pending: boolean;
  };
  selectedUsability: {
    data: any;
    pending: boolean;
  };
  checkLists: {
    data: any;
    pending: boolean;
  };
  selectedCheckList: {
    data: any;
    pending: boolean;
  };
  checkListAddState: {
    pending: boolean;
  };
  checkListUpdateState: {
    pending: boolean;
  };
  checkListInstances: {
    data: any;
    pending: boolean;
  };
  checkListInstancAddState: {
    pending: boolean;
  };
  checkListInstancRemoveState: {
    pending: boolean;
  };
  checkListInstancUpdateState: {
    pending: boolean;
  };
  manyOriginalItemsSubItems: {
    data: any;
    pending: boolean;
  };
  manySubItemsCheckLists: {
    data: any;
    pending: boolean;
  };
  contractors: {
    data: any;
    pending: boolean;
  };
  allOrginalSubItemChechLists: {
    data: any;
    pending: boolean;
  };
  checkListStates: {
    data: any;
    pending: boolean;
  };
  selectedCheckListInstance: {
    data: any;
    pending: boolean;
  };
  contractorsAddDateQ: {
    data: any;
    pending: boolean;
  };
  contractorsAddDateSentItem: {
    data: any;
    pending: boolean;
  };
  contractorAddDateState: {
    pending: boolean;
  };
  technicalApproveScheduleQ: {
    data: any;
    pending: boolean;
  };
  technicalApproveScheduleSentItem: {
    data: any;
    pending: boolean;
  };
  technicalApproveScheduleAddState: {
    pending: boolean;
  };
  qcDateQ: {
    data: any;
    pending: boolean;
  };
  qcDateSentItem: {
    data: any;
    pending: boolean;
  };
  qcDateAddState: {
    pending: boolean;
  };
  subItemDetails: {
    data: any;
    pending: boolean;
  };
  duplicatedCheckLists: {
    data: any;
    pending: boolean;
  };
  controlCheckListQ: {
    data: any;
    pending: boolean;
  };
  controlCheckListSentItem: {
    data: any;
    pending: boolean;
  };
  controlCheckListAddState: {
    pending: boolean;
  };
  managerControlCheckListQ: {
    data: any;
    pending: boolean;
  };
  managerControlCheckListSentItem: {
    data: any;
    pending: boolean;
  };
  managerControlCheckListAddState: {
    pending: boolean;
  };
  finalApproveQ: {
    data: any;
    pending: boolean;
  };
  finalApproveSentItem: {
    data: any;
    pending: boolean;
  };
  finalApproveAddState: {
    pending: boolean;
  };
  finalApproveRowAddState: {
    pending: boolean;
  };
  entryCheckListQ: {
    data: any;
    pending: boolean;
  };
  entryCheckListSentItem: {
    data: any;
    pending: boolean;
  };
  entryCheckListAddState: {
    pending: boolean;
  };
  /////////////////////////
  checkListsDataAndValues: {
    data: any;
    pending: boolean;
  };
  /////////////////////////
  contractorSetIsDoneQ: {
    data: any;
    pending: boolean;
  };
  contractorSetIsDoneSentItem: {
    data: any;
    pending: boolean;
  };
  contractorSetIsDoneAddState: {
    pending: boolean;
  };
  /////////////////////////
  /////////////////////////
  technicalOfficeAddOrdersQ: {
    data: any;
    pending: boolean;
  };
  technicalOfficeAddOrdersSentItem: {
    data: any;
    pending: boolean;
  };
  technicalOfficeAddOrdersAddState: {
    pending: boolean;
  };

  /////////////////////////

  controlChecklistStates: {
    data: any;
    pending: boolean;
  };
  oneValueHistory: {
    data: any;
    pending: boolean;
  };
  subItemsLevel: { data: any; pending: boolean };
}

const initialState: QcState = {
  originalItems: {
    data: [],
    pending: false,
  },
  originalItemsAddState: {
    pending: false,
  },
  originalItemsUpdateState: {
    pending: false,
  },
  originalItemsDeleteState: {
    pending: false,
  },
  subItemsDeleteState: {
    pending: false,
  },
  selectedOriginalItem: {
    data: undefined,
    pending: false,
  },
  subItems: {
    data: [],
    pending: false,
  },
  subItemAddState: {
    pending: false,
  },
  subItemsUpdateState: {
    pending: false,
  },
  selectedSubItem: {
    data: undefined,
    pending: false,
  },
  usabilities: {
    data: [],
    pending: false,
  },
  usabilityAddState: {
    pending: false,
  },
  usabilityUpdateState: {
    pending: false,
  },
  selectedUsability: {
    data: undefined,
    pending: false,
  },
  checkLists: {
    data: [],
    pending: false,
  },
  selectedCheckList: {
    data: undefined,
    pending: false,
  },
  checkListAddState: {
    pending: false,
  },
  checkListUpdateState: {
    pending: false,
  },
  checkListInstances: {
    data: [],
    pending: false,
  },
  checkListInstancAddState: {
    pending: false,
  },
  checkListInstancRemoveState: {
    pending: false,
  },
  checkListInstancUpdateState: {
    pending: false,
  },
  manySubItemsCheckLists: {
    data: [],
    pending: false,
  },
  manyOriginalItemsSubItems: {
    data: [],
    pending: false,
  },
  contractors: {
    data: [],
    pending: false,
  },
  allOrginalSubItemChechLists: {
    data: [],
    pending: false,
  },
  checkListStates: {
    data: [],
    pending: false,
  },
  selectedCheckListInstance: {
    data: undefined,
    pending: false,
  },
  contractorsAddDateQ: {
    data: [],
    pending: false,
  },
  contractorsAddDateSentItem: {
    data: [],
    pending: false,
  },
  contractorAddDateState: {
    pending: false,
  },
  technicalApproveScheduleQ: {
    data: [],
    pending: false,
  },
  technicalApproveScheduleSentItem: {
    data: [],
    pending: false,
  },
  technicalApproveScheduleAddState: {
    pending: false,
  },
  qcDateQ: {
    data: [],
    pending: false,
  },
  qcDateSentItem: {
    data: [],
    pending: false,
  },
  qcDateAddState: {
    pending: false,
  },
  subItemDetails: {
    data: undefined,
    pending: false,
  },
  duplicatedCheckLists: {
    data: [],
    pending: false,
  },
  controlCheckListQ: {
    data: [],
    pending: false,
  },
  controlCheckListSentItem: {
    data: [],
    pending: false,
  },
  controlCheckListAddState: {
    pending: false,
  },
  managerControlCheckListQ: {
    data: [],
    pending: false,
  },
  managerControlCheckListSentItem: {
    data: [],
    pending: false,
  },
  managerControlCheckListAddState: {
    pending: false,
  },
  finalApproveQ: {
    data: [],
    pending: false,
  },
  finalApproveSentItem: {
    data: [],
    pending: false,
  },
  finalApproveAddState: {
    pending: false,
  },
  finalApproveRowAddState: {
    pending: false,
  },
  entryCheckListQ: {
    data: [],
    pending: false,
  },
  entryCheckListSentItem: {
    data: [],
    pending: false,
  },
  entryCheckListAddState: {
    pending: false,
  },
  /////////////////////////
  contractorSetIsDoneQ: {
    data: [],
    pending: false,
  },
  contractorSetIsDoneSentItem: {
    data: [],
    pending: false,
  },
  contractorSetIsDoneAddState: {
    pending: false,
  },
  /////////////////////////
  /////////////////////////
  technicalOfficeAddOrdersQ: {
    data: [],
    pending: false,
  },
  technicalOfficeAddOrdersSentItem: {
    data: [],
    pending: false,
  },
  technicalOfficeAddOrdersAddState: {
    pending: false,
  },
  ///////////////////////////
  checkListsDataAndValues: {
    data: [],
    pending: false,
  },

  controlChecklistStates: {
    data: [],
    pending: false,
  },
  oneValueHistory: { data: [], pending: false },
  subItemsLevel: { data: [], pending: false },
};

export const GetAllOriginalItemsAction = createAsyncThunk(
  'qc/GetAllOriginalItemsAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllOriginalItems(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const DeleteOriginalItemAction = createAsyncThunk(
  'qc/DeleteOriginalItemAction',
  async (
    { ids }: { ids: string[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DeleteOriginalItem(userId, ids);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const DeleteSubItemAction = createAsyncThunk(
  'qc/DeleteSubItemAction',
  async (
    { ids }: { ids: string[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DeleteSubItem(userId, ids);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetOriginalItemsDataAction = createAsyncThunk(
  'qc/GetOriginalItemsDataAction',
  async (
    body: { selectedItemId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { selectedItemId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetOriginalItemsData(userId, selectedItemId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const AddNewOriginalItemAction = createAsyncThunk(
  'qc/AddNewOriginalItemAction',
  async (
    body: { name: string; subItemsIds: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { name, subItemsIds } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewOriginalItem(userId, name, subItemsIds);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const UpdateOriginalItemAction = createAsyncThunk(
  'qc/UpdateOriginalItemAction',
  async (
    body: { id: number; name: string; subItemsIds: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { name, subItemsIds, id } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateOriginalItem(userId, id, name, subItemsIds);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetAllSubItemsAction = createAsyncThunk(
  'qc/GetAllSubItemsAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllSubItems(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const AddNewSubItemAction = createAsyncThunk(
  'qc/AddNewSubItemAction',
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewSubItem(userId, body);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetSubItemsDataAction = createAsyncThunk(
  'qc/GetSubItemsDataAction',
  async (
    body: { selectedItemId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { selectedItemId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetSubItemsData(userId, selectedItemId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const UpdateSubItemAction = createAsyncThunk(
  'qc/UpdateSubItemAction',
  async (
    body: { id: number; data: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateSubItem(userId, body.id, body.data);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const AddNewUsabilityAction = createAsyncThunk(
  'qc/AddNewUsabilityAction',
  async (
    body: { units: number[]; usabilityName: string; code: string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { units, usabilityName, code } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewUsability(
        userId,
        units,
        usabilityName,
        code
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const UpdateUsabilityAction = createAsyncThunk(
  'qc/UpdateUsabilityAction',
  async (
    body: { id: number; units: number[]; usabilityName: string; code: string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { units, usabilityName, code, id } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateUsability(
        userId,
        id,
        units,
        usabilityName,
        code
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetAllUsabilityAction = createAsyncThunk(
  'qc/GetAllUsabilityAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllUsability(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetUsabilityDataAction = createAsyncThunk(
  'qc/GetUsabilityDataAction',
  async (
    body: { selectedItemId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { selectedItemId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetUsabilityData(userId, selectedItemId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetAllCheckListsAction = createAsyncThunk(
  'qc/GetAllCheckListsAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllCheckLists(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetCheckListsDataAction = createAsyncThunk(
  'qc/GetCheckListsDataAction',
  async (
    body: { selectedItemId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { selectedItemId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetCheckListsData(userId, selectedItemId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const AddNewCheckListAction = createAsyncThunk(
  'qc/AddNewCheckListAction',
  async (
    body: { name: string; subItemId: number; items: { itemName: string }[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { name, subItemId, items } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewCheckList(userId, name, subItemId, items);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const UpdateCheckListAction = createAsyncThunk(
  'qc/UpdateCheckListAction',
  async (
    body: {
      name: string;
      subItemId: number;
      items: { itemName: string; id: number; isDeleted: boolean }[];
      id: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { name, subItemId, items, id } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateCheckList(
        userId,
        name,
        subItemId,
        items,
        id
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AllActiveCheckListsAction = createAsyncThunk(
  'qc/AllActiveCheckListsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AllActiveCheckLists(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const CreateCheckListInstancesAction = createAsyncThunk(
  'qc/CreateCheckListInstancesAction',
  async (
    body: {
      contractorUserId: string;
      relatedProject: number;
      relatedFloor: number[];
      relatedUnits: number[];
      relatedUsability: number[];
      relatedOriginalItems: number[];
      relatedSubItems: number[];
      relatedCheckLists: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const {
        contractorUserId,
        relatedProject,
        relatedFloor,
        relatedUnits,
        relatedUsability,
        relatedOriginalItems,
        relatedSubItems,
        relatedCheckLists,
      } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await CreateCheckListInstances(
        userId,
        contractorUserId,
        relatedProject,
        relatedFloor,
        relatedUnits,
        relatedUsability,
        relatedOriginalItems,
        relatedSubItems,
        relatedCheckLists
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const UpdateQcInstanceAction = createAsyncThunk(
  'qc/UpdateQcInstanceAction',
  async (
    body: {
      instanceId: number;
      contractorUserId: string;
      relatedProjects: number;
      relatedFloor: number;
      relatedUnits: number;
      relatedUsability: number;
      relatedOriginalItems: number;
      relatedSubItems: number;
      relatedCheckLists: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const {
        contractorUserId,
        relatedProjects,
        relatedFloor,
        relatedUnits,
        relatedUsability,
        relatedOriginalItems,
        relatedSubItems,
        relatedCheckLists,
        instanceId,
      } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateQcInstance(
        userId,
        instanceId,
        contractorUserId,
        relatedProjects,
        relatedFloor,
        relatedUnits,
        relatedUsability,
        relatedOriginalItems,
        relatedSubItems,
        relatedCheckLists
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetManySubItemsCheckListsAction = createAsyncThunk(
  'qc/GetManySubItemsCheckListsAction',
  async (
    body: { ids: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetManySubItemsCheckLists(userId, body.ids);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetManyOrginalItemSubItemsAction = createAsyncThunk(
  'qc/GetManyOrginalItemSubItemsAction',
  async (
    body: { ids: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetManyOrginalItemSubItems(userId, body.ids);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetAllContractorAction = createAsyncThunk(
  'qc/GetAllContractorAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllContractor(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetAllOrginal_SubItem_ChechListsAction = createAsyncThunk(
  'qc/GetAllOrginal_SubItem_ChechListsAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllOrginal_SubItem_ChechLists(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetCheckListStatesAction = createAsyncThunk(
  'qc/GetCheckListStatesAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetCheckListStates(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetOneInstanceDataAction = createAsyncThunk(
  'qc/GetOneInstanceDataAction',
  async (
    body: { selectedId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetOneInstanceData(userId, body.selectedId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const DeleteQcInstanceAction = createAsyncThunk(
  'qc/DeleteQcInstanceAction',
  async (
    body: { instanceIds: number[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DeleteQcInstance(userId, body.instanceIds);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
export const ContractorAddDateSentItemsAction = createAsyncThunk(
  'qc/ContractorAddDateSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ContractorAddDateSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const ContractorAddDateQAction = createAsyncThunk(
  'qc/ContractorAddDateQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ContractorAddDateQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const ContractorAddDateAction = createAsyncThunk(
  'qc/ContractorAddDateAction',
  async (
    body: {
      instanceId: number;
      fromDate: any;
      toDate: any;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, instanceId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ContractorAddDate(
        userId,
        instanceId,
        fromDate,
        toDate
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
export const TechnicalApproveScheduleQAction = createAsyncThunk(
  'qc/TechnicalApproveScheduleQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await TechnicalApproveScheduleQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const TechnicalApproveScheduleSentItemAction = createAsyncThunk(
  'qc/TechnicalApproveScheduleSentItemAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await TechnicalApproveScheduleSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const technicalApproveScheduleAction = createAsyncThunk(
  'qc/technicalApproveScheduleAction',
  async (
    body: {
      instanceId: number;
      fromDate: any;
      toDate: any;
      isApproved: boolean;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, instanceId, isApproved } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await technicalApproveSchedule(
        userId,
        instanceId,
        fromDate,
        toDate,
        isApproved
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////
export const SetQcDateQAction = createAsyncThunk(
  'qc/SetQcDateQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SetQcDateQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const SetQcDateSentItemsAction = createAsyncThunk(
  'qc/SetQcDateSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SetQcDateSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const SetQcDateAction = createAsyncThunk(
  'qc/SetQcDateAction',
  async (
    body: {
      instanceId: number;
      qcVisitFromDate: any;
      qcVisitToDate: any;
      inspectDate: any;
      isPeriodTime: boolean;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const {
        qcVisitFromDate,
        qcVisitToDate,
        instanceId,
        inspectDate,
        isPeriodTime,
      } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SetQcDate(
        userId,
        instanceId,
        qcVisitFromDate,
        qcVisitToDate,
        inspectDate,
        isPeriodTime
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////
export const InspectControlCheckListQAction = createAsyncThunk(
  'qc/InspectControlCheckListQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await InspectControlCheckListQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const InspectControlCheckListSentItemsAction = createAsyncThunk(
  'qc/InspectControlCheckListSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await InspectControlCheckListSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const InspectControlCheckListAction = createAsyncThunk(
  'qc/InspectControlCheckListAction',
  async (
    body: {
      instanceId: number;
      inspectControlCheckListStateId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, inspectControlCheckListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await InspectControlCheckList(
        userId,
        instanceId,
        inspectControlCheckListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////
export const QcManagerControlCheckListQAction = createAsyncThunk(
  'qc/QcManagerControlCheckListQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcManagerControlCheckListQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const QcManagerControlCheckListSentItemsAction = createAsyncThunk(
  'qc/QcManagerControlCheckListSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcManagerControlCheckListSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const QcManagerControlCheckListAction = createAsyncThunk(
  'qc/QcManagerControlCheckListAction',
  async (
    body: {
      instanceId: number;
      qcManagerControlStateId: number;
      qcManagerDescriptions: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, qcManagerControlStateId, qcManagerDescriptions } =
        body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcManagerControlCheckList(
        userId,
        instanceId,
        qcManagerControlStateId,
        qcManagerDescriptions
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////

export const QcFinalApproveQAction = createAsyncThunk(
  'qc/QcFinalApproveQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcFinalApproveQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const QcFinalApproveSentItemsAction = createAsyncThunk(
  'qc/QcFinalApproveSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcFinalApproveSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const QcFinalApproveAction = createAsyncThunk(
  'qc/QcFinalApproveAction',
  async (
    body: {
      instanceId: number;
      stateId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, stateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcFinalApprove(userId, instanceId, stateId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const QcFinalApproveCheckListRowsAction = createAsyncThunk(
  'qc/QcFinalApproveCheckListRowsAction',
  async (
    body: {
      instanceId: number;
      dataValues: any[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, dataValues } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await QcFinalApproveCheckListRows(
        userId,
        instanceId,
        dataValues
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////

export const InspectorEntryCheckListQAction = createAsyncThunk(
  'qc/InspectorEntryCheckListQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await InspectorEntryCheckListQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const InspectorEntryCheckListSentItemsAction = createAsyncThunk(
  'qc/InspectorEntryCheckListSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await InspectorEntryCheckListSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const InspectorEntryCheckListAction = createAsyncThunk(
  'qc/InspectorEntryCheckListAction',
  async (
    body: {
      instanceId: number;
      itemsValue: any[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, itemsValue } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await InspectorEntryCheckList(
        userId,
        instanceId,
        itemsValue
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

export const ContractorSetIsDoneQAction = createAsyncThunk(
  'qc/ContractorSetIsDoneQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ContractorSetIsDoneQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const ContractorSetIsDoneSentItemsAction = createAsyncThunk(
  'qc/ContractorSetIsDoneSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ContractorSetIsDoneSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const ContractorSetIsDoneAction = createAsyncThunk(
  'qc/ContractorSetIsDoneAction',
  async (
    body: {
      instanceId: number;
      contractorDoneItemsData: any[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, contractorDoneItemsData } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ContractorSetIsDone(
        userId,
        instanceId,
        contractorDoneItemsData
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

export const TechnicalOfficeAddOrdersQAction = createAsyncThunk(
  'qc/TechnicalOfficeAddOrdersQAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await TechnicalOfficeAddOrdersQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const TechnicalOfficeAddOrdersSentItemsAction = createAsyncThunk(
  'qc/TechnicalOfficeAddOrdersSentItemsAction',
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
      checkListStateId?: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, checkListStateId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await TechnicalOfficeAddOrdersSentItems(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        checkListStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const TechnicalOfficeAddOrdersAction = createAsyncThunk(
  'qc/TechnicalOfficeAddOrdersAction',
  async (
    body: { instanceId: number; technicalOfficeOrders: any[] },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId, technicalOfficeOrders } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await TechnicalOfficeAddOrders(
        userId,
        instanceId,
        technicalOfficeOrders
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
////////////////////////////////////////////
export const GetOneSubItemDetailsAction = createAsyncThunk(
  'qc/GetOneSubItemDetailsAction',
  async (
    body: {
      selectedItemId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { selectedItemId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetOneSubItemDetails(userId, selectedItemId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetDuplicatedAction = createAsyncThunk(
  'qc/GetDuplicatedAction',
  async (
    body: { data: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetDuplicated(userId, body.data);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
/////////////////////////////////////////////

export const GetCheckListsDataAndValuesAction = createAsyncThunk(
  'qc/GetCheckListsDataAndValuesAction',
  async (
    body: { instanceId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { instanceId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetCheckListsDataAndValues(userId, instanceId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetOneValueHistoryAction = createAsyncThunk(
  'qc/GetOneValueHistoryAction',
  async (
    body: { valueId: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { valueId } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetOneValueHistory(userId, valueId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetControlCheckListStatesAction = createAsyncThunk(
  'qc/GetControlCheckListStatesAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetControlCheckListStates(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetSubItemLevelsAction = createAsyncThunk(
  'qc/GetSubItemLevelsAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetSubItemLevels(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const QcSlicer = createSlice({
  name: 'qc',
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetAllOriginalItemsAction-----
    builder
      .addCase(GetAllOriginalItemsAction.pending, (state: QcState) => {
        state.originalItems.pending = true;
      })
      .addCase(
        GetAllOriginalItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.originalItems.pending = false;
          state.originalItems.data = payload?.model;
        }
      )
      .addCase(GetAllOriginalItemsAction.rejected, (state: QcState) => {
        state.originalItems.pending = false;
      });
    //#endregion
    //#region DeleteOriginalItemAction-----
    builder
      .addCase(DeleteOriginalItemAction.pending, (state: QcState) => {
        state.originalItemsDeleteState.pending = true;
      })
      .addCase(
        DeleteOriginalItemAction.fulfilled,
        (state: QcState, { payload }) => {
          state.originalItemsDeleteState.pending = false;
        }
      )
      .addCase(DeleteOriginalItemAction.rejected, (state: QcState) => {
        state.originalItemsDeleteState.pending = false;
      });
    //#endregion
    //#region DeleteSubItemAction-----
    builder
      .addCase(DeleteSubItemAction.pending, (state: QcState) => {
        state.subItemsDeleteState.pending = true;
      })
      .addCase(DeleteSubItemAction.fulfilled, (state: QcState, { payload }) => {
        state.subItemsDeleteState.pending = false;
      })
      .addCase(DeleteSubItemAction.rejected, (state: QcState) => {
        state.subItemsDeleteState.pending = false;
      });
    //#endregion
    //#region GetOriginalItemsDataAction-----
    builder
      .addCase(GetOriginalItemsDataAction.pending, (state: QcState) => {
        state.selectedOriginalItem.pending = true;
      })
      .addCase(
        GetOriginalItemsDataAction.fulfilled,
        (state: QcState, { payload }) => {
          state.selectedOriginalItem.pending = false;
          state.selectedOriginalItem.data = payload?.model;
        }
      )
      .addCase(GetOriginalItemsDataAction.rejected, (state: QcState) => {
        state.selectedOriginalItem.pending = false;
      });
    //#endregion
    //#region AddNewOriginalItemAction-----
    builder
      .addCase(AddNewOriginalItemAction.pending, (state: QcState) => {
        state.originalItemsAddState.pending = true;
      })
      .addCase(AddNewOriginalItemAction.fulfilled, (state: QcState) => {
        state.originalItemsAddState.pending = false;
      })
      .addCase(AddNewOriginalItemAction.rejected, (state: QcState) => {
        state.originalItemsAddState.pending = false;
      });
    //#endregion
    //#region UpdateOriginalItemAction-----
    builder
      .addCase(UpdateOriginalItemAction.pending, (state: QcState) => {
        state.originalItemsUpdateState.pending = true;
      })
      .addCase(UpdateOriginalItemAction.fulfilled, (state: QcState) => {
        state.originalItemsUpdateState.pending = false;
      })
      .addCase(UpdateOriginalItemAction.rejected, (state: QcState) => {
        state.originalItemsUpdateState.pending = false;
      });
    //#endregion
    //#region GetAllSubItemsAction-----
    builder
      .addCase(GetAllSubItemsAction.pending, (state: QcState) => {
        state.subItems.pending = true;
      })
      .addCase(
        GetAllSubItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.subItems.pending = false;
          state.subItems.data = payload?.model;
        }
      )
      .addCase(GetAllSubItemsAction.rejected, (state: QcState) => {
        state.subItems.pending = false;
      });
    //#endregion
    //#region GetSubItemsDataAction-----
    builder
      .addCase(GetSubItemsDataAction.pending, (state: QcState) => {
        state.selectedSubItem.pending = true;
      })
      .addCase(
        GetSubItemsDataAction.fulfilled,
        (state: QcState, { payload }) => {
          state.selectedSubItem.pending = false;
          state.selectedSubItem.data = payload?.model;
        }
      )
      .addCase(GetSubItemsDataAction.rejected, (state: QcState) => {
        state.selectedSubItem.pending = false;
      });
    //#endregion
    //#region AddNewSubItemAction-----
    builder
      .addCase(AddNewSubItemAction.pending, (state: QcState) => {
        state.subItemAddState.pending = true;
      })
      .addCase(AddNewSubItemAction.fulfilled, (state: QcState) => {
        state.subItemAddState.pending = false;
      })
      .addCase(AddNewSubItemAction.rejected, (state: QcState) => {
        state.subItemAddState.pending = false;
      });
    //#endregion
    //#region UpdateSubItemAction-----
    builder
      .addCase(UpdateSubItemAction.pending, (state: QcState) => {
        state.subItemsUpdateState.pending = true;
      })
      .addCase(UpdateSubItemAction.fulfilled, (state: QcState) => {
        state.subItemsUpdateState.pending = false;
      })
      .addCase(UpdateSubItemAction.rejected, (state: QcState) => {
        state.subItemsUpdateState.pending = false;
      });
    //#endregion
    //#region GetAllUsabilityAction-----
    builder
      .addCase(GetAllUsabilityAction.pending, (state: QcState) => {
        state.usabilities.pending = true;
      })
      .addCase(
        GetAllUsabilityAction.fulfilled,
        (state: QcState, { payload }) => {
          state.usabilities.pending = false;
          state.usabilities.data = payload?.model;
        }
      )
      .addCase(GetAllUsabilityAction.rejected, (state: QcState) => {
        state.usabilities.pending = false;
      });
    //#endregion
    //#region GetUsabilityDataAction-----
    builder
      .addCase(GetUsabilityDataAction.pending, (state: QcState) => {
        state.selectedUsability.pending = true;
      })
      .addCase(
        GetUsabilityDataAction.fulfilled,
        (state: QcState, { payload }) => {
          state.selectedUsability.pending = false;
          state.selectedUsability.data = payload?.model;
        }
      )
      .addCase(GetUsabilityDataAction.rejected, (state: QcState) => {
        state.selectedUsability.pending = false;
      });
    //#endregion
    //#region AddNewUsabilityAction-----
    builder
      .addCase(AddNewUsabilityAction.pending, (state: QcState) => {
        state.usabilityAddState.pending = true;
      })
      .addCase(AddNewUsabilityAction.fulfilled, (state: QcState) => {
        state.usabilityAddState.pending = false;
      })
      .addCase(AddNewUsabilityAction.rejected, (state: QcState) => {
        state.usabilityAddState.pending = false;
      });
    //#endregion
    //#region UpdateUsabilityAction-----
    builder
      .addCase(UpdateUsabilityAction.pending, (state: QcState) => {
        state.usabilityUpdateState.pending = true;
      })
      .addCase(UpdateUsabilityAction.fulfilled, (state: QcState) => {
        state.usabilityUpdateState.pending = false;
      })
      .addCase(UpdateUsabilityAction.rejected, (state: QcState) => {
        state.usabilityUpdateState.pending = false;
      });
    //#endregion
    //#region GetAllCheckListsAction-----
    builder
      .addCase(GetAllCheckListsAction.pending, (state: QcState) => {
        state.checkLists.pending = true;
      })
      .addCase(
        GetAllCheckListsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.checkLists.pending = false;
          state.checkLists.data = payload?.model;
        }
      )
      .addCase(GetAllCheckListsAction.rejected, (state: QcState) => {
        state.checkLists.pending = false;
      });
    //#endregion
    //#region GetCheckListsDataAction-----
    builder
      .addCase(GetCheckListsDataAction.pending, (state: QcState) => {
        state.selectedCheckList.pending = true;
      })
      .addCase(
        GetCheckListsDataAction.fulfilled,
        (state: QcState, { payload }) => {
          state.selectedCheckList.pending = false;
          state.selectedCheckList.data = payload?.model;
        }
      )
      .addCase(GetCheckListsDataAction.rejected, (state: QcState) => {
        state.selectedCheckList.pending = false;
      });
    //#endregion
    //#region AddNewCheckListAction-----
    builder
      .addCase(AddNewCheckListAction.pending, (state: QcState) => {
        state.checkListAddState.pending = true;
      })
      .addCase(AddNewCheckListAction.fulfilled, (state: QcState) => {
        state.checkListAddState.pending = false;
      })
      .addCase(AddNewCheckListAction.rejected, (state: QcState) => {
        state.checkListAddState.pending = false;
      });
    //#endregion
    //#region UpdateCheckListAction-----
    builder
      .addCase(UpdateCheckListAction.pending, (state: QcState) => {
        state.checkListUpdateState.pending = true;
      })
      .addCase(UpdateCheckListAction.fulfilled, (state: QcState) => {
        state.checkListUpdateState.pending = false;
      })
      .addCase(UpdateCheckListAction.rejected, (state: QcState) => {
        state.checkListUpdateState.pending = false;
      });
    //#endregion
    //#region AllActiveCheckListsAction-----
    builder
      .addCase(AllActiveCheckListsAction.pending, (state: QcState) => {
        state.checkListInstances.pending = true;
      })
      .addCase(
        AllActiveCheckListsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.checkListInstances.pending = false;
          state.checkListInstances.data = payload?.model;
        }
      )
      .addCase(AllActiveCheckListsAction.rejected, (state: QcState) => {
        state.checkListInstances.pending = false;
      });
    //#endregion
    //#region CreateCheckListInstancesAction-----
    builder
      .addCase(CreateCheckListInstancesAction.pending, (state: QcState) => {
        state.checkListInstancAddState.pending = true;
      })
      .addCase(CreateCheckListInstancesAction.fulfilled, (state: QcState) => {
        state.checkListInstancAddState.pending = false;
      })
      .addCase(CreateCheckListInstancesAction.rejected, (state: QcState) => {
        state.checkListInstancAddState.pending = false;
      });
    //#endregion
    //#region UpdateQcInstanceAction-----
    builder
      .addCase(UpdateQcInstanceAction.pending, (state: QcState) => {
        state.checkListInstancUpdateState.pending = true;
      })
      .addCase(UpdateQcInstanceAction.fulfilled, (state: QcState) => {
        state.checkListInstancUpdateState.pending = false;
      })
      .addCase(UpdateQcInstanceAction.rejected, (state: QcState) => {
        state.checkListInstancUpdateState.pending = false;
      });
    //#endregion
    //#region GetManySubItemsCheckListsAction-----
    builder
      .addCase(GetManySubItemsCheckListsAction.pending, (state: QcState) => {
        state.manySubItemsCheckLists.pending = true;
      })
      .addCase(
        GetManySubItemsCheckListsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.manySubItemsCheckLists.pending = false;
          state.manySubItemsCheckLists.data = payload.model;
        }
      )
      .addCase(GetManySubItemsCheckListsAction.rejected, (state: QcState) => {
        state.manySubItemsCheckLists.pending = false;
      });
    //#endregion
    //#region GetManyOrginalItemSubItemsAction-----
    builder
      .addCase(GetManyOrginalItemSubItemsAction.pending, (state: QcState) => {
        state.manyOriginalItemsSubItems.pending = true;
      })
      .addCase(
        GetManyOrginalItemSubItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.manyOriginalItemsSubItems.pending = false;
          state.manyOriginalItemsSubItems.data = payload.model;
        }
      )
      .addCase(GetManyOrginalItemSubItemsAction.rejected, (state: QcState) => {
        state.manyOriginalItemsSubItems.pending = false;
      });
    //#endregion
    //#region GetAllContractorAction-----
    builder
      .addCase(GetAllContractorAction.pending, (state: QcState) => {
        state.contractors.pending = true;
      })
      .addCase(
        GetAllContractorAction.fulfilled,
        (state: QcState, { payload }) => {
          state.contractors.pending = false;
          state.contractors.data = payload.model;
        }
      )
      .addCase(GetAllContractorAction.rejected, (state: QcState) => {
        state.contractors.pending = false;
      });
    //#endregion
    //#region GetAllOrginal_SubItem_ChechListsAction-----
    builder
      .addCase(
        GetAllOrginal_SubItem_ChechListsAction.pending,
        (state: QcState) => {
          state.allOrginalSubItemChechLists.pending = true;
        }
      )
      .addCase(
        GetAllOrginal_SubItem_ChechListsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.allOrginalSubItemChechLists.pending = false;
          state.allOrginalSubItemChechLists.data = payload.model;
        }
      )
      .addCase(
        GetAllOrginal_SubItem_ChechListsAction.rejected,
        (state: QcState) => {
          state.allOrginalSubItemChechLists.pending = false;
        }
      );
    //#endregion
    //#region GetCheckListStatesAction-----
    builder
      .addCase(GetCheckListStatesAction.pending, (state: QcState) => {
        state.checkListStates.pending = true;
      })
      .addCase(
        GetCheckListStatesAction.fulfilled,
        (state: QcState, { payload }) => {
          state.checkListStates.pending = false;
          state.checkListStates.data = payload.model;
        }
      )
      .addCase(GetCheckListStatesAction.rejected, (state: QcState) => {
        state.checkListStates.pending = false;
      });
    //#endregion
    //#region GetOneInstanceDataAction-----
    builder
      .addCase(GetOneInstanceDataAction.pending, (state: QcState) => {
        state.selectedCheckListInstance.pending = true;
      })
      .addCase(
        GetOneInstanceDataAction.fulfilled,
        (state: QcState, { payload }) => {
          state.selectedCheckListInstance.pending = false;
          state.selectedCheckListInstance.data = payload.model;
        }
      )
      .addCase(GetOneInstanceDataAction.rejected, (state: QcState) => {
        state.selectedCheckListInstance.pending = false;
      });
    //#endregion
    //#region DeleteQcInstanceAction-----
    builder
      .addCase(DeleteQcInstanceAction.pending, (state: QcState) => {
        state.checkListInstancRemoveState.pending = true;
      })
      .addCase(
        DeleteQcInstanceAction.fulfilled,
        (state: QcState, { payload }) => {
          state.checkListInstancRemoveState.pending = false;
        }
      )
      .addCase(DeleteQcInstanceAction.rejected, (state: QcState) => {
        state.checkListInstancRemoveState.pending = false;
      });
    //#endregion
    //#region ContractorAddDateQAction-----
    builder
      .addCase(ContractorAddDateQAction.pending, (state: QcState) => {
        state.contractorsAddDateQ.pending = true;
      })
      .addCase(
        ContractorAddDateQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.contractorsAddDateQ.pending = false;
          state.contractorsAddDateQ.data = payload.model;
        }
      )
      .addCase(ContractorAddDateQAction.rejected, (state: QcState) => {
        state.contractorsAddDateQ.pending = false;
      });
    //#endregion
    //#region ContractorAddDateSentItemsAction-----
    builder
      .addCase(ContractorAddDateSentItemsAction.pending, (state: QcState) => {
        state.contractorsAddDateSentItem.pending = true;
      })
      .addCase(
        ContractorAddDateSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.contractorsAddDateSentItem.pending = false;
          state.contractorsAddDateSentItem.data = payload.model;
        }
      )
      .addCase(ContractorAddDateSentItemsAction.rejected, (state: QcState) => {
        state.contractorsAddDateSentItem.pending = false;
      });
    //#endregion
    //#region TechnicalApproveScheduleQAction-----
    builder
      .addCase(TechnicalApproveScheduleQAction.pending, (state: QcState) => {
        state.technicalApproveScheduleQ.pending = true;
      })
      .addCase(
        TechnicalApproveScheduleQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.technicalApproveScheduleQ.pending = false;
          state.technicalApproveScheduleQ.data = payload.model;
        }
      )
      .addCase(TechnicalApproveScheduleQAction.rejected, (state: QcState) => {
        state.technicalApproveScheduleQ.pending = false;
      });
    //#endregion
    //#region TechnicalApproveScheduleSentItemAction-----
    builder
      .addCase(
        TechnicalApproveScheduleSentItemAction.pending,
        (state: QcState) => {
          state.technicalApproveScheduleSentItem.pending = true;
        }
      )
      .addCase(
        TechnicalApproveScheduleSentItemAction.fulfilled,
        (state: QcState, { payload }) => {
          state.technicalApproveScheduleSentItem.pending = false;
          state.technicalApproveScheduleSentItem.data = payload.model;
        }
      )
      .addCase(
        TechnicalApproveScheduleSentItemAction.rejected,
        (state: QcState) => {
          state.technicalApproveScheduleSentItem.pending = false;
        }
      );
    //#endregion
    //#region technicalApproveScheduleAction-----
    builder
      .addCase(technicalApproveScheduleAction.pending, (state: QcState) => {
        state.technicalApproveScheduleAddState.pending = true;
      })
      .addCase(technicalApproveScheduleAction.fulfilled, (state: QcState) => {
        state.technicalApproveScheduleAddState.pending = false;
      })
      .addCase(technicalApproveScheduleAction.rejected, (state: QcState) => {
        state.technicalApproveScheduleAddState.pending = false;
      });
    //#endregion
    //#region GetOneSubItemDetailsAction-----
    builder
      .addCase(GetOneSubItemDetailsAction.pending, (state: QcState) => {
        state.subItemDetails.pending = true;
      })
      .addCase(
        GetOneSubItemDetailsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.subItemDetails.pending = false;
          state.subItemDetails.data = payload.model;
        }
      )
      .addCase(GetOneSubItemDetailsAction.rejected, (state: QcState) => {
        state.subItemDetails.pending = false;
      });
    //#endregion
    //#region GetDuplicatedAction-----
    builder
      .addCase(GetDuplicatedAction.pending, (state: QcState) => {
        state.duplicatedCheckLists.pending = true;
      })
      .addCase(GetDuplicatedAction.fulfilled, (state: QcState, { payload }) => {
        state.duplicatedCheckLists.pending = false;
        state.duplicatedCheckLists.data = payload.model;
      })
      .addCase(GetDuplicatedAction.rejected, (state: QcState) => {
        state.duplicatedCheckLists.pending = false;
      });
    //#endregion
    //#region ContractorAddDateAction-----
    builder
      .addCase(ContractorAddDateAction.pending, (state: QcState) => {
        state.contractorAddDateState.pending = true;
      })
      .addCase(ContractorAddDateAction.fulfilled, (state: QcState) => {
        state.contractorAddDateState.pending = false;
      })
      .addCase(ContractorAddDateAction.rejected, (state: QcState) => {
        state.contractorAddDateState.pending = false;
      });
    //#endregion
    //#region SetQcDateQAction-----
    builder
      .addCase(SetQcDateQAction.pending, (state: QcState) => {
        state.qcDateQ.pending = true;
      })
      .addCase(SetQcDateQAction.fulfilled, (state: QcState, { payload }) => {
        state.qcDateQ.pending = false;
        state.qcDateQ.data = payload.model;
      })
      .addCase(SetQcDateQAction.rejected, (state: QcState) => {
        state.qcDateQ.pending = false;
      });
    //#endregion
    //#region SetQcDateSentItemsAction-----
    builder
      .addCase(SetQcDateSentItemsAction.pending, (state: QcState) => {
        state.qcDateSentItem.pending = true;
      })
      .addCase(
        SetQcDateSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.qcDateSentItem.pending = false;
          state.qcDateSentItem.data = payload.model;
        }
      )
      .addCase(SetQcDateSentItemsAction.rejected, (state: QcState) => {
        state.qcDateSentItem.pending = false;
      });
    //#endregion
    //#region SetQcDateAction-----
    builder
      .addCase(SetQcDateAction.pending, (state: QcState) => {
        state.qcDateAddState.pending = true;
      })
      .addCase(SetQcDateAction.fulfilled, (state: QcState) => {
        state.qcDateAddState.pending = false;
      })
      .addCase(SetQcDateAction.rejected, (state: QcState) => {
        state.qcDateAddState.pending = false;
      });
    //#endregion
    //#region InspectControlCheckListQAction-----
    builder
      .addCase(InspectControlCheckListQAction.pending, (state: QcState) => {
        state.controlCheckListQ.pending = true;
      })
      .addCase(
        InspectControlCheckListQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.controlCheckListQ.pending = false;
          state.controlCheckListQ.data = payload.model;
        }
      )
      .addCase(InspectControlCheckListQAction.rejected, (state: QcState) => {
        state.controlCheckListQ.pending = false;
      });
    //#endregion
    //#region InspectControlCheckListSentItemsAction-----
    builder
      .addCase(
        InspectControlCheckListSentItemsAction.pending,
        (state: QcState) => {
          state.controlCheckListSentItem.pending = true;
        }
      )
      .addCase(
        InspectControlCheckListSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.controlCheckListSentItem.pending = false;
          state.controlCheckListSentItem.data = payload.model;
        }
      )
      .addCase(
        InspectControlCheckListSentItemsAction.rejected,
        (state: QcState) => {
          state.controlCheckListSentItem.pending = false;
        }
      );
    //#endregion
    //#region InspectControlCheckListAction-----
    builder
      .addCase(InspectControlCheckListAction.pending, (state: QcState) => {
        state.controlCheckListAddState.pending = true;
      })
      .addCase(InspectControlCheckListAction.fulfilled, (state: QcState) => {
        state.controlCheckListAddState.pending = false;
      })
      .addCase(InspectControlCheckListAction.rejected, (state: QcState) => {
        state.controlCheckListAddState.pending = false;
      });
    //#endregion
    //#region QcManagerControlCheckListQAction-----
    builder
      .addCase(QcManagerControlCheckListQAction.pending, (state: QcState) => {
        state.managerControlCheckListQ.pending = true;
      })
      .addCase(
        QcManagerControlCheckListQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.managerControlCheckListQ.pending = false;
          state.managerControlCheckListQ.data = payload.model;
        }
      )
      .addCase(QcManagerControlCheckListQAction.rejected, (state: QcState) => {
        state.managerControlCheckListQ.pending = false;
      });
    //#endregion
    //#region QcManagerControlCheckListSentItemsAction-----
    builder
      .addCase(
        QcManagerControlCheckListSentItemsAction.pending,
        (state: QcState) => {
          state.managerControlCheckListSentItem.pending = true;
        }
      )
      .addCase(
        QcManagerControlCheckListSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.managerControlCheckListSentItem.pending = false;
          state.managerControlCheckListSentItem.data = payload.model;
        }
      )
      .addCase(
        QcManagerControlCheckListSentItemsAction.rejected,
        (state: QcState) => {
          state.managerControlCheckListSentItem.pending = false;
        }
      );
    //#endregion
    //#region QcManagerControlCheckListAction-----
    builder
      .addCase(QcManagerControlCheckListAction.pending, (state: QcState) => {
        state.managerControlCheckListAddState.pending = true;
      })
      .addCase(QcManagerControlCheckListAction.fulfilled, (state: QcState) => {
        state.managerControlCheckListAddState.pending = false;
      })
      .addCase(QcManagerControlCheckListAction.rejected, (state: QcState) => {
        state.managerControlCheckListAddState.pending = false;
      });
    //#endregion
    //#region QcFinalApproveQAction-----
    builder
      .addCase(QcFinalApproveQAction.pending, (state: QcState) => {
        state.finalApproveQ.pending = true;
      })
      .addCase(
        QcFinalApproveQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.finalApproveQ.pending = false;
          state.finalApproveQ.data = payload.model;
        }
      )
      .addCase(QcFinalApproveQAction.rejected, (state: QcState) => {
        state.finalApproveQ.pending = false;
      });
    //#endregion
    //#region QcFinalApproveSentItemsAction-----
    builder
      .addCase(QcFinalApproveSentItemsAction.pending, (state: QcState) => {
        state.finalApproveSentItem.pending = true;
      })
      .addCase(
        QcFinalApproveSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.finalApproveSentItem.pending = false;
          state.finalApproveSentItem.data = payload.model;
        }
      )
      .addCase(QcFinalApproveSentItemsAction.rejected, (state: QcState) => {
        state.finalApproveSentItem.pending = false;
      });
    //#endregion
    //#region QcFinalApproveAction-----
    builder
      .addCase(QcFinalApproveAction.pending, (state: QcState) => {
        state.finalApproveAddState.pending = true;
      })
      .addCase(QcFinalApproveAction.fulfilled, (state: QcState) => {
        state.finalApproveAddState.pending = false;
      })
      .addCase(QcFinalApproveAction.rejected, (state: QcState) => {
        state.finalApproveAddState.pending = false;
      });
    //#endregion
    //#region QcFinalApproveCheckListRowsAction-----
    builder
      .addCase(QcFinalApproveCheckListRowsAction.pending, (state: QcState) => {
        state.finalApproveRowAddState.pending = true;
      })
      .addCase(
        QcFinalApproveCheckListRowsAction.fulfilled,
        (state: QcState) => {
          state.finalApproveRowAddState.pending = false;
        }
      )
      .addCase(QcFinalApproveCheckListRowsAction.rejected, (state: QcState) => {
        state.finalApproveRowAddState.pending = false;
      });
    //#endregion
    //#region InspectorEntryCheckListQAction-----
    builder
      .addCase(InspectorEntryCheckListQAction.pending, (state: QcState) => {
        state.entryCheckListQ.pending = true;
      })
      .addCase(
        InspectorEntryCheckListQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.entryCheckListQ.pending = false;
          state.entryCheckListQ.data = payload.model;
        }
      )
      .addCase(InspectorEntryCheckListQAction.rejected, (state: QcState) => {
        state.entryCheckListQ.pending = false;
      });
    //#endregion
    //#region InspectorEntryCheckListSentItemsAction-----
    builder
      .addCase(
        InspectorEntryCheckListSentItemsAction.pending,
        (state: QcState) => {
          state.entryCheckListSentItem.pending = true;
        }
      )
      .addCase(
        InspectorEntryCheckListSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.entryCheckListSentItem.pending = false;
          state.entryCheckListSentItem.data = payload.model;
        }
      )
      .addCase(
        InspectorEntryCheckListSentItemsAction.rejected,
        (state: QcState) => {
          state.entryCheckListSentItem.pending = false;
        }
      );
    //#endregion
    //#region InspectorEntryCheckListAction-----
    builder
      .addCase(InspectorEntryCheckListAction.pending, (state: QcState) => {
        state.entryCheckListAddState.pending = true;
      })
      .addCase(InspectorEntryCheckListAction.fulfilled, (state: QcState) => {
        state.entryCheckListAddState.pending = false;
      })
      .addCase(InspectorEntryCheckListAction.rejected, (state: QcState) => {
        state.entryCheckListAddState.pending = false;
      });
    //#endregion
    //#region ContractorSetIsDoneQAction-----
    builder
      .addCase(ContractorSetIsDoneQAction.pending, (state: QcState) => {
        state.contractorSetIsDoneQ.pending = true;
      })
      .addCase(
        ContractorSetIsDoneQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.contractorSetIsDoneQ.pending = false;
          state.contractorSetIsDoneQ.data = payload.model;
        }
      )
      .addCase(ContractorSetIsDoneQAction.rejected, (state: QcState) => {
        state.contractorSetIsDoneQ.pending = false;
      });
    //#endregion
    //#region ContractorSetIsDoneSentItemsAction-----
    builder
      .addCase(ContractorSetIsDoneSentItemsAction.pending, (state: QcState) => {
        state.contractorSetIsDoneSentItem.pending = true;
      })
      .addCase(
        ContractorSetIsDoneSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.contractorSetIsDoneSentItem.pending = false;
          state.contractorSetIsDoneSentItem.data = payload.model;
        }
      )
      .addCase(
        ContractorSetIsDoneSentItemsAction.rejected,
        (state: QcState) => {
          state.contractorSetIsDoneSentItem.pending = false;
        }
      );
    //#endregion
    //#region ContractorSetIsDoneAction-----
    builder
      .addCase(ContractorSetIsDoneAction.pending, (state: QcState) => {
        state.contractorSetIsDoneAddState.pending = true;
      })
      .addCase(ContractorSetIsDoneAction.fulfilled, (state: QcState) => {
        state.contractorSetIsDoneAddState.pending = false;
      })
      .addCase(ContractorSetIsDoneAction.rejected, (state: QcState) => {
        state.contractorSetIsDoneAddState.pending = false;
      });
    //#endregion
    //#region TechnicalOfficeAddOrdersQAction-----
    builder
      .addCase(TechnicalOfficeAddOrdersQAction.pending, (state: QcState) => {
        state.technicalOfficeAddOrdersQ.pending = true;
      })
      .addCase(
        TechnicalOfficeAddOrdersQAction.fulfilled,
        (state: QcState, { payload }) => {
          state.technicalOfficeAddOrdersQ.pending = false;
          state.technicalOfficeAddOrdersQ.data = payload.model;
        }
      )
      .addCase(TechnicalOfficeAddOrdersQAction.rejected, (state: QcState) => {
        state.technicalOfficeAddOrdersQ.pending = false;
      });
    //#endregion
    //#region TechnicalOfficeAddOrdersSentItemsAction-----
    builder
      .addCase(
        TechnicalOfficeAddOrdersSentItemsAction.pending,
        (state: QcState) => {
          state.technicalOfficeAddOrdersSentItem.pending = true;
        }
      )
      .addCase(
        TechnicalOfficeAddOrdersSentItemsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.technicalOfficeAddOrdersSentItem.pending = false;
          state.technicalOfficeAddOrdersSentItem.data = payload.model;
        }
      )
      .addCase(
        TechnicalOfficeAddOrdersSentItemsAction.rejected,
        (state: QcState) => {
          state.technicalOfficeAddOrdersSentItem.pending = false;
        }
      );
    //#endregion

    //#region GetCheckListsDataAndValuesAction-----
    builder
      .addCase(GetCheckListsDataAndValuesAction.pending, (state: QcState) => {
        state.checkListsDataAndValues.pending = true;
      })
      .addCase(
        GetCheckListsDataAndValuesAction.fulfilled,
        (state: QcState, { payload }) => {
          state.checkListsDataAndValues.pending = false;
          state.checkListsDataAndValues.data = payload.model;
        }
      )
      .addCase(GetCheckListsDataAndValuesAction.rejected, (state: QcState) => {
        state.checkListsDataAndValues.pending = false;
      });
    //#endregion
    //#region TechnicalOfficeAddOrdersAction-----
    builder
      .addCase(TechnicalOfficeAddOrdersAction.pending, (state: QcState) => {
        state.technicalOfficeAddOrdersAddState.pending = true;
      })
      .addCase(
        TechnicalOfficeAddOrdersAction.fulfilled,
        (state: QcState, { payload }) => {
          state.technicalOfficeAddOrdersAddState.pending = false;
        }
      )
      .addCase(TechnicalOfficeAddOrdersAction.rejected, (state: QcState) => {
        state.technicalOfficeAddOrdersAddState.pending = false;
      });
    //#endregion
    //#region GetControlCheckListStatesAction-----
    builder
      .addCase(GetControlCheckListStatesAction.pending, (state: QcState) => {
        state.controlChecklistStates.pending = true;
      })
      .addCase(
        GetControlCheckListStatesAction.fulfilled,
        (state: QcState, { payload }) => {
          state.controlChecklistStates.pending = false;
          state.controlChecklistStates.data = payload.model;
        }
      )
      .addCase(GetControlCheckListStatesAction.rejected, (state: QcState) => {
        state.controlChecklistStates.pending = false;
      });
    //#endregion
    //#region GetOneValueHistoryAction-----
    builder
      .addCase(GetOneValueHistoryAction.pending, (state: QcState) => {
        state.oneValueHistory.pending = true;
      })
      .addCase(
        GetOneValueHistoryAction.fulfilled,
        (state: QcState, { payload }) => {
          state.oneValueHistory.pending = false;
          state.oneValueHistory.data = payload.model;
        }
      )
      .addCase(GetOneValueHistoryAction.rejected, (state: QcState) => {
        state.oneValueHistory.pending = false;
      });
    //#endregion
    //#region GetSubItemLevels-----
    builder
      .addCase(GetSubItemLevelsAction.pending, (state: QcState) => {
        state.subItemsLevel.pending = true;
      })
      .addCase(
        GetSubItemLevelsAction.fulfilled,
        (state: QcState, { payload }) => {
          state.subItemsLevel.pending = false;
          state.subItemsLevel.data = payload.model;
        }
      )
      .addCase(GetSubItemLevelsAction.rejected, (state: QcState) => {
        state.subItemsLevel.pending = false;
      });
    //#endregion
  },
});

// Action creators are generated for each case reducer function
export default QcSlicer.reducer;
