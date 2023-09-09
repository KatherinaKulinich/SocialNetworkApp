import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase"
import { onSnapshot, doc } from "firebase/firestore"
import { RootState } from "rdx/store"
import { UserFullData } from "types/UserFullDataType"




interface FriendsState {
    friendsData: UserFullData[],
    errorMessage: string,
}


const initialState: FriendsState = {
    friendsData: [] as UserFullData[],
    errorMessage: '',
}






const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        getFriendsData(state, action: PayloadAction<any[]>) {
            state.friendsData = action.payload
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

            if (friendsIdsArray !== undefined && friendsIdsArray.length > 0) {

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


export const { getFriendsData, getErrorMessage  } = friendsSlice.actions;

export default friendsSlice.reducer;