import { message } from "antd"
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useCallback } from "react"
import { useCheckUserStatus } from "./useCheckUserStatus"
import { UserProfile } from "types/UserProfile"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { db } from "firebase"





export const useFriendshipWithUser = (user:UserProfile) => {
    const dispatch = useAppDispatch()
    const { isFriend, isFollower, isRequest} = useCheckUserStatus()

    const userId = user?.personalData?.userId     
    const { 
        friends: userFriends, 
        friendRequests: userFriendRequests, 
    } = user?.contacts ?? {};
    
    const myData = useAppSelector(state => state.userData.user)
    const myId = myData?.personalData?.userId
    const { 
        friends: myFriends, 
        followingList: myFollowingList, 
    } = myData?.contacts ?? {};

    const refreshUsersData = useCallback(() => {
        dispatch(fetchUserFullData(myId))
        dispatch(fetchSelectedUserData(userId))
    }, [user, myData])


 

    const sendFriendRequest = useCallback(async () => {
        await message.loading('Wait, the request is being processed...')

        const userNewFriendRequestsArray = [...new Set([...userFriendRequests, myId])]
        const myNewFollowingListArray = [...new Set([...myFollowingList, userId])]

        if (myId && userId) {
            const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string) 
            const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string) 

            await updateDoc(userRef, {
                "contacts.friendRequests": userNewFriendRequestsArray
            })
            await updateDoc(myRef, {
                "contacts.followingList": myNewFollowingListArray
            })
        }
        refreshUsersData()
        await message.success('The request was sent successfully!')
    }, [user, myData])




    const removeUserFromFriends = useCallback(async () => {
        await message.loading('Removing user from your friends...')
        
        const myNewFriendsArray = myFriends.filter(user => user.id !== userId)
        const userNewFriendsArray = userFriends.filter(user => user.id !== myId)

        if (myId && userId) {
            const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string) 
            const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string) 

            await updateDoc(userRef, {
                "contacts.friends": userNewFriendsArray
            })
            await updateDoc(myRef, {
                "contacts.friends": myNewFriendsArray
            })
        }
        refreshUsersData()
        await message.success('User has been deleted!')
    }, [user, myData])



    const interactWithUser = useCallback(() => {
        if (isFriend && !isFollower && !isRequest) {
            removeUserFromFriends()
        } else if (!isFriend && !isFollower && !isRequest) {
            sendFriendRequest()
        }
    }, [myId, userId, isFriend, isRequest, isFollower])
    



    return {
        interactWithUser
    }
}