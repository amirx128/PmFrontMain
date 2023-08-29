import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetWarehouseQ,
  WarehouseSentItem,
  GetExitWareHouseQ,
  ExitWarehouseSentItem,
} from "../../core/warehouse/WareHouse.service";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
};

export interface WarehouseState {
  warehouse: {
    warehouseQ: {
      data: any;
      pending: boolean;
    };
    warehouseSentItem: {
      data: any;
      pending: boolean;
    };
  };
  exitWarehouse: {
    exitWarehouseQ: {
      data: any;
      pending: boolean;
    };
    exitWarehouseSentItem: {
      data: any;
      pending: boolean;
    };
  };
}

const initialState: WarehouseState = {
  warehouse: {
    warehouseQ: {
      data: [],
      pending: false,
    },
    warehouseSentItem: {
      data: [],
      pending: false,
    },
  },
  exitWarehouse: {
    exitWarehouseQ: {
      data: [],
      pending: false,
    },
    exitWarehouseSentItem: {
      data: [],
      pending: false,
    },
  },
};

export const GetWarehouseQAction = createAsyncThunk(
  "warehouse/GetWarehouseQAction",
  async (
    body: { fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetWarehouseQ(
        userId,
        1,
        body.fromDate,
        body.toDate
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const GetExitWarehouseQAction = createAsyncThunk(
  "warehouse/GetExitWarehouseQAction",
  async (
    body: { fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetExitWareHouseQ(
        userId,
        1,
        body.fromDate,
        body.toDate
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const WarehouseSentItemAction = createAsyncThunk(
  "warehosue/WarehouseSentItemAction",
  async (
    body: { fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await WarehouseSentItem(
        userId,
        1,
        body.fromDate,
        body.toDate
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const ExitWarehouseSentItemAction = createAsyncThunk(
  "warehosue/ExitWarehouseSentItemAction",
  async (
    body: { fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ExitWarehouseSentItem(
        userId,
        1,
        body.fromDate,
        body.toDate
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const warehouseSlicer = createSlice({
  name: "warehouse",
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetWarehouseQAction-----
    builder
      .addCase(GetWarehouseQAction.pending, (state: WarehouseState) => {
        state.warehouse.warehouseQ.pending = true;
      })
      .addCase(
        GetWarehouseQAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.warehouse.warehouseQ.pending = false;
          state.warehouse.warehouseQ.data = [...payload?.model];
        }
      )
      .addCase(
        GetWarehouseQAction.rejected,
        (state: WarehouseState, { error }) => {
          state.warehouse.warehouseQ.pending = false;
        }
      );
    //#endregion
    //#region WarehouseSentItemAction-----
    builder
      .addCase(WarehouseSentItemAction.pending, (state: WarehouseState) => {
        state.warehouse.warehouseSentItem.pending = true;
      })
      .addCase(
        WarehouseSentItemAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.warehouse.warehouseSentItem.pending = false;
          state.warehouse.warehouseSentItem.data = [...payload?.model];
        }
      )
      .addCase(
        WarehouseSentItemAction.rejected,
        (state: WarehouseState, { error }) => {
          state.warehouse.warehouseSentItem.pending = false;
        }
      );
    //#endregion
    //#region GetExitWarehouseQAction-----
    builder
      .addCase(GetExitWarehouseQAction.pending, (state: WarehouseState) => {
        state.exitWarehouse.exitWarehouseQ.pending = true;
      })
      .addCase(
        GetExitWarehouseQAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitWarehouse.exitWarehouseQ.pending = false;
          state.exitWarehouse.exitWarehouseQ.data = [...payload?.model];
        }
      )
      .addCase(
        GetExitWarehouseQAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitWarehouse.exitWarehouseQ.pending = false;
        }
      );
    //#endregion
    //#region GetExitWarehouseSentItemAction-----
    builder
      .addCase(ExitWarehouseSentItemAction.pending, (state: WarehouseState) => {
        state.exitWarehouse.exitWarehouseSentItem.pending = true;
      })
      .addCase(
        ExitWarehouseSentItemAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitWarehouse.exitWarehouseSentItem.pending = false;
          state.exitWarehouse.exitWarehouseSentItem.data = [...payload?.model];
        }
      )
      .addCase(
        ExitWarehouseSentItemAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitWarehouse.exitWarehouseSentItem.pending = false;
        }
      );
    //#endregion
  },
});

export default warehouseSlicer.reducer;
