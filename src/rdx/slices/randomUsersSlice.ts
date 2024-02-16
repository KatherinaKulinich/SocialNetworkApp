import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { db } from "firebase";
import { query, collection, where, limit, onSnapshot, doc, getDoc } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserProfile } from "types/UserProfile";

interface RandomUsersState {
    error: string;
    randomUsers: Array<UserProfile>;
    randomUsersIds: Array<string>;
    currentRandomUsers: Array<UserProfile>
}

const initialState: RandomUsersState = {
    error: '',
    randomUsers: [] as Array<UserProfile>,
    randomUsersIds: [] as Array<string>,
    currentRandomUsers: [] as Array<UserProfile>,
}



const randomUsersSlice = createSlice({
    name: 'randomUsers',
    initialState,
    reducers: {
        getRandomUsers(state, action: PayloadAction<Array<UserProfile>>) {
            state.randomUsers = action.payload
        },
        getRandomUsersIds(state) {
            state.randomUsersIds = state.randomUsers.map(user => user.personalData.userId)
        },
        refreshRandomUsersData(state, action: PayloadAction<Array<UserProfile>> ) {
            state.currentRandomUsers = action.payload
        },
        getErrorMessage(state, action: PayloadAction<any>) {
            state.error = action.payload;
        },
    }
})



export const fetchRandomUsers = (myCountry: string, myCity:string, myId: string) => {
    const filterUsers = (usersArray: any[]) => {
        let uniqueUsers = usersArray.filter((obj, index) =>
            usersArray.findIndex((item) => item.personalData.userId === obj.personalData.userId) === index
        ).filter(user => {
            return user?.personalData?.userId !== myId
        })

        if (uniqueUsers.length > 6) {
            uniqueUsers.length = 6
        }
        return uniqueUsers
    }

    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        try {
            dispatch(getErrorMessage(''))
            let users: UserProfile[] = [];
            const refCity = query(collection(db, "users"), where("profileData.userCity", "==", `${myCity}`), limit(6));
            const refCountry = query(collection(db, "users"), where("profileData.userCountry", "==", `${myCountry}`), limit(6));
            const refGeneral = query(collection(db, "users"), limit(6));

            onSnapshot(refCity, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data() as UserProfile)
                });

                if (users.length > 4) {
                    dispatch(getRandomUsers(filterUsers(users)))
                    return
                }
            })
            onSnapshot(refCountry, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data() as UserProfile)
                });

                if (users.length > 6) {
                    dispatch(getRandomUsers(filterUsers(users)))
                    return
                }
            })
            onSnapshot(refGeneral, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data() as UserProfile)
                });
                dispatch(getRandomUsers(filterUsers(users)))
            })
            dispatch(getRandomUsersIds())
        } catch(error:unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}

export const fetchCurrentRandomUsersData = (usersIds:string[]) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        let users: Array<UserProfile> = [];

        dispatch(refreshRandomUsersData([]))
        

        try {
            if (usersIds.length > 0) {
                usersIds.forEach( async(id) => {
                    const ref = doc(db, 'users', id)
                    
                    const docSnap = await getDoc(ref)
                    const user = docSnap.data() as UserProfile  
                    users = [...users, user]
                    dispatch(refreshRandomUsersData(users))
                })
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
    getErrorMessage, 
    getRandomUsers,
    getRandomUsersIds, 
    refreshRandomUsersData,
} = randomUsersSlice.actions;

export default randomUsersSlice.reducer;