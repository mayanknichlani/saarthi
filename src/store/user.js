import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currNurseName: null,
        currNurseAddress: null,
        currNurseDegree: null,
    },
    reducers: {
        handleCardClicked: (state, action) => {
            const { currNurseName, currNurseAddress, currNurseDegree } = action.payload;
            state.currNurseName = currNurseName;
            state.currNurseAddress = currNurseAddress;
            state.currNurseDegree = currNurseDegree;
        },
    },
});

export default userSlice;
export const userActions = userSlice.actions;
