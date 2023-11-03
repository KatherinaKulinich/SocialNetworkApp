import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useAuth } from "./useAuth"
import { UserFullData } from "types/UserFullDataType"
import { fetchFriends } from "rdx/slices/friendsSlice"




export const useUserData = () => {

    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId !== null && userId !== undefined ) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch])

    const userData:UserFullData = useAppSelector(state => state.userData.user)

    useEffect(() => {
        dispatch(fetchFriends(userData))
    },[dispatch])

    const myFriendsData = useAppSelector(state => state.friends.friendsData)
    
    
    return {
        userData,
        myFriendsData
    }
}