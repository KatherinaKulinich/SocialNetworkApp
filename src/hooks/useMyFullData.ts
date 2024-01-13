import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useEffect, useState } from "react"
import { useAuth } from "./authorization/useAuth"
import { useAppDispatch, useAppSelector } from "./hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"



export const useMyFullData = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    // const [friendsIds, setFriendsIds] = useState<string[]>([])

    useEffect(() => {
       const getMyProfileData = () => {
            if (userId) {
                return dispatch(fetchUserFullData(userId))
            }
        }
        getMyProfileData()
    }, [])
    
    const userData = useAppSelector(state => state.userData.user)
    
    // useEffect(() => {
    //     if (Object.keys(userData).length === 6) {
            
    //         const { friends } = userData.contacts 
    //         console.log('friends', friends);
            
            
    //         const friendsIdsArray = friends.map(user => user.id)
    //         console.log('friendsId', friendsIdsArray);
    //         dispatch(fetchFriends(friendsIdsArray, 'friends'))
            
    //         // setFriendsIds(friendsIdsArray)
    //     }
    // }, [userData])

    // console.warn('ids', friendsIdsArray);

    // useEffect(() => {
    //     if (userData && friendsIds) {
    //         console.log('222',friendsIds);
            
    //     }
    // }, [friendsIds])
    
    // const friendsData = useAppSelector(state => state.friends.friendsData)
    // console.log('hook friends', friendsData);
    

    return userData
}