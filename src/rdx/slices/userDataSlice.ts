import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { db } from "firebase";
import { getDocs, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserFullData } from "types/UserFullDataType";


interface UserDataState {
    user: UserFullData;
    error: string | null;
}



const initialState: UserDataState = {
    user: {} as UserFullData,
    error: null,
};


const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        getUserInfo(state, action: PayloadAction<UserFullData>) {
            state.user = action.payload;
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
});




export const fetchUserFullData = (userId: string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                dispatch(getUserInfo(docSnap.data() as UserFullData))            
            }
            // onSnapshot(docRef, (doc) => {           
            // })
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
            return
        }
    }
}

export const { 
    getUserInfo, 
    getErrorMessage 
} = userDataSlice.actions;

export default userDataSlice.reducer;