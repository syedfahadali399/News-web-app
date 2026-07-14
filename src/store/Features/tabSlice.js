import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
    name: "tab",
    initialState: {
        tab: ""
    },
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload
        }
    }
})

export const { setTab } = tabSlice.actions

export default tabSlice.reducer