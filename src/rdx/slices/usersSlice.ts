import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase";
import { collection, query, onSnapshot, where,  WhereFilterOp, doc, getDoc } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserProfile } from "types/UserProfile";


interface UsersState {
    error: string;
    selectedUser: UserProfile
    filteredUsers: UserProfile[];
}

const initialState: UsersState = {
    selectedUser: {} as UserProfile,
    error: '',
    filteredUsers: [] as UserProfile[],
}


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getFilteredUsers(state, action: PayloadAction<UserProfile[]>) {
            state.filteredUsers = action.payload
        },
        getSelectedUserData(state, action: PayloadAction<UserProfile>) {
            state.selectedUser = action.payload
        },
        getErrorMessage(state, action: PayloadAction<any>) {
            state.error = action.payload;
        },
    }
})





export const fetchFilteredUsers = (key:string, value: string, myId:string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {

        try {
            dispatch(getErrorMessage(''))
            let sign:WhereFilterOp;

            if (key === 'personalData.userFullname' || key === 'profileData.userLocation') {
                sign = '=='
            } else {
                sign = 'array-contains'
            }
            
            const ref = query(collection(db, "users"), where(`${key}`, `${sign}`, `${value}`));

            onSnapshot(ref, 
                (querySnapshot) => {
                    let users: UserProfile[] = [];

                    querySnapshot.forEach((doc) => {
                        if (doc.data().personalData.userId !== myId) {
                            users.push(doc.data() as UserProfile)
                        }
                    });
                    dispatch(getFilteredUsers(users))
                },
                (error) => {
                    console.log('error', error);
                }
            )
        } catch(error:unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}



export const fetchSelectedUserData = (userId:string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        
        try {
            dispatch(getErrorMessage(''))

            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                dispatch(getSelectedUserData(docSnap.data() as UserProfile))            
            }
        } catch(error:unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}



export const { 
    getSelectedUserData, 
    getErrorMessage, 
    getFilteredUsers  
} = usersSlice.actions;

export default usersSlice.reducer;