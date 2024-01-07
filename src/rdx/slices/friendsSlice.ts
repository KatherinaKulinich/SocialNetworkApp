import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase"
import { doc, getDoc } from "firebase/firestore"
import { RootState } from "rdx/store"
import { UserProfile } from "types/UserProfile"




interface FriendsState {
    friendsData: UserProfile[],
    followingListData: UserProfile[],
    friendRequestsData: UserProfile[],
    followersData: UserProfile[],
    selectedUser: UserProfile,
    errorMessage: string,
    loading: boolean;
}


const initialState: FriendsState = {
    friendsData: [] as UserProfile[],
    followingListData: [] as UserProfile[],
    friendRequestsData: [] as UserProfile[],
    followersData: [] as UserProfile[],
    selectedUser: {} as UserProfile,
    errorMessage: '',
    loading: false,
}






const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        getFriendsData(state, action: PayloadAction<UserProfile[]>) {
            state.friendsData = action.payload
        },
        getFollowingListData(state, action: PayloadAction<UserProfile[]>) {
            state.followingListData = action.payload
        },
        getFriendRequestData(state, action: PayloadAction<UserProfile[]>) {
            state.friendRequestsData = action.payload
        },
        getFollowersData(state, action: PayloadAction<UserProfile[]>) {
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

        let friends: UserProfile[] = [];
        let followingList: UserProfile[] = [];
        let friendRequests: UserProfile[] = [];
        let followers: UserProfile[] = [];

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
                    const user = docSnap.data() as UserProfile

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
        } catch (error:unknown) {
            dispatch(getLoading(false))
            if (error instanceof Error) {
                dispatch(getErrorMessage(error.message))
                return
            }
            dispatch(getErrorMessage(String(error)))
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
