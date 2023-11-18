import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore"
import { db } from "firebase"
import { useAppDispatch, useAppSelector } from "./hooks"
// import { useUserData } from "./useUserData"
import { message } from "antd"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useCheckUserStatus } from "./useCheckUserStatus"




export const useFollowUser = () => {
    const dispatch = useAppDispatch()
    const { isFriend, isFollower, isRequest } = useCheckUserStatus()

    const user = useAppSelector(state => state.users.selectedUser)
    const {friends: userFriends, followingList: userFollowingList, friendRequests: userFriendRequests, userId} = user;
    
    const myData = useAppSelector(state => state.userData.user)
    const {friends: myFriends, followingList:myFollowingList, friendRequests: myFriendRequests, userId: myId} = myData;
    
    
    
    const [myRef, setMyRef] = useState<DocumentReference<DocumentData, DocumentData>>()
    const [userRef, setUserRef] = useState<DocumentReference<DocumentData, DocumentData>>()

    const getRef = useCallback(() => {
        if (myId && userId) {
            const myRef = doc(db, 'users', myId)
            const userRef = doc(db, 'users', userId)
            setMyRef(myRef)
            setUserRef(userRef)
        }
    }, [userId, myId])

    useEffect(() => {
        getRef()
    }, [])



    const sendFriendRequest = useCallback(async () => {
        await message.loading('Wait, the request is being processed...')

        const userNewFriendRequestsArray = [...new Set([...userFriendRequests, myId])]
        const myNewFollowingListArray = [...new Set([...myFollowingList, userId])]

        if (userRef && myRef) {
            await updateDoc(userRef, {
                friendRequests: userNewFriendRequestsArray
            })
            await updateDoc(myRef, {
                followingList: myNewFollowingListArray
            })
        }
        dispatch(fetchUserFullData(myId))
        dispatch(fetchSelectedUserData(userId))
        await message.success('The request was sent successfully!')
    }, [user, myData])




    const removeUserFromFriends = useCallback(async () => {
        await message.loading('Removing user from your friends...')

        const myNewFriendsArray = myFriends.filter((friendId) => {
            return friendId !== userId
        })
        const userNewFriendsArray = userFriends.filter((friendId) => {
            return friendId !== myId
        })


        if (userRef && myRef) {
            await updateDoc(userRef, {
                friends: userNewFriendsArray
            })
            await updateDoc(myRef, {
                friends: myNewFriendsArray
            })
        }

        dispatch(fetchUserFullData(myId))
        dispatch(fetchSelectedUserData(userId))
        await message.success('User has been deleted!')
    }, [user, myData])


    const interactWithUser = useCallback(() => {
        // console.log('%cIsFRIEND', 'color:red', isFriend);
        // console.log('%cIsFollower', 'color:red', isFollower);
        // console.log('%cIsRequest', 'color:red', isRequest);
        if (isFriend && !isFollower && !isRequest) {
            removeUserFromFriends()
        } else if (!isFriend && !isFollower && !isRequest) {
            sendFriendRequest()
        }
        // dispatch(fetchUserFullData(myId))
        // dispatch(fetchSelectedUserData(userId))
    }, [myId, userId, isFriend, isRequest, isFollower])


    // useEffect(() => {
    //     console.log('%cIsFRIEND', 'color:yellow', isFriend);
    //     console.log('%cIsFollower', 'color:yellow', isFollower);
    //     console.log('%cIsRequest', 'color:yellow', isRequest);
        
    // }, [isFriend, isRequest, isFollower, user, userId])





    return {
        sendFriendRequest,
        removeUserFromFriends,
        interactWithUser
    }
}