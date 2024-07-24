import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainData: [],
  quota: "GN",
  selectedSrcStationList: [],
  selectedDestStationList: [],
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setselectedSrcStationList: (state, action) => {
      state.selectedSrcStationList = [...action.payload];
    },
    setselectedDestStationList: (state, action) => {
      state.selectedDestStationList = [...action.payload];
    },
    setTrainData: (state, action) => {
      state.trainData = action.payload;
    },
    setQuota: (state, action) => {
      state.quota = action.payload;
    },
  },
});

export const {
  setselectedSrcStationList,
  setselectedDestStationList,
  setTrainData,
  setQuota,
} = detailSlice.actions;
export default detailSlice.reducer;
