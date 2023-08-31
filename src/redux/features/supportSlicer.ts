import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetApproveQ,
  GetApproveStates,
  GetFinalApproveQ,
} from "../../core/support/Support.service";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
};

export interface supportState {
  approve: {
    approveQ: {
      data: any;
      pending: boolean;
    };
    states: {
      data: any;
      pending: boolean;
    };
    finalApproveQ: {
      data: any;
      pending: boolean;
    };
  };
}

const initialState: supportState = {
  approve: {
    approveQ: {
      data: [],
      pending: false,
    },
    states: {
      data: [],
      pending: false,
    },
    finalApproveQ: {
      data: [],
      pending: false,
    },
  },
};

export const GetApproveQAction = createAsyncThunk(
  "support/GetApproveQAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
      approveStateId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    const { fromDate, toDate, orderType, orderBy, approveStateId } = body;
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetApproveQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        approveStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetFinalApproveQAction = createAsyncThunk(
  "support/GetFinalApproveQAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
      approveStateId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    const { fromDate, toDate, orderType, orderBy, approveStateId } = body;
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetFinalApproveQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy,
        approveStateId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetApproveStatesAction = createAsyncThunk(
  "support/GetApproveStatesAction",
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetApproveStates(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const supportSlicer = createSlice({
  name: "support",
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetApproveQAction-----
    builder
      .addCase(GetApproveQAction.pending, (state: supportState) => {
        state.approve.approveQ.pending = true;
      })
      .addCase(
        GetApproveQAction.fulfilled,
        (state: supportState, { payload }) => {
          state.approve.approveQ.pending = false;
          state.approve.approveQ.data = [...payload?.model];
        }
      )
      .addCase(GetApproveQAction.rejected, (state: supportState, { error }) => {
        state.approve.approveQ.pending = false;
      });
    //#endregion
    //#region GetApproveSatesQAction-----
    builder
      .addCase(GetApproveStatesAction.pending, (state: supportState) => {
        state.approve.states.pending = true;
      })
      .addCase(
        GetApproveStatesAction.fulfilled,
        (state: supportState, { payload }) => {
          state.approve.states.pending = false;
          state.approve.states.data = [...payload?.model];
        }
      )
      .addCase(
        GetApproveStatesAction.rejected,
        (state: supportState, { error }) => {
          state.approve.states.pending = false;
        }
      );
    //#endregion
    //#region GetApproveQAction-----
    builder
      .addCase(GetFinalApproveQAction.pending, (state: supportState) => {
        state.approve.finalApproveQ.pending = true;
      })
      .addCase(
        GetFinalApproveQAction.fulfilled,
        (state: supportState, { payload }) => {
          state.approve.finalApproveQ.pending = false;
          state.approve.finalApproveQ.data = [...payload?.model];
        }
      )
      .addCase(
        GetFinalApproveQAction.rejected,
        (state: supportState, { error }) => {
          state.approve.finalApproveQ.pending = false;
        }
      );
    //#endregion
  },
});

export default supportSlicer.reducer;
