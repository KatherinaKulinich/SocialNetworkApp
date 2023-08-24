import { createSlice } from "@reduxjs/toolkit";


export interface UserAuth {
    userId: string | null;
    userEmail: string | null;
    userPassword: string | null | any;
}



const initialState: UserAuth = {
    userId: null,
    userEmail: null,
    userPassword: null,
};




const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.userEmail = action.payload.userEmail;
            state.userId = action.payload.userId;
            state.userPassword = action.payload.userPassword;
        },
        removeUser(state) {
            state.userEmail = null;
            state.userId = null;
            state.userPassword = null;
        }
    },
});



export const { setUser, removeUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;