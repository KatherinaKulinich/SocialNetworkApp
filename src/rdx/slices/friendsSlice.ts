import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase"
import { onSnapshot, doc, collection, query, where } from "firebase/firestore"
import { RootState } from "rdx/store"
import { UserFullData } from "types/UserFullDataType"




interface FriendsState {
    friendsData: UserFullData[],
    errorMessage: string,
    selectedUser: UserFullData,
}


const initialState: FriendsState = {
    friendsData: [] as UserFullData[],
    errorMessage: '',
    selectedUser: {} as UserFullData,
}






const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        getFriendsData(state, action: PayloadAction<UserFullData[]>) {
            state.friendsData = action.payload
        },
        getSelectedUser(state, action: PayloadAction<UserFullData>) {
            state.selectedUser = action.payload
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        },
    }
})


export const fetchFriends = (user:UserFullData) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        const { friends : friendsIdsArray} = user;

        try {
            dispatch(getErrorMessage(''))
            let friends: any[] = [];

            if (friendsIdsArray) {
                friendsIdsArray.map((id:string) => {
                    onSnapshot(doc(db, "users", id), (doc) => {
                        friends = [...friends, doc.data()]
                        dispatch(getFriendsData(friends)) 
                    });
                })
            }
        } catch (error:any) {
            dispatch(getErrorMessage(error.message))
        }
    }
}


export const fetchSelectedUser = (userId:string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        try {
            const userRef = doc(db, "users", userId)

            onSnapshot(userRef, (doc) => {
                dispatch(getSelectedUser(doc.data() as UserFullData))
            })
        } catch (error:any) {
            console.log(error.message)
        }
    }
}




export const { getFriendsData, getErrorMessage, getSelectedUser  } = friendsSlice.actions;

export default friendsSlice.reducer;