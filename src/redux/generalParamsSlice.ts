import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ParamsState {
    loading: boolean;
    alertMessage: string;
}

const initialState: ParamsState = {
    loading: false,
    alertMessage: ''
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