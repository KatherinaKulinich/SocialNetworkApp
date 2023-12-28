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
import { UserFullData } from "types/UserFullDataType"




export const useFollowUser = (user:UserFullData) => {

    
    const dispatch = useAppDispatch()
    const { isFriend, isFollower, isRequest} = useCheckUserStatus()

    // const user = useAppSelector(state => state.users.selectedUser)
    const {friends: userFriends, followingList: userFollowingList, friendRequests: userFriendRequests, followers: userFollowers, userId} = user;
    
    const myData = useAppSelector(state => state.userData.user)
    const {friends: myFriends, followingList:myFollowingList, friendRequests: myFriendRequests, followers: myFollowers, userId: myId} = myData;
    
    
    
    const [myRef, setMyRef] = useState<DocumentReference<DocumentData, DocumentData>>()
    const [userRef, setUserRef] = useState<DocumentReference<DocumentData, DocumentData>>()

    const getRef = useCallback(() => {
        if (myId && userId) {
            const ref = doc(db, 'users', myId)
            const refUser = doc(db, 'users', userId)
            setMyRef(ref)
            setUserRef(refUser)
        }
    }, [userId, myId, myRef, userRef])

    // const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string)
    // const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string)


    useEffect(() => {
        getRef()
    }, [userId, myId])


    const refreshUsersData = useCallback(() => {
        dispatch(fetchUserFullData(myId))
        dispatch(fetchSelectedUserData(userId))
    }, [user, myData])



    const sendFriendRequest = useCallback(async () => {
        // getRef()
        await message.loading('Wait, the request is being processed...')

        const userNewFriendRequestsArray = [...new Set([...userFriendRequests, myId])]
        const myNewFollowingListArray = [...new Set([...myFollowingList, userId])]
        console.log(user, myData);
        
        console.log(userNewFriendRequestsArray , myNewFollowingListArray );
        console.log(myRef, userRef);
        
        

        if (userRef && myRef) {
            await updateDoc(userRef, {
                friendRequests: userNewFriendRequestsArray
            })
            await updateDoc(myRef, {
                followingList: myNewFollowingListArray
            })
        }
        refreshUsersData()
        // dispatch(fetchUserFullData(myId))
        // dispatch(fetchSelectedUserData(userId))
        await message.success('The request was sent successfully!')
    }, [user, myData, getRef])




    const removeUserFromFriends = useCallback(async () => {
        // getRef()
        await message.loading('Removing user from your friends...')
        const myNewFriendsArray = myFriends.filter(id => id !== userId)
        const userNewFriendsArray = userFriends.filter(id => id !== myId)

        if (userRef && myRef) {
            // console.log(userRef, myRef);
            
            await updateDoc(userRef, {
                friends: userNewFriendsArray
            })
            await updateDoc(myRef, {
                friends: myNewFriendsArray
            })
        }
        refreshUsersData()
        // dispatch(fetchUserFullData(myId))
        // dispatch(fetchSelectedUserData(userId))
        await message.success('User has been deleted!')
    }, [user, myData, getRef])



    const interactWithUser = useCallback(() => {
        if (isFriend && !isFollower && !isRequest) {
            removeUserFromFriends()
        } else if (!isFriend && !isFollower && !isRequest) {
            sendFriendRequest()
        }
    }, [myId, userId, isFriend, isRequest, isFollower])



  
    const unfollowFromUser = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        // getRef()
        await message.loading('Unfollowing from user...')

        const myNewFollowingListArray = myFollowingList.filter(id => id !== userId)

        // console.log(myRef);
        if (myRef) {
            await updateDoc(myRef, {
                followingList: myNewFollowingListArray
            })
        }
        
        if (userFriendRequests.includes(myId)) {
            // console.log(userFriendRequests.includes(myId));
            
            const userNewFriendRequestsArray = userFriendRequests.filter(id => id !== myId)
            // console.log(userNewFriendRequestsArray );

            if (userRef) {
                await updateDoc(userRef, {
                    friendRequests: userNewFriendRequestsArray
                })
            }
        }

        // dispatch(fetchUserFullData(myId))
        // dispatch(fetchSelectedUserData(userId))
        refreshUsersData()
        await message.success(`You've unfollowed from ${user.userFullname}'s updates!`)
    }, [user, myData, getRef])



    
    
    
    const deleteFriendRequest = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        await message.loading('Deleting the request...')
        // getRef()
        const myNewFriendRequestsArray = myFriendRequests.filter(id => id !== userId)
        const myNewFollowersArray = [...new Set([...myFollowers, userId])]

        
        if (myRef) {
            await updateDoc(myRef, {
                friendRequests: myNewFriendRequestsArray,
                followers: myNewFollowersArray,
            })
        }
        refreshUsersData()
        await message.success(`The request has been deleted! Now ${user.userFullname} is your follower`)
        // dispatch(fetchUserFullData(myId))
        // dispatch(fetchSelectedUserData(userId))
    }, [user, myData, getRef])
    
    
    const acceptFriendRequest = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        // getRef()
        await message.loading('Accepting the request...')


        const userNewFollowingListArray = userFollowingList.filter(id => id !== myId)
        const myNewFriendsArray = [...new Set([...myFriends, userId])]
        const userNewFriendsArray = [...new Set([...userFriends, myId])]
        const myNewFriendRequestsArray = myFriendRequests.filter(id => id !== userId)

        if (myRef && userRef) {
            await updateDoc(myRef, {
                friends: myNewFriendsArray,
                friendRequests: myNewFriendRequestsArray
            })
            await updateDoc(userRef, {
                followingList: userNewFollowingListArray,
                friends: userNewFriendsArray
            })
        }
        refreshUsersData()
        await message.success('Congrats! You and Anna are friends now!')
    }, [user, myData, getRef])


    // const deleteFollower = useCallback(async(event: React.MouseEvent<HTMLElement>) => {
    //     event.stopPropagation()
    //     await message.loading('Deleting user from followers...')

    //     const myNewFollowersArray = myFollowers.filter(id => id !== userId)
    //     const userNewFollowingListArray = userFollowingList.filter(id => id !== myId)

    //     if (myRef && userRef) {
    //         await updateDoc(myRef, {
    //             followers: myNewFollowersArray,
    //         })
    //         await updateDoc(userRef, {
    //             followingList: userNewFollowingListArray,
    //         })
    //     }
    //     refreshUsersData()
    //     await message.success("You've deleted the user! Now this user won't see your profile updates.")
    // }, [user, myData, getRef])


    return {
        // sendFriendRequest,
        // removeUserFromFriends,
        interactWithUser,
        unfollowFromUser,
        acceptFriendRequest,
        deleteFriendRequest,
        // deleteFollower
    }
}