import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase"
import { onSnapshot, doc, collection, query, where, getDoc } from "firebase/firestore"
import { RootState } from "rdx/store"
import { UserFullData } from "types/UserFullDataType"




interface FriendsState {
    friendsData: UserFullData[],
    followingListData: UserFullData[],
    friendRequestsData: UserFullData[],
    followersData: UserFullData[],
    errorMessage: string,
    selectedUser: UserFullData,
    loading: boolean;
}


const initialState: FriendsState = {
    friendsData: [] as UserFullData[],
    followingListData: [] as UserFullData[],
    friendRequestsData: [] as UserFullData[],
    followersData: [] as UserFullData[],
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
        getFollowingListData(state, action: PayloadAction<UserFullData[]>) {
            state.followingListData = action.payload
        },
        getFriendRequestData(state, action: PayloadAction<UserFullData[]>) {
            state.friendRequestsData = action.payload
        },
        getFollowersData(state, action: PayloadAction<UserFullData[]>) {
            state.followersData = action.payload
        },
        getErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        },
        getLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})


export const fetchFriends =  (usersIds:string[], key:string) => {
    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>) => {

        let friends: UserFullData[] = [];
        let followingList: UserFullData[] = [];
        let friendRequests: UserFullData[] = [];
        let followers: UserFullData[] = [];

        try {
            dispatch(getErrorMessage(''))
            dispatch(getFriendsData([])) 
            dispatch(getFollowingListData([]))
            dispatch(getFriendRequestData([]))
            dispatch(getFollowersData([]))

            dispatch(getLoading(true))
            
            if (usersIds) {
                usersIds.forEach(async (id) => {
                    const ref = doc(db, 'users', id)
                    const docSnap = await getDoc(ref)
                    const user = docSnap.data() as UserFullData

                    if (key === 'friends') {
                        friends.push(user)
                        dispatch(getFriendsData(friends)) 
                    } else if (key === 'followingList') {
                        followingList.push(user)
                        dispatch(getFollowingListData(followingList)) 
                    } else if (key === 'friendRequests') {
                        friendRequests.push(user)
                        dispatch(getFriendRequestData(friendRequests)) 
                    } else if (key === 'followers') {
                        followers.push(user)
                        dispatch(getFriendRequestData(followers)) 
                    } else {
                        dispatch(getErrorMessage('something went wrong! Try later!'))
                    }

                })
            }
            dispatch(getLoading(false))
        } catch (error:any) {
            dispatch(getLoading(false))
            dispatch(getErrorMessage(error.message))
        } 
    }
}



export const { 
    getFriendsData, 
    getErrorMessage, 
    getLoading, 
    getFollowingListData, 
    getFriendRequestData,
    getFollowersData 
} = friendsSlice.actions;

export default friendsSlice.reducer;
