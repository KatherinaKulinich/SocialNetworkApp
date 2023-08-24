import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { db } from "firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
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
        getUserData(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
});




export const fetchUserFullData = (userId: string) => {
    
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {
;
        let docSnap;

        try {
            const docRef = doc(db, "users", userId);
            docSnap = await getDoc(docRef); 
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
            return
        }

        if (docSnap) {
            if (docSnap.exists()) {
                dispatch(getUserData(docSnap.data()))
            } else {
                dispatch(getErrorMessage('No such document!'))
            }
       }
    }
}

export const { getUserData, getErrorMessage } = userDataSlice.actions;

export default userDataSlice.reducer;