import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserFullData } from "types/UserFullDataType";


interface UsersState {
    users: UserFullData[];
    error: string;
    errorIsNoUsers: boolean;

}

const initialState: UsersState = {
    users: [],
    error: '',
    errorIsNoUsers: false,
}


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAllUsers(state, action: PayloadAction<any>) {
            state.users = action.payload;
        },
        getUsersNames(state) {

        },
        getUsersInterests(state) {

        },
        getUsersLocations(state) {

        },
        getChosenUserData(state, action: PayloadAction<any>) {

        },
        getErrorMessage(state, action: PayloadAction<any>) {
            state.error = action.payload;
            console.log(state.error);
        }
    }
})

export const fetchUsers = () => {
    
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        let querySnapshot;

        try {
            const ref = query(collection(db, "users"));
            querySnapshot= await getDocs(ref); 
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
            return
        }
        dispatch(getAllUsers((querySnapshot.docs.map(doc => ({
            ...doc.data()   
        }))))) 
    }
}

export const { getAllUsers, getUsersNames, getUsersInterests, getUsersLocations, getChosenUserData, getErrorMessage  } = usersSlice.actions;

export default usersSlice.reducer;