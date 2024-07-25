import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainData: [],
  quota: "GN",
  selectedSrcStationList: [],
  selectedDestStationList: [],
  availabilityDataCache: {},
  hideAvailability: false,
  doj: ''
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
    setDoj: (state, action) => {
      state.doj = action.payload;
    },
    setHideAvailability: (state, action) => {
      state.hideAvailability = action.payload;
    },
    setAvailabilityDataCache: (state, action) => {
      const {trainNumber, ticketClass, availabibityData} = action.payload;
      if( trainNumber === 'NULL'){
        state.availabilityDataCache = {};
      }else{
        if(state.availabilityDataCache[trainNumber]){
            state.availabilityDataCache[trainNumber][ticketClass] = availabibityData;
        }else{
          state.availabilityDataCache[trainNumber] = {};
          state.availabilityDataCache[trainNumber][ticketClass] = availabibityData;
        }
      }
    }
  },
});

export const {
  setselectedSrcStationList,
  setselectedDestStationList,
  setTrainData,
  setQuota,
  setDoj,
  setAvailabilityDataCache,
  setHideAvailability
} = detailSlice.actions;

export default detailSlice.reducer;
