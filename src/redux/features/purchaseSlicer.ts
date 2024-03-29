import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
  UpdateDetailsToPurchaseOrder,
  DownloadApproveQ,
  DownloadApproveSendItems,
  DownloadFinancialQ,
  DownloadFinancialSendItems,
  DownloadLogisticsQ,
  DownloadLogisticsSendItems,
  DownloadPurchaseOrderData,
} from '../../core/purchase/purchase.service.ts';
import downloadExcel from '../../utils/downloadExcell.ts';

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.id
    : '1';
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
    addPurchaseRes: {
      pending: boolean;
      data: any;
    };
    updatePurchaseRes: {
      pending: boolean;
      data: any;
    };
    downloadQueue: {
      pending: boolean;
    };
    downloadSentItem: {
      pending: boolean;
    };
  };
  orderData: any;
  orderDetailData: {
    data: any;
    pending: boolean;
  };
  downloadOrderDetailData: {
    pending: boolean;
  };
  purchaseOrderDetailsData: {
    data: any;
    pending: boolean;
  };
  financials: {
    queue: {
      data: any;
      pending: boolean;
    };
    sendItems: {
      data: any;
      pending: boolean;
    };
    updatePurchaseRes: {
      pending: boolean;
      data: any;
    };
    downloadQueue: {
      pending: boolean;
    };
    downloadSentItem: {
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
    updatePurchaseRes: {
      pending: boolean;
      data: any;
    };
    downloadQueue: {
      pending: boolean;
    };
    downloadSentItem: {
      pending: boolean;
    };
  };
  purchaseRowSelected: any;
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
    addPurchaseRes: {
      pending: false,
      data: [],
    },
    updatePurchaseRes: {
      pending: false,
      data: [],
    },
    downloadQueue: {
      pending: false,
    },
    downloadSentItem: {
      pending: false,
    },
  },
  orderData: null,
  orderDetailData: {
    pending: false,
    data: undefined,
  },
  downloadOrderDetailData: {
    pending: false,
  },
  purchaseOrderDetailsData: {
    pending: false,
    data: undefined,
  },
  financials: {
    queue: {
      data: [],
      pending: false,
    },
    sendItems: {
      data: [],
      pending: false,
    },
    updatePurchaseRes: {
      pending: false,
      data: [],
    },
    downloadQueue: {
      pending: false,
    },
    downloadSentItem: {
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
    updatePurchaseRes: {
      pending: false,
      data: [],
    },
    downloadQueue: {
      pending: false,
    },
    downloadSentItem: {
      pending: false,
    },
  },
  purchaseRowSelected: undefined,
};
export const GetLogisticsQAction = createAsyncThunk(
  'purchase/GetLogisticsQAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
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
export const DownloadLogisticsQAction = createAsyncThunk(
  'purchase/DownloadLogisticsQAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadLogisticsQ(
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
  'purchase/GetPurchaseOrderDataAction',
  async (
    body: { id: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetPurchaseOrderData(userId, body.id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);
export const DownloadPurchaseOrderDataAction = createAsyncThunk(
  'purchase/DownloadPurchaseOrderDataAction',
  async (
    body: { id: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadPurchaseOrderData(userId, body.id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const GetPurchaseOrderDetailsDataAction = createAsyncThunk(
  'purchase/GetPurchaseOrderDetailsDataAction',
  async (
    body: { id: number },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetPurchaseOrderDetailsData(userId, body.id);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const AddDetailsToPurchaseOrderAction = createAsyncThunk(
  'purchase/AddDetailsToPurchaseOrderAction',
  async (
    body: {
      supporterId: string;
      purchaseOrderId: number;
      BaravordFeeKala: number;
      BaravordkolMandeh: number;
      FileContent1?: any;
      FileContent2?: any;
      FileContent3?: any;
      FileContent4?: any;
      FileContent5?: any;
    },
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
export const UpdateDetailsToPurchaseOrderAction = createAsyncThunk(
  'purchase/UpdateDetailsToPurchaseOrderAction',
  async (
    body: {
      supporterId: string;
      PurchaseOrderDetailsId: number;
      BaravordFeeKala: number;
      BaravordkolMandeh: number;
      FileContent1?: any;
      FileContent2?: any;
      FileContent3?: any;
      FileContent4?: any;
      FileContent5?: any;
      removedFilesIds?: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await UpdateDetailsToPurchaseOrder(userId, body);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const LogisticsSendItemsAction = createAsyncThunk(
  'purchase/LogisticsSendItemsAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
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
export const DownloadLogisticsSendItemsAction = createAsyncThunk(
  'purchase/DownloadLogisticsSendItemsAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadLogisticsSendItems(
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
  'purchase/GetFinancialQAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
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
export const DownloadFinancialQAction = createAsyncThunk(
  'purchase/DownloadFinancialQAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadFinancialQ(
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
  'purchase/FinancialUpdateDetailsActions',
  async (
    body: {
      mablaghEtebar: any;
      purchaseOrderDetailsId: number | string;
      removedFilesIds: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await FinancialUpdateDetails(
        userId,
        body.mablaghEtebar,
        body.purchaseOrderDetailsId,
        body.removedFilesIds
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const FinancialSendItemsActions = createAsyncThunk(
  'purchase/FinancialSendItemsActions',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
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
export const DownloadFinancialSendItemsActions = createAsyncThunk(
  'purchase/DownloadFinancialSendItemsActions',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadFinancialSendItems(
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
  'purchase/GetApproveQAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
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
export const DownloadPurchaseApproveQAction = createAsyncThunk(
  'purchase/DownloadPurchaseApproveQAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }: any
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId: any = getUserId(state);
      const { data } = await DownloadApproveQ(
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
  'purchase/ApproveSendItemsAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
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
export const DownloadApproveSendItemsAction = createAsyncThunk(
  'purchase/DownloadApproveSendItemsAction',
  async (
    body: {
      fromDate: any;
      toDate: any;
      orderType?: 'desc' | 'asc';
      orderBy?: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { fromDate, toDate, orderType, orderBy } = body;

      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await DownloadApproveSendItems(
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
  'purchase/ApproveUpdateDetailsAction',
  async (
    body: {
      count: number;
      ApproveStateId: number;
      purchaseOrderDetailsId: number;
      removedFilesIds: number[];
    },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await ApproveUpdateDetails(
        userId,
        body.count,
        body.ApproveStateId,
        body.purchaseOrderDetailsId,
        body.removedFilesIds
      );
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const purchaseSlicer = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setPurchaseRowSelectedAction(state, action) {
      state.purchaseRowSelected = action?.payload;
    },
  },
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
    //#region GetPurchaseOrderDataAction-----
    builder
      .addCase(GetPurchaseOrderDataAction.pending, (state: PurchaseState) => {
        state.orderDetailData.pending = true;
      })
      .addCase(
        GetPurchaseOrderDataAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.orderDetailData.pending = false;
          state.orderDetailData.data = payload?.model;
        }
      )
      .addCase(
        GetPurchaseOrderDataAction.rejected,
        (state: PurchaseState, { error }) => {
          state.orderDetailData.pending = false;
        }
      );
    //#endregion
    //#region GetPurchaseOrderDetailsDataAction-----
    builder
      .addCase(
        GetPurchaseOrderDetailsDataAction.pending,
        (state: PurchaseState) => {
          state.purchaseOrderDetailsData.pending = true;
        }
      )
      .addCase(
        GetPurchaseOrderDetailsDataAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.purchaseOrderDetailsData.pending = false;
          state.purchaseOrderDetailsData.data = payload?.model;
        }
      )
      .addCase(
        GetPurchaseOrderDetailsDataAction.rejected,
        (state: PurchaseState, { error }) => {
          state.purchaseOrderDetailsData.pending = false;
        }
      );
    //#endregion
    //#region AddDetailsToPurchaseOrderAction-----
    builder
      .addCase(
        AddDetailsToPurchaseOrderAction.pending,
        (state: PurchaseState) => {
          state.logistics.addPurchaseRes.pending = true;
        }
      )
      .addCase(
        AddDetailsToPurchaseOrderAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.logistics.addPurchaseRes.pending = false;
          state.logistics.addPurchaseRes.data = payload;
        }
      )
      .addCase(
        AddDetailsToPurchaseOrderAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.logistics.addPurchaseRes.pending = false;
          state.logistics.addPurchaseRes.data = payload;
        }
      );
    //#endregion
    //#region UpdateDetailsToPurchaseOrderAction-----
    builder
      .addCase(
        UpdateDetailsToPurchaseOrderAction.pending,
        (state: PurchaseState) => {
          state.logistics.updatePurchaseRes.pending = true;
        }
      )
      .addCase(
        UpdateDetailsToPurchaseOrderAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.logistics.updatePurchaseRes.pending = false;
          state.logistics.updatePurchaseRes.data = payload;
        }
      )
      .addCase(
        UpdateDetailsToPurchaseOrderAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.logistics.updatePurchaseRes.pending = false;
          state.logistics.updatePurchaseRes.data = payload;
        }
      );
    //#endregion
    //#region FinancialUpdateDetailsActions-----
    builder
      .addCase(
        FinancialUpdateDetailsActions.pending,
        (state: PurchaseState) => {
          state.financials.updatePurchaseRes.pending = true;
        }
      )
      .addCase(
        FinancialUpdateDetailsActions.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.financials.updatePurchaseRes.pending = false;
          state.financials.updatePurchaseRes.data = payload;
        }
      )
      .addCase(
        FinancialUpdateDetailsActions.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.financials.updatePurchaseRes.pending = false;
          state.financials.updatePurchaseRes.data = payload;
        }
      );
    //#endregion
    //#region ApproveUpdateDetailsAction-----
    builder
      .addCase(ApproveUpdateDetailsAction.pending, (state: PurchaseState) => {
        state.approve.updatePurchaseRes.pending = true;
      })
      .addCase(
        ApproveUpdateDetailsAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.approve.updatePurchaseRes.pending = false;
          state.approve.updatePurchaseRes.data = payload;
        }
      )
      .addCase(
        ApproveUpdateDetailsAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.approve.updatePurchaseRes.pending = false;
          state.approve.updatePurchaseRes.data = payload;
        }
      );
    //#endregion
    //#region DownloadLogisticsQAction-----
    builder
      .addCase(DownloadLogisticsQAction.pending, (state: PurchaseState) => {
        state.logistics.downloadQueue.pending = true;
      })
      .addCase(
        DownloadLogisticsQAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.logistics.downloadQueue.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadLogisticsQAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.logistics.downloadQueue.pending = false;
        }
      );
    //#endregion
    //#region DownloadLogisticsSendItemsAction-----
    builder
      .addCase(
        DownloadLogisticsSendItemsAction.pending,
        (state: PurchaseState) => {
          state.logistics.downloadSentItem.pending = true;
        }
      )
      .addCase(
        DownloadLogisticsSendItemsAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.logistics.downloadSentItem.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadLogisticsSendItemsAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.logistics.downloadSentItem.pending = false;
        }
      );
    //#endregion
    //#region DownloadFinancialQAction-----
    builder
      .addCase(DownloadFinancialQAction.pending, (state: PurchaseState) => {
        state.financials.downloadQueue.pending = true;
      })
      .addCase(
        DownloadFinancialQAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.financials.downloadQueue.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadFinancialQAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.financials.downloadQueue.pending = false;
        }
      );
    //#endregion
    //#region DownloadFinancialSendItemsActions-----
    builder
      .addCase(
        DownloadFinancialSendItemsActions.pending,
        (state: PurchaseState) => {
          state.financials.downloadSentItem.pending = true;
        }
      )
      .addCase(
        DownloadFinancialSendItemsActions.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.financials.downloadSentItem.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadFinancialSendItemsActions.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.financials.downloadSentItem.pending = false;
        }
      );
    //#endregion
    //#region DownloadPurchaseApproveQAction-----
    builder
      .addCase(
        DownloadPurchaseApproveQAction.pending,
        (state: PurchaseState) => {
          state.approve.downloadQueue.pending = true;
        }
      )
      .addCase(
        DownloadPurchaseApproveQAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.approve.downloadQueue.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadPurchaseApproveQAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.approve.downloadQueue.pending = false;
        }
      );
    //#endregion
    //#region DownloadApproveSendItemsAction-----
    builder
      .addCase(
        DownloadApproveSendItemsAction.pending,
        (state: PurchaseState) => {
          state.approve.downloadSentItem.pending = true;
        }
      )
      .addCase(
        DownloadApproveSendItemsAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.approve.downloadSentItem.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadApproveSendItemsAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.approve.downloadSentItem.pending = false;
        }
      );
    //#endregion
    //#region DownloadPurchaseOrderDataAction-----
    builder
      .addCase(
        DownloadPurchaseOrderDataAction.pending,
        (state: PurchaseState) => {
          state.downloadOrderDetailData.pending = true;
        }
      )
      .addCase(
        DownloadPurchaseOrderDataAction.fulfilled,
        (state: PurchaseState, { payload }) => {
          state.downloadOrderDetailData.pending = false;
          downloadExcel(payload);
        }
      )
      .addCase(
        DownloadPurchaseOrderDataAction.rejected,
        (state: PurchaseState, { error, payload }) => {
          state.downloadOrderDetailData.pending = false;
        }
      );
    //#endregion
  },
});
export const { setPurchaseRowSelectedAction } = purchaseSlicer.actions;
export default purchaseSlicer.reducer;
