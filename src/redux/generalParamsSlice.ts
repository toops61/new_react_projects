import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ParamsState {
    loading: boolean;
}

const initialState: ParamsState = {
    loading: false
}

const generalParamsSlice = createSlice({
    name: "generalParams",
    initialState,
    reducers: {
        updateGeneralParams: (state,action: PayloadAction<object>) => {
            state = {...state,...action.payload};
            return state;
        }
    }
})

export const {updateGeneralParams} = generalParamsSlice.actions;

export default generalParamsSlice.reducer;