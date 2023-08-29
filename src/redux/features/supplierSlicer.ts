import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetSupplierQ,
  SupplierSentItem,
} from "../../core/supplier/Supplier.service";

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
  },
};

export const GetSupplierQAction = createAsyncThunk(
  "supplier/GetSupplierQAction",
  async (
    body: { fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetSupplierQ(
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

export const SuppLierSentItemAction = createAsyncThunk(
  "supplier/SupplierSentItem",
  async (
    body: { fromDate: any; toDate: any },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await SupplierSentItem(
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
  },
});

export default supplierSlicer.reducer;
