import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    trainSearchData: {},
    srcAutoSuggestion: [],
    destAutoSuggestion: [],
}

const detailSlice = createSlice({
    name:'detail',
    initialState,
    reducers:{
        setSrcAutoSuggestion: (state, action) => {
            state.srcAutoSuggestion = action.payload;
        },
        setDestAutoSuggestion: (state, action) => {
            state.destAutoSuggestion = action.payload;
        },
        setTrainSearchData: (state, action) => {
            state.trainSearchData = action.payload;
        }
    }

})

export const {setDestAutoSuggestion, setSrcAutoSuggestion, setTrainSearchData} = detailSlice.actions;
export default detailSlice.reducer;