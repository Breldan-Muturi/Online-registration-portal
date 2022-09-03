import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: true,
}

const sideSlice = createSlice({
    name: 'side',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
    }
});

export const { toggleSidebar } = sideSlice.actions;
export default sideSlice.reducer;