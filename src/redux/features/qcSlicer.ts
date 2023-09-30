import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
} from "../../core/QC/qc.service";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
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
};

export const GetAllOriginalItemsAction = createAsyncThunk(
  "qc/GetAllOriginalItemsAction",
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
export const GetOriginalItemsDataAction = createAsyncThunk(
  "qc/GetOriginalItemsDataAction",
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
  "qc/AddNewOriginalItemAction",
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
  "qc/UpdateOriginalItemAction",
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
  "qc/GetAllSubItemsAction",
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
  "qc/AddNewSubItemAction",
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
  "qc/GetSubItemsDataAction",
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
  "qc/UpdateSubItemAction",
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
  "qc/AddNewUsabilityAction",
  async (
    body: { unitId: number; usabilityName: string; code: string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { unitId, usabilityName, code } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddNewUsability(
        userId,
        unitId,
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
  "qc/GetAllUsabilityAction",
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
export const QcSlicer = createSlice({
  name: "qc",
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
  },
});

// Action creators are generated for each case reducer function
export default QcSlicer.reducer;
