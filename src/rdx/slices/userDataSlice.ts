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
            console.log(state.user);
            
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
});




export const fetchUserFullData = (userId: string) => {
    console.log('!!!!!!!!');
    
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        try {
            const docRef = doc(db, "users", userId);
            console.log(docRef);
            
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            
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
    getErrorMessage 
} = userDataSlice.actions;

export default userDataSlice.reducer;