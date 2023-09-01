import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase";
import { collection, getDocs, query, onSnapshot, where, limit, WhereFilterOp, doc } from "firebase/firestore";
import { RootState } from "rdx/store";
import { UserFullData } from "types/UserFullDataType";


interface UsersState {
    error: string;
    selectedUser: UserFullData
    optionsNames: string[];
    optionsLocations: string[];
    optionsInterests: string[];
    randomUsers: UserFullData[];
    filteredUsers: UserFullData[];
}

const initialState: UsersState = {
    selectedUser: {} as UserFullData,
    error: '',
    optionsNames: [],
    optionsLocations: [],
    optionsInterests: [],
    randomUsers: [] as UserFullData[],
    filteredUsers: [] as UserFullData[],
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
        getRandomUsers(state, action: PayloadAction<UserFullData[]>) {
            state.randomUsers = action.payload
        },
        getFilteredUsers(state, action: PayloadAction<UserFullData[]>) {
            state.filteredUsers = action.payload
        },

        getSelectedUserData(state, action: PayloadAction<UserFullData>) {
            state.selectedUser = action.payload
        },
        getErrorMessage(state, action: PayloadAction<any>) {
            state.error = action.payload;
        },
    }
})


export const fetchUsersOptions = () => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        
        try {
            dispatch(getErrorMessage(''))

            const ref = query(collection(db, "users"));
            const unsubscribe = onSnapshot(ref, (querySnapshot) => {
                let names:string[] = [];
                let locations:string[] = [];
                let interests:any[] = [];

                querySnapshot.forEach((doc) => {
                    names.push(doc.data().fullname)
                    locations.push(doc.data().userLocation)
                    interests.push(doc.data().userInterests)
                });

                dispatch(getUsersInterests([...new Set(interests.flat())]))
                dispatch(getUsersLocations([...new Set(locations)]))
                dispatch(getUsersNames([...new Set(names)]))
            })
            
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
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
            let users: any[] = [];
            const refCity = query(collection(db, "users"), where("userCity", "==", `${myCity}`), limit(6));
            const refCountry = query(collection(db, "users"), where("userCountry", "==", `${myCountry}`), limit(6));
            const refGeneral = query(collection(db, "users"), limit(6));

            const unsubCity = onSnapshot(refCity, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                });

                if (users.length > 4) {
                    dispatch(getRandomUsers(filterUsers(users)))
                    return
                }
            })
            
            const unsubCountry = onSnapshot(refCountry, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                });

                if (users.length > 6) {
                    dispatch(getRandomUsers(filterUsers(users)))
                    return
                }
            })

            const unsubGeneral = onSnapshot(refGeneral, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                });
                dispatch(getRandomUsers(filterUsers(users)))
            })

        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
        }
    }
}


export const fetchFilteredUsers = (key:string, value: string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {

        try {
            dispatch(getErrorMessage(''))
            let sign:WhereFilterOp;

            if (key === 'fullname' || key === 'userLocation') {
                sign = '=='
            } else {
                sign = 'array-contains'
            }
            
            const ref = query(collection(db, "users"), where(`${key}`, `${sign}`, `${value}`));
            const unsubCity = onSnapshot(ref, 
                (querySnapshot) => {
                    let users: any[] = [];

                    querySnapshot.forEach((doc) => {
                        users.push(doc.data())
                    });

                    dispatch(getFilteredUsers(users))

                },
                (error) => {
                    console.log('error', error);
                }
            )

        } catch(error:any) {
            dispatch(getErrorMessage(error.message))
        }
    }
}



export const fetchSelectedUserData = (userId:string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        
        try {
            dispatch(getErrorMessage(''))
            const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
                dispatch(getSelectedUserData(doc.data() as UserFullData))
            });

        } catch(error:any) {
            dispatch(getErrorMessage(error.message))
        }
    }
}



export const { getSelectedUserData, getErrorMessage, getUsersNames, getUsersLocations, getUsersInterests, getRandomUsers, getFilteredUsers  } = usersSlice.actions;

export default usersSlice.reducer;