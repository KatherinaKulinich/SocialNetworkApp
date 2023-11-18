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
    // const { userId: myId } = useAuth()

    const user = useAppSelector(state => state.users.selectedUser)
    const {friends: userFriends, followingList: userFollowingList, friendRequests: userFriendRequests, userId} = user;

    const myData = useAppSelector(state => state.userData.user)
    const {friends: myFriends, followingList:myFollowingList, friendRequests: myFriendRequests, userId: myId} = myData;

    const { isFriend } = useCheckUserStatus()

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





    //removing
    // const removeFriend = useCallback(
    //     async (ref:DocumentReference<DocumentData, DocumentData>, id:string, friendsArray:string[]) => {

    //     const newFriendsArray = friendsArray.filter((friendId) => {
    //         return friendId !== id
    //     })

    //     await updateDoc(ref, {
    //         friends: newFriendsArray
    //     })
    // }, [])


    // const removeFriendFromMe = useCallback(() => {
    //     if (myRef !== undefined && myFriends !== undefined) {
            
    //         removeFriend(myRef, userId, myFriends)
    //     }
    // }, [myRef, userId, myFriends])


    // const removeMeFromFriend = useCallback(() => {
    //     if (userRef !== undefined && userFriends !== undefined && myId !== null) {
    //         removeFriend(userRef, myId, userFriends)
    //     }
    // }, [userRef, myId, userFriends])


    // const stopBeingFriendsWithUser = useCallback(async() => {
    //     if (userRef && myRef && myId && userId) {
    //         await message.loading('Removing from friends...')
    //         removeFriendFromMe()
    //         removeMeFromFriend()
    //         // dispatch(fetchUserFullData(myId))
    //         // dispatch(fetchSelectedUserData(userId))
    //         await message.success('Removed!')
    //     }
    // }, [myRef, userRef])


    //checking user for friendship

    // const checkUser = useCallback((friendId: string) => {
    //     if (myId) {
    //         if (myFriends?.includes(friendId) && userFriends?.includes(myId)) {
    //             setIsFriend(true)
    //             return
    //         }
    //         setIsFriend(false)
    //     }
    // }, [myFriends, isFriend, userFriends, myId])


    // useEffect(() => {
    //     console.log(userId);
        
    //     checkUser(userId)
    // }, [userId])






    //main 

    // const onFriends = useCallback(async () => {

    //     if (myRef && userRef && myId && userId) {

    //         if (isFriend === true) {
    //             await stopBeingFriendsWithUser()
    //             // setIsFriend(false)
    //         } else if (isFriend === false) {
    //             // await becomeFriendsWithUser()
    //             // setIsFriend(true)
    //         }

    //         dispatch(fetchUserFullData(myId))
    //         dispatch(fetchSelectedUserData(userId))
    //     }

    // }, [isFriend, myRef, userRef])





    return {
        // isFriend,
        // onFriends,
        sendFriendRequest,
        removeUserFromFriends
        // checkUser
    }
}