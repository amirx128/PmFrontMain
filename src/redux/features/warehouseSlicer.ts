import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetWarehouseQ,
  WarehouseSentItem,
  GetExitWareHouseQ,
  ExitWarehouseSentItem,
  GetWarehouseOrderData,
  SupplierAddDetailsToWarehouseOrder,
  SupplierUpdateDetailsToWarehouseOrder,
  DownloadExitWareHouseQ,
  DownloadExitWarehouseSentItem,
  DownloadWarehouseQ,
  DownloadWarehouseSentItem,
  WarehouseReceiveCommidity,
  WarehouseAddDetailsToExitFromWarehouse,
  WarehouseUpdateDetailsToExitFromWarehouse,
  WarehouseRequesterUserApproveReceive,
  GetExitWarehouseOrderData,
} from "../../core/warehouse/WareHouse.service";
import downloadExcel from "../../utils/downloadExcell";

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
    downloadQueue: {
      pending: boolean;
    };
    downloadSentItem: {
      pending: boolean;
    };
    updateWarehouse: {
      pending: boolean;
      data: any;
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
    downloadQueue: {
      pending: boolean;
    };
    downloadSentItem: {
      pending: boolean;
    };
    addExitWarhouse: {
      pending: boolean;
      data: any;
    };
    updateExitWarhouse: {
      pending: boolean;
      data: any;
    };
  };
  warehouseRowSelected: any;
  orderDetailData: {
    data: any;
    pending: boolean;
  };
  exitOrderDetailData: {
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
  requesterUser: {
    updateApproveState: {
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
    downloadQueue: {
      pending: false,
    },
    downloadSentItem: {
      pending: false,
    },
    updateWarehouse: {
      pending: false,
      data: [],
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
    downloadQueue: {
      pending: false,
    },
    downloadSentItem: {
      pending: false,
    },
    addExitWarhouse: {
      pending: false,
      data: [],
    },
    updateExitWarhouse: {
      pending: false,
      data: [],
    },
  },
  warehouseRowSelected: undefined,
  orderDetailData: {
    pending: false,
    data: undefined,
  },
  exitOrderDetailData: {
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
  requesterUser: {
    updateApproveState: {
      data: [],
      pending: false,
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
export const GetExitWarehouseOrderDataAction = createAsyncThunk(
  "warehouse/GetExitWarehouseOrderDataAction",
  async (
    body: { id: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetExitWarehouseOrderData(userId, body.id);
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
export const DownloadWarehouseQAction = createAsyncThunk(
  "warehouse/DownloadWarehouseQAction",
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
      const { data } = await DownloadWarehouseQ(
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
export const DownloadExitWarehouseQAction = createAsyncThunk(
  "warehouse/DownloadExitWarehouseQAction",
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
      const { data } = await DownloadExitWareHouseQ(
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
export const DownloadWarehouseSentItemAction = createAsyncThunk(
  "warehosue/DownloadWarehouseSentItemAction",
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
      const { data } = await DownloadWarehouseSentItem(
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
export const DownloadExitWarehouseSentItemAction = createAsyncThunk(
  "warehosue/DownloadExitWarehouseSentItemAction",
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
      const { data } = await DownloadExitWarehouseSentItem(
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
      id: number;
      sentCount: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { id, sentCount } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SupplierUpdateDetailsToWarehouseOrder(
        userId,
        id,
        sentCount
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const WarehouseReceiveCommidityAction = createAsyncThunk(
  "warehosue/WarehouseReceiveCommidityAction",
  async (
    body: {
      warehouseOrderId: number;
      warehouseOrderDetailsId: number;
      receiveCount: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { warehouseOrderId, warehouseOrderDetailsId, receiveCount } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await WarehouseReceiveCommidity(
        userId,
        warehouseOrderId,
        warehouseOrderDetailsId,
        receiveCount
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const WarehouseAddDetailsToExitFromWarehouseAction = createAsyncThunk(
  "warehosue/WarehouseAddDetailsToExitFromWarehouseAction",
  async (
    body: {
      exitWarehouseOrderId: number;
      count: number;
      receiveIsOk: boolean;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { exitWarehouseOrderId, count, receiveIsOk } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await WarehouseAddDetailsToExitFromWarehouse(
        userId,
        exitWarehouseOrderId,
        count,
        receiveIsOk
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const WarehouseUpdateDetailsToExitFromWarehouseAction = createAsyncThunk(
  "warehosue/WarehouseUpdateDetailsToExitFromWarehouseAction",
  async (
    body: {
      id: number;
      count: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { id, count } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await WarehouseUpdateDetailsToExitFromWarehouse(
        userId,
        id,
        count
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const WarehouseRequesterUserApproveReceiveAction = createAsyncThunk(
  "warehosue/WarehouseRequesterUserApproveReceiveAction",
  async (
    body: {
      exitFromWarehouseDetailsId: number;
      count: number;
      receiveIsOk: boolean;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { exitFromWarehouseDetailsId, count, receiveIsOk } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await WarehouseRequesterUserApproveReceive(
        userId,
        exitFromWarehouseDetailsId,
        count,
        receiveIsOk
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
    //#region GetWarehouseOrderDataAction-----
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
    //#region GetExitWarehouseOrderDataAction-----
    builder
      .addCase(
        GetExitWarehouseOrderDataAction.pending,
        (state: WarehouseState) => {
          state.exitOrderDetailData.pending = true;
        }
      )
      .addCase(
        GetExitWarehouseOrderDataAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitOrderDetailData.pending = false;
          state.exitOrderDetailData.data = payload?.model;
        }
      )
      .addCase(
        GetExitWarehouseOrderDataAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitOrderDetailData.pending = false;
        }
      );
    //#endregion
    //#region SupplierAddDetailsToWarehouseOrderAction-----
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
    //#region SupplierUpdateDetailsToWarehouseOrderAction-----
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
    //#region WarehouseReceiveCommidityAction-----
    builder
      .addCase(
        WarehouseReceiveCommidityAction.pending,
        (state: WarehouseState) => {
          state.warehouse.updateWarehouse.pending = true;
        }
      )
      .addCase(
        WarehouseReceiveCommidityAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.warehouse.updateWarehouse.pending = false;
          state.warehouse.updateWarehouse.data = payload;
        }
      )
      .addCase(
        WarehouseReceiveCommidityAction.rejected,
        (state: WarehouseState, { error }) => {
          state.warehouse.updateWarehouse.pending = false;
        }
      );
    //#endregion
    //#region DownloadWarehouseQAction-----
    builder
      .addCase(DownloadWarehouseQAction.pending, (state: WarehouseState) => {
        state.warehouse.downloadQueue.pending = true;
      })
      .addCase(
        DownloadWarehouseQAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.warehouse.downloadQueue.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadWarehouseQAction.rejected,
        (state: WarehouseState, { error }) => {
          state.warehouse.downloadQueue.pending = false;
        }
      );
    //#endregion
    //#region DownloadWarehouseSentItemAction-----
    builder
      .addCase(
        DownloadWarehouseSentItemAction.pending,
        (state: WarehouseState) => {
          state.warehouse.downloadSentItem.pending = true;
        }
      )
      .addCase(
        DownloadWarehouseSentItemAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.warehouse.downloadSentItem.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadWarehouseSentItemAction.rejected,
        (state: WarehouseState, { error }) => {
          state.warehouse.downloadSentItem.pending = false;
        }
      );
    //#endregion
    //#region DownloadExitWarehouseQAction-----
    builder
      .addCase(
        DownloadExitWarehouseQAction.pending,
        (state: WarehouseState) => {
          state.exitWarehouse.downloadQueue.pending = true;
        }
      )
      .addCase(
        DownloadExitWarehouseQAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitWarehouse.downloadQueue.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadExitWarehouseQAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitWarehouse.downloadQueue.pending = false;
        }
      );
    //#endregion
    //#region DownloadExitWarehouseSentItemAction-----
    builder
      .addCase(
        DownloadExitWarehouseSentItemAction.pending,
        (state: WarehouseState) => {
          state.exitWarehouse.downloadSentItem.pending = true;
        }
      )
      .addCase(
        DownloadExitWarehouseSentItemAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitWarehouse.downloadSentItem.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadExitWarehouseSentItemAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitWarehouse.downloadSentItem.pending = false;
        }
      );
    //#endregion
    //#region WarehouseAddDetailsToExitFromWarehouseAction-----
    builder
      .addCase(
        WarehouseAddDetailsToExitFromWarehouseAction.pending,
        (state: WarehouseState) => {
          state.exitWarehouse.addExitWarhouse.pending = true;
        }
      )
      .addCase(
        WarehouseAddDetailsToExitFromWarehouseAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitWarehouse.addExitWarhouse.pending = false;
          state.exitWarehouse.addExitWarhouse.data = payload;
        }
      )
      .addCase(
        WarehouseAddDetailsToExitFromWarehouseAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitWarehouse.addExitWarhouse.pending = false;
        }
      );
    //#endregion
    //#region WarehouseRequesterUserApproveReceiveAction-----
    builder
      .addCase(
        WarehouseRequesterUserApproveReceiveAction.pending,
        (state: WarehouseState) => {
          state.requesterUser.updateApproveState.pending = true;
        }
      )
      .addCase(
        WarehouseRequesterUserApproveReceiveAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.requesterUser.updateApproveState.pending = false;
          state.requesterUser.updateApproveState.data = payload;
        }
      )
      .addCase(
        WarehouseRequesterUserApproveReceiveAction.rejected,
        (state: WarehouseState, { error }) => {
          state.requesterUser.updateApproveState.pending = false;
        }
      );
    //#endregion
    //#region WarehouseUpdateDetailsToExitFromWarehouseAction-----
    builder
      .addCase(
        WarehouseUpdateDetailsToExitFromWarehouseAction.pending,
        (state: WarehouseState) => {
          state.exitWarehouse.updateExitWarhouse.pending = true;
        }
      )
      .addCase(
        WarehouseUpdateDetailsToExitFromWarehouseAction.fulfilled,
        (state: WarehouseState, { payload }) => {
          state.exitWarehouse.updateExitWarhouse.pending = false;
          state.exitWarehouse.updateExitWarhouse.data = payload;
        }
      )
      .addCase(
        WarehouseUpdateDetailsToExitFromWarehouseAction.rejected,
        (state: WarehouseState, { error }) => {
          state.exitWarehouse.updateExitWarhouse.pending = false;
        }
      );
    //#endregion
  },
});

export const { setWarhouseRowSelectedAction } = warehouseSlicer.actions;

export default warehouseSlicer.reducer;
