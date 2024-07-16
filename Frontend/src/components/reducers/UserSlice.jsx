import { createSlice, createSelector } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: [JSON.parse(localStorage.getItem("User_model"))] || [], 
    reducers: {
        setUserDetails: (state, action) => {
            state.pop();
            state.push(action.payload)
            localStorage.setItem("User_model", JSON.stringify(action.payload));
        }
    }
})

export const getUserDetailsSelector = createSelector(
    (state) => state.user[0],
    (state) => state
);

export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;