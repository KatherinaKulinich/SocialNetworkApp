import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase"
import { onSnapshot, doc, collection, query, where, getDoc } from "firebase/firestore"
import { RootState } from "rdx/store"
import { UserFullData } from "types/UserFullDataType"




interface FriendsState {
    friendsData: UserFullData[],
    errorMessage: string,
    selectedUser: UserFullData,
    loading: boolean;
}


const initialState: FriendsState = {
    friendsData: [] as UserFullData[],
    errorMessage: '',
    selectedUser: {} as UserFullData,
    loading: false,
}






const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        getFriendsData(state, action: PayloadAction<UserFullData[]>) {
            state.friendsData = action.payload
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        },
        getLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})


export const fetchFriends =  (user:UserFullData) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {
        const { friends : friendsIdsArray} = user;
        let friends: UserFullData[] = [];

        try {
            dispatch(getErrorMessage(''))
            dispatch(getFriendsData([])) 
            dispatch(getLoading(true))
            
            if (friendsIdsArray) {

                friendsIdsArray.forEach(async (id )=> {
                    const ref = doc(db, 'users', id)
                    const docSnap = await getDoc(ref)

                    const user = docSnap.data() as UserFullData
                    friends.push(user)
                    dispatch(getFriendsData(friends)) 
                    dispatch(getLoading(false))
                })
            }
        } catch (error:any) {
            dispatch(getLoading(false))
            dispatch(getErrorMessage(error.message))
        } 
    }
}



export const { getFriendsData, getErrorMessage, getLoading } = friendsSlice.actions;

export default friendsSlice.reducer;
