import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase";
import { collection, getDocs, query, onSnapshot, where, limit, WhereFilterOp, doc, getDoc } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserProfile } from "types/UserProfile";


interface UsersState {
    error: string;
    selectedUser: UserProfile
    optionsNames: string[];
    optionsLocations: string[];
    optionsInterests: string[];
    randomUsers: UserProfile[];
    filteredUsers: UserProfile[];
}

const initialState: UsersState = {
    selectedUser: {} as UserProfile,
    error: '',
    optionsNames: [],
    optionsLocations: [],
    optionsInterests: [],
    randomUsers: [] as UserProfile[],
    filteredUsers: [] as UserProfile[],
}


const usersSlice = createSlice({
    name: 'users',
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
        getRandomUsers(state, action: PayloadAction<UserProfile[]>) {
            state.randomUsers = action.payload
        },
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
                    locations.push(doc.data().profileData.userLocation)
                    interests.push(doc.data().profileData.userInterests)
                    
                    if (doc.data().userFullname !== myFullName) {
                        names.push(doc.data().personalData.userFullname)
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




export const fetchRandomUsers = (myCountry: string, myCity:string, myId: string) => {

    const filterUsers = (usersArray: any[]) => {
        let uniqueUsers = usersArray.filter((obj, index) =>
            usersArray.findIndex((item) => item.userId === obj.userId) === index
        ).filter(user => {
            return user.userId !== myId
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

        } catch (error:unknown) {
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
        }
    }
}


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
                        if (doc.data().userId !== myId) {
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
    getUsersNames, 
    getUsersLocations, 
    getUsersInterests, 
    getRandomUsers, 
    getFilteredUsers  
} = usersSlice.actions;

export default usersSlice.reducer;