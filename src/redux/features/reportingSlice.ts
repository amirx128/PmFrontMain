import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GetAllRepoertsAndProps } from '../../core/reporting/reporting.service.ts';

const getUserId = (state) => {
  return state?.user?.user?.id ?? localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.id
    : '1';
};

export interface ReportingSlice {
  ReportsAndProps: {
    data: any;
    pending: boolean;
  };
}

const initialState: ReportingSlice = {
  ReportsAndProps: {
    data: [],
    pending: false,
  },
};

export const GetAllRepoertsAndPropsAction = createAsyncThunk(
  'reporting/GetAllRepoertsAndPropsAction',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const userId = getUserId(state);
      const { data } = await GetAllRepoertsAndProps(userId);
      return fulfillWithValue(data);
    } catch (err) {
      throw rejectWithValue(err);
    }
  }
);

export const ReportingSlicer = createSlice({
  name: 'reporting',
  initialState,
  reducers: undefined,
  extraReducers: (builder) => {
    //#region GetAllRepoertsAndPropsAction-----
    builder
      .addCase(
        GetAllRepoertsAndPropsAction.pending,
        (state: ReportingSlice) => {
          state.ReportsAndProps.pending = true;
        }
      )
      .addCase(
        GetAllRepoertsAndPropsAction.fulfilled,
        (state: ReportingSlice, { payload }) => {
          state.ReportsAndProps.pending = false;
          state.ReportsAndProps.data = payload.model;
        }
      )
      .addCase(
        GetAllRepoertsAndPropsAction.rejected,
        (state: ReportingSlice) => {
          state.ReportsAndProps.pending = false;
        }
      );
    //#endregion
  },
});

// Action creators are generated for each case reducer function
export default ReportingSlicer.reducer;
