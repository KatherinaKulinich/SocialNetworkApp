import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { db } from "firebase";
import { doc, getDoc } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserProfile } from "types/UserProfile";


interface UserDataState {
    user: UserProfile;
    error: string | null;
}



const initialState: UserDataState = {
    user: {} as UserProfile,
    error: null,
};


const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        getUserInfo(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload;  
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        removeUserData(state) {
            state.user = {} as UserProfile
        }
    },
});




export const fetchUserFullData = (userId: string) => {

    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                dispatch(getUserInfo(docSnap.data() as UserProfile))            
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}


export const { 
    getUserInfo, 
    getErrorMessage ,
    removeUserData
} = userDataSlice.actions;

export default userDataSlice.reducer;