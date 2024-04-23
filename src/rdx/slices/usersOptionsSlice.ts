import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { db } from "firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { RootState } from "rdx/store";

interface UsersOptionsState {
    error: string;
    optionsNames: string[];
    optionsLocations: string[];
    optionsInterests: string[];
}

const initialState: UsersOptionsState = {
    error: '',
    optionsNames: [],
    optionsLocations: [],
    optionsInterests: [],
}




const usersOptionsSlice = createSlice({
    name: 'usersOptions',
    initialState,
    reducers: {
        getUsersNames(state, action: PayloadAction<string[]>) {
            state.optionsNames = action.payload
        },
        getUsersLocations(state, action: PayloadAction<string[]>) {
            state.optionsLocations = action.payload
        },
        getUsersInterests(state, action: PayloadAction<string[]>) {
            state.optionsInterests = action.payload
        },
        getErrorMessage(state, action: PayloadAction<any>) {
            state.error = action.payload;
        },
    }
})


export const fetchUsersOptions = (myFullName: string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        
        try {
            dispatch(getErrorMessage(''))
            const ref = query(collection(db, "users"));

            onSnapshot(ref, (querySnapshot) => {
                let names:string[] = [];
                let locations:string[] = [];
                let interests:string[] = [];

                querySnapshot.forEach((doc) => {
                    const birthday = doc.data().profileData.userBirthday

                    if (birthday !== undefined && birthday.year !== null) {
                        
                        const userInterests = doc.data().profileData.userInterests
                        interests.push(userInterests)
    
                        const userLocation = doc.data().profileData.userLocation
                        if (userLocation.trim() !== '') {
                            locations.push(userLocation)
                        }
    
                        const userFullname = doc.data().personalData.userFullname
                        if (userFullname !== myFullName && userFullname.trim() !== '') {
                            names.push(userFullname)
                        }
                    }
                });
                dispatch(getUsersInterests([...new Set(interests.flat())]))
                dispatch(getUsersLocations([...new Set(locations)]))
                dispatch(getUsersNames([...new Set(names)]))
            })
        } catch (error:unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}



export const { 
    getErrorMessage, 
    getUsersNames, 
    getUsersLocations, 
    getUsersInterests,  
} = usersOptionsSlice.actions;

export default usersOptionsSlice.reducer;