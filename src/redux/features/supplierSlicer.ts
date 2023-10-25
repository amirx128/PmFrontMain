import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetSupplierQ,
  SupplierSentItem,
  GetTransactions,
  DownloadSupplierQ,
  DownloadSupplierSentItem,
  GetCount,
  GetAllCommodityTransactions,
} from "../../core/supplier/Supplier.service";
import downloadExcel from "../../utils/downloadExcell";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
};

export interface SupplierState {
  supplier: {
    supplierQ: {
      data: any;
      pending: boolean;
    };
    supplierSentItem: {
      data: any;
      pending: boolean;
    };
    transaction: {
      data: any;
      pending: boolean;
    };
    allTransaction: {
      data: any;
      pending: boolean;
    };
    Counter: {
      data: any;
      pending: boolean;
    };
    downloadQueue: {
      pending: boolean;
    };
    downloadSentItem: {
      pending: boolean;
    };
  };
}

const initialState: SupplierState = {
  supplier: {
    supplierQ: {
      data: [],
      pending: false,
    },
    supplierSentItem: {
      data: [],
      pending: false,
    },
    transaction: {
      data: [],
      pending: false,
    },
    allTransaction: {
      data: [],
      pending: false,
    },
    Counter: {
      data: [],
      pending: false,
    },
    downloadQueue: {
      pending: false,
    },
    downloadSentItem: {
      pending: false,
    },
  },
};

export const GetOneCommodityTransactions = createAsyncThunk(
  "supplier/GetOneCommodityTransactions",
  async (
    body: {
      SelectedItemId: any;
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, SelectedItemId } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetTransactions(
        SelectedItemId,
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
export const GetAllCommodityTransactionsAction = createAsyncThunk(
  "supplier/GetAllCommodityTransactionsAction",
  async (
    body: {
      SelectedItemId: any;
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy, SelectedItemId } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllCommodityTransactions(
        SelectedItemId,
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

export const GetCountCommodityInWarehouse = createAsyncThunk(
  "Warehouse/GetCountCommodityInWarehouse",
  async (
    body: {
      commodityId: any;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { commodityId } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetCount(commodityId, userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetSupplierQAction = createAsyncThunk(
  "supplier/GetSupplierQAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetSupplierQ(
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
export const DownloadSupplierQAction = createAsyncThunk(
  "supplier/DownloadSupplierQAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadSupplierQ(
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

export const SuppLierSentItemAction = createAsyncThunk(
  "supplier/SupplierSentItem",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SupplierSentItem(
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
export const DownloadSuppLierSentItemAction = createAsyncThunk(
  "supplier/DownloadSuppLierSentItemAction",
  async (
    body: {
      fromDate?: any;
      toDate?: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadSupplierSentItem(
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

export const supplierSlicer = createSlice({
  name: "supplier",
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetSupplierQAction-----
    builder
      .addCase(GetSupplierQAction.pending, (state: SupplierState) => {
        state.supplier.supplierQ.pending = true;
      })
      .addCase(
        GetSupplierQAction.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.supplierQ.pending = false;
          state.supplier.supplierQ.data = [...payload?.model];
        }
      )
      .addCase(
        GetSupplierQAction.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.supplierQ.pending = false;
        }
      );
    //#endregion
    //#region SupplierSentItemAction-----
    builder
      .addCase(SuppLierSentItemAction.pending, (state: SupplierState) => {
        state.supplier.supplierSentItem.pending = true;
      })
      .addCase(
        SuppLierSentItemAction.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.supplierSentItem.pending = false;
          state.supplier.supplierSentItem.data = [...payload?.model];
        }
      )
      .addCase(
        SuppLierSentItemAction.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.supplierSentItem.pending = false;
        }
      );
    //#endregion
    //#region GetOneCommodityTransactions-----
    builder
      .addCase(GetOneCommodityTransactions.pending, (state: SupplierState) => {
        state.supplier.transaction.pending = true;
      })
      .addCase(
        GetOneCommodityTransactions.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.transaction.pending = false;
          state.supplier.transaction.data = [...payload?.model];
        }
      )
      .addCase(
        GetOneCommodityTransactions.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.transaction.pending = false;
        }
      );
    //#endregion
    //#region GetAllCommodityTransactionsAction-----
    builder
      .addCase(
        GetAllCommodityTransactionsAction.pending,
        (state: SupplierState) => {
          state.supplier.allTransaction.pending = true;
        }
      )
      .addCase(
        GetAllCommodityTransactionsAction.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.allTransaction.pending = false;
          state.supplier.allTransaction.data = payload?.model;
        }
      )
      .addCase(
        GetAllCommodityTransactionsAction.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.allTransaction.pending = false;
        }
      );
    //#endregion
    //#region GetCountCommodityInWarehouse-----
    builder
      .addCase(GetCountCommodityInWarehouse.pending, (state: SupplierState) => {
        state.supplier.Counter.pending = true;
      })
      .addCase(
        GetCountCommodityInWarehouse.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.Counter.pending = false;
          state.supplier.Counter.data = payload.model;
        }
      )
      .addCase(
        GetCountCommodityInWarehouse.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.Counter.pending = false;
        }
      );
    //#endregion
    //#region DownloadSupplierQAction-----
    builder
      .addCase(DownloadSupplierQAction.pending, (state: SupplierState) => {
        state.supplier.downloadQueue.pending = true;
      })
      .addCase(
        DownloadSupplierQAction.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.downloadQueue.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadSupplierQAction.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.downloadQueue.pending = false;
        }
      );
    //#endregion
    //#region DownloadSuppLierSentItemAction-----
    builder
      .addCase(
        DownloadSuppLierSentItemAction.pending,
        (state: SupplierState) => {
          state.supplier.downloadSentItem.pending = true;
        }
      )
      .addCase(
        DownloadSuppLierSentItemAction.fulfilled,
        (state: SupplierState, { payload }) => {
          state.supplier.downloadSentItem.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadSuppLierSentItemAction.rejected,
        (state: SupplierState, { error }) => {
          state.supplier.downloadSentItem.pending = false;
        }
      );
    //#endregion
  },
});

export default supplierSlicer.reducer;
