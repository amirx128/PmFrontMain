import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  SaveGridColumn,
  GetGridColumn,
} from "../../core/account/account.service.ts";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
};

export interface AccountState {
  saveGrid: {
    pending: boolean;
  };
  getGrid: {
    data: any;
    pending: boolean;
  };
}

const initialState: AccountState = {
  saveGrid: {
    pending: false,
  },
  getGrid: {
    data: undefined,
    pending: false,
  },
};

export const SaveGridColumnAction = createAsyncThunk(
  "account/SaveGridColumnAction",
  async (
    body: { gridName: string; gridConfigs: string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { gridName, gridConfigs } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SaveGridColumn(userId, gridName, gridConfigs);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetGridColumnAction = createAsyncThunk(
  "account/GetGridColumnAction",
  async (
    body: { gridName: string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { gridName } = body;
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetGridColumn(userId, gridName);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AccountSlicer = createSlice({
  name: "account",
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region SaveGridColumnAction-----
    builder
      .addCase(SaveGridColumnAction.pending, (state: AccountState) => {
        state.saveGrid.pending = true;
      })
      .addCase(SaveGridColumnAction.fulfilled, (state: AccountState) => {
        state.saveGrid.pending = false;
      })
      .addCase(SaveGridColumnAction.rejected, (state: AccountState) => {
        state.saveGrid.pending = false;
      });
    //#endregion
    //#region GetGridColumnAction-----
    builder
      .addCase(GetGridColumnAction.pending, (state: AccountState) => {
        state.getGrid.pending = true;
      })
      .addCase(
        GetGridColumnAction.fulfilled,
        (state: AccountState, { payload }) => {
          state.getGrid.pending = false;
          state.getGrid.data = { ...payload?.model };
        }
      )
      .addCase(GetGridColumnAction.rejected, (state: AccountState) => {
        state.getGrid.pending = false;
      });
    //#endregion
  },
});

// Action creators are generated for each case reducer function
export default AccountSlicer.reducer;
