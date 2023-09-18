import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetWarehouseQ,
  WarehouseSentItem,
  GetExitWareHouseQ,
  ExitWarehouseSentItem,
  GetWarehouseOrderData,
  SupplierAddDetailsToWarehouseOrder,
  SupplierUpdateDetailsToWarehouseOrder,
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
  warehouseRowSelected: any;
  orderDetailData: {
    data: any;
    pending: boolean;
  };
  supplier: {
    addSupplierToWarehouse: {
      pending: boolean;
      data: any;
    };
    updateSupplierToWarehouse: {
      pending: boolean;
      data: any;
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
  warehouseRowSelected: undefined,
  orderDetailData: {
    pending: false,
    data: undefined,
  },
  supplier: {
    addSupplierToWarehouse: {
      pending: false,
      data: [],
    },
    updateSupplierToWarehouse: {
      pending: false,
      data: [],
    },
  },
};

export const GetWarehouseOrderDataAction = createAsyncThunk(
  "warehouse/GetWarehouseOrderDataAction",
  async (
    body: { id: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetWarehouseOrderData(userId, body.id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetWarehouseQAction = createAsyncThunk(
  "warehouse/GetWarehouseQAction",
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
      const { data } = await GetWarehouseQ(
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
export const GetExitWarehouseQAction = createAsyncThunk(
  "warehouse/GetExitWarehouseQAction",
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
      const { data } = await GetExitWareHouseQ(
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

export const WarehouseSentItemAction = createAsyncThunk(
  "warehosue/WarehouseSentItemAction",
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
      const { data } = await WarehouseSentItem(
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
export const ExitWarehouseSentItemAction = createAsyncThunk(
  "warehosue/ExitWarehouseSentItemAction",
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
      const { data } = await ExitWarehouseSentItem(
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
export const SupplierAddDetailsToWarehouseOrderAction = createAsyncThunk(
  "warehosue/SupplierAddDetailsToWarehouseOrderAction",
  async (
    body: {
      warehouseOrderId: number;
      sentCount: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { warehouseOrderId, sentCount } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SupplierAddDetailsToWarehouseOrder(
        userId,
        warehouseOrderId,
        sentCount
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const SupplierUpdateDetailsToWarehouseOrderAction = createAsyncThunk(
  "warehosue/SupplierUpdateDetailsToWarehouseOrderAction",
  async (
    body: {
      warehouseOrderId: number;
      sentCount: number;
      commodityId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { warehouseOrderId, sentCount, commodityId } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SupplierUpdateDetailsToWarehouseOrder(
        userId,
        warehouseOrderId,
        commodityId,
        sentCount
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
  reducers: {
    setWarhouseRowSelectedAction(state, action) {
      state.warehouseRowSelected = action?.payload;
    },
  },
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
    //#region GetPurchaseOrderDataAction-----
    builder
      .addCase(GetWarehouseOrderDataAction.pending, (state: WarehouseState) => {
        state.orderDetailData.pending = true;
      })
      .addCase(
        GetWarehouseOrderDataAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.orderDetailData.pending = false;
          state.orderDetailData.data = payload?.model;
        }
      )
      .addCase(
        GetWarehouseOrderDataAction.rejected,
        (state: WarehouseState, { error }) => {
          state.orderDetailData.pending = false;
        }
      );
    //#endregion
    //#region GetPurchaseOrderDataAction-----
    builder
      .addCase(
        SupplierAddDetailsToWarehouseOrderAction.pending,
        (state: WarehouseState) => {
          state.supplier.addSupplierToWarehouse.pending = true;
        }
      )
      .addCase(
        SupplierAddDetailsToWarehouseOrderAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.supplier.addSupplierToWarehouse.pending = false;
          state.supplier.addSupplierToWarehouse.data = payload;
        }
      )
      .addCase(
        SupplierAddDetailsToWarehouseOrderAction.rejected,
        (state: WarehouseState, { error }) => {
          state.supplier.addSupplierToWarehouse.pending = false;
        }
      );
    //#endregion
    //#region GetPurchaseOrderDataAction-----
    builder
      .addCase(
        SupplierUpdateDetailsToWarehouseOrderAction.pending,
        (state: WarehouseState) => {
          state.supplier.updateSupplierToWarehouse.pending = true;
        }
      )
      .addCase(
        SupplierUpdateDetailsToWarehouseOrderAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.supplier.updateSupplierToWarehouse.pending = false;
          state.supplier.updateSupplierToWarehouse.data = payload;
        }
      )
      .addCase(
        SupplierUpdateDetailsToWarehouseOrderAction.rejected,
        (state: WarehouseState, { error }) => {
          state.supplier.updateSupplierToWarehouse.pending = false;
        }
      );
    //#endregion
  },
});

export const { setWarhouseRowSelectedAction } = warehouseSlicer.actions;

export default warehouseSlicer.reducer;
