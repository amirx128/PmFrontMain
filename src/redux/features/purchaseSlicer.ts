import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   I_FINANCIAL_Q,
//   I_LOGISTIC_Q,
//   I_PURCHASE_ORDER_DATA,
//   I_PURCHASE_ORDER_DETAIL_DATA,
// } from "./../../core/administrations/administrations.model.ts";
import { AdministrationState, GetAllRoles } from "./administrationSlicer.ts";
import {
  AddDetailsToPurchaseOrder,
  ApproveSendItems,
  ApproveUpdateDetails,
  FinancialSendItems,
  FinancialUpdateDetails,
  GetApproveQ,
  GetFinancialQ,
  GetLogisticsQ,
  GetPurchaseOrderData,
  GetPurchaseOrderDetailsData,
  LogisticsSendItems,
} from "../../core/purchase/purchase.service.ts";

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.id
    : "1";
};

export interface PurchaseState {
  logistics: {
    queue: {
      data: any;
      pending: boolean;
    };
    sendItems: {
      data: any;
      pending: boolean;
    };
  };
  orderData: any;
  orderDetailData: any;
  financials: {
    queue: {
      data: any;
      pending: boolean;
    };
    sendItems: {
      data: any;
      pending: boolean;
    };
  };
  approve: {
    queue: {
      data: any;
      pending: boolean;
    };
    sendItems: {
      data: any;
      pending: boolean;
    };
  };
}

const initialState: PurchaseState = {
  logistics: {
    queue: {
      data: [],
      pending: false,
    },
    sendItems: {
      data: [],
      pending: false,
    },
  },
  orderData: null,
  orderDetailData: null,
  financials: {
    queue: {
      data: [],
      pending: false,
    },
    sendItems: {
      data: [],
      pending: false,
    },
  },
  approve: {
    queue: {
      data: [],
      pending: false,
    },
    sendItems: {
      data: [],
      pending: false,
    },
  },
};

export const GetLogisticsQAction = createAsyncThunk(
  "purchase/GetLogisticsQAction",
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetLogisticsQ(
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

export const GetPurchaseOrderDataAction = createAsyncThunk(
  "purchase/GetPurchaseOrderDataAction",
  async (id, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetPurchaseOrderData(userId, id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetPurchaseOrderDetailsDataAction = createAsyncThunk(
  "purchase/GetPurchaseOrderDetailsDataAction",
  async (id, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetPurchaseOrderDetailsData(userId, id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddDetailsToPurchaseOrderAction = createAsyncThunk(
  "purchase/AddDetailsToPurchaseOrderAction",
  async (
    body: any,
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await AddDetailsToPurchaseOrder(userId, body);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const LogisticsSendItemsAction = createAsyncThunk(
  "purchase/LogisticsSendItemsAction",
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await LogisticsSendItems(
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

export const GetFinancialQAction = createAsyncThunk(
  "purchase/GetFinancialQAction",
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetFinancialQ(
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

export const FinancialUpdateDetailsActions = createAsyncThunk(
  "purchase/FinancialUpdateDetailsActions",
  async (
    body: { mablaghEtebar: any; purchaseOrderDetailsId: number | string },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await FinancialUpdateDetails(
        userId,
        body.mablaghEtebar,
        body.purchaseOrderDetailsId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const FinancialSendItemsActions = createAsyncThunk(
  "purchase/FinancialSendItemsActions",
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await FinancialSendItems(
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

export const GetApproveQAction = createAsyncThunk(
  "purchase/GetApproveQAction",
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }: any
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId: any = getUserId(state);
      const { data } = await GetApproveQ(
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

export const ApproveSendItemsAction = createAsyncThunk(
  "purchase/ApproveSendItemsAction",
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: "desc" | "asc";
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ApproveSendItems(
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

export const ApproveUpdateDetailsAction = createAsyncThunk(
  "purchase/ApproveUpdateDetailsAction",
  async (
    body: {
      count: number;
      approveStateId: number;
      purchaseOrderDetailsId: number;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ApproveUpdateDetails(
        userId,
        body.count,
        body.approveStateId,
        body.purchaseOrderDetailsId
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const purchaseSlicer = createSlice({
  name: "purchase",
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetLogisticsQAction-----
    builder
      .addCase(GetLogisticsQAction.pending, (state: PurchaseState) => {
        state.logistics.queue.pending = true;
      })
      .addCase(
        GetLogisticsQAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.logistics.queue.pending = false;
          state.logistics.queue.data = [...payload?.model];
        }
      )
      .addCase(
        GetLogisticsQAction.rejected,
        (state: PurchaseState, { error }) => {
          state.logistics.queue.pending = false;
        }
      );
    //#endregion
    //#region LogisticsSendItemsAction-----
    builder
      .addCase(LogisticsSendItemsAction.pending, (state: PurchaseState) => {
        state.logistics.sendItems.pending = true;
      })
      .addCase(
        LogisticsSendItemsAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.logistics.sendItems.pending = false;
          state.logistics.sendItems.data = [...payload?.model];
        }
      )
      .addCase(
        LogisticsSendItemsAction.rejected,
        (state: PurchaseState, { error }) => {
          state.logistics.sendItems.pending = false;
        }
      );
    //#endregion
    //#region GetFinancialQAction-----
    builder
      .addCase(GetFinancialQAction.pending, (state: PurchaseState) => {
        state.financials.queue.pending = true;
      })
      .addCase(
        GetFinancialQAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.financials.queue.pending = false;
          state.financials.queue.data = [...payload?.model];
        }
      )
      .addCase(
        GetFinancialQAction.rejected,
        (state: PurchaseState, { error }) => {
          state.financials.queue.pending = false;
        }
      );
    //#endregion
    //#region FinancialSendItemsActions-----
    builder
      .addCase(FinancialSendItemsActions.pending, (state: PurchaseState) => {
        state.financials.sendItems.pending = true;
      })
      .addCase(
        FinancialSendItemsActions.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.financials.sendItems.pending = false;
          state.financials.sendItems.data = [...payload?.model];
        }
      )
      .addCase(
        FinancialSendItemsActions.rejected,
        (state: PurchaseState, { error }) => {
          state.financials.sendItems.pending = false;
        }
      );
    //#endregion
    //#region GetApproveQAction-----
    builder
      .addCase(GetApproveQAction.pending, (state: PurchaseState) => {
        state.approve.queue.pending = true;
      })
      .addCase(
        GetApproveQAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.approve.queue.pending = false;
          state.approve.queue.data = [...payload?.model];
        }
      )
      .addCase(
        GetApproveQAction.rejected,
        (state: PurchaseState, { error }) => {
          state.approve.queue.pending = false;
        }
      );
    //#endregion
    //#region ApproveSendItemsAction-----
    builder
      .addCase(ApproveSendItemsAction.pending, (state: PurchaseState) => {
        state.approve.sendItems.pending = true;
      })
      .addCase(
        ApproveSendItemsAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.approve.sendItems.pending = false;
          state.approve.sendItems.data = [...payload?.model];
        }
      )
      .addCase(
        ApproveSendItemsAction.rejected,
        (state: PurchaseState, { error }) => {
          state.approve.sendItems.pending = false;
        }
      );
    //#endregion
  },
});

export default purchaseSlicer.reducer;
