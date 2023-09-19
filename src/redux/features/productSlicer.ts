import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetRequesterUserQ,
  RequesterUserSentItem,
  DownloadRequesterUserQ,
  DownloadRequesterUserSentItem,
} from "../../core/product/Product.service";
import downloadExcel from "../../utils/downloadExcell";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
};

export interface ProductState {
  requesterUser: {
    requesterUserQ: {
      data: any;
      pending: boolean;
    };
    requestUserSentItem: {
      data: any;
      pending: boolean;
    };
    downloadRequesterUserQ: {
      pending: boolean;
    };
  };
}

const initialState: ProductState = {
  requesterUser: {
    requesterUserQ: {
      data: [],
      pending: false,
    },
    requestUserSentItem: {
      data: [],
      pending: false,
    },
    downloadRequesterUserQ: {
      pending: false,
    },
  },
};

export const GetRequesterUserQAction = createAsyncThunk(
  "product/GetRequesterUserQAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    const { fromDate, toDate, orderType, orderBy } = body;
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetRequesterUserQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const DownloadRequesterUserQAction = createAsyncThunk(
  "product/DownloadRequesterUserQAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    const { fromDate, toDate, orderType, orderBy } = body;
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadRequesterUserQ(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const DownloadRequesterUserSentItemAction = createAsyncThunk(
  "product/DownloadRequesterUserSentItemAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    const { fromDate, toDate, orderType, orderBy } = body;
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadRequesterUserSentItem(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const RequesterUserSentItemAction = createAsyncThunk(
  "product/RequesterUserSentItemAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    const { fromDate, toDate, orderType, orderBy } = body;
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await RequesterUserSentItem(
        userId,
        1,
        fromDate,
        toDate,
        orderType,
        orderBy
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const productSlicer = createSlice({
  name: "product",
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetRequesterUserQAction-----
    builder
      .addCase(GetRequesterUserQAction.pending, (state: ProductState) => {
        state.requesterUser.requesterUserQ.pending = true;
      })
      .addCase(
        GetRequesterUserQAction.fulfilled,
        (state: ProductState, { payload }) => {
          state.requesterUser.requesterUserQ.pending = false;
          state.requesterUser.requesterUserQ.data = [...payload?.model];
        }
      )
      .addCase(
        GetRequesterUserQAction.rejected,
        (state: ProductState, { error }) => {
          state.requesterUser.requesterUserQ.pending = false;
        }
      );
    //#endregion
    //#region DownloadRequesterUserQAction-----
    builder
      .addCase(DownloadRequesterUserQAction.pending, (state: ProductState) => {
        state.requesterUser.downloadRequesterUserQ.pending = true;
      })
      .addCase(
        DownloadRequesterUserQAction.fulfilled,
        (state: ProductState, { payload }) => {
          state.requesterUser.downloadRequesterUserQ.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadRequesterUserQAction.rejected,
        (state: ProductState, { error }) => {
          state.requesterUser.downloadRequesterUserQ.pending = false;
        }
      );
    //#endregion
    //#region DownloadRequesterUserSentItemAction-----
    builder
      .addCase(
        DownloadRequesterUserSentItemAction.pending,
        (state: ProductState) => {
          state.requesterUser.downloadRequesterUserQ.pending = true;
        }
      )
      .addCase(
        DownloadRequesterUserSentItemAction.fulfilled,
        (state: ProductState, { payload }) => {
          state.requesterUser.downloadRequesterUserQ.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadRequesterUserSentItemAction.rejected,
        (state: ProductState, { error }) => {
          state.requesterUser.downloadRequesterUserQ.pending = false;
        }
      );
    //#endregion
    //#region RequesterUserSentItemAction-----
    builder
      .addCase(RequesterUserSentItemAction.pending, (state: ProductState) => {
        state.requesterUser.requestUserSentItem.pending = true;
      })
      .addCase(
        RequesterUserSentItemAction.fulfilled,
        (state: ProductState, { payload }) => {
          state.requesterUser.requestUserSentItem.pending = false;
          state.requesterUser.requestUserSentItem.data = [...payload?.model];
        }
      )
      .addCase(
        RequesterUserSentItemAction.rejected,
        (state: ProductState, { error }) => {
          state.requesterUser.requestUserSentItem.pending = false;
        }
      );
    //#endregion
  },
});

export default productSlicer.reducer;
