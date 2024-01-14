import { useCallback, useEffect, useState } from "react"
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore"
import { db } from "firebase"
import { useAppDispatch, useAppSelector } from "../hooks"
import { message } from "antd"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { UserProfile } from "types/UserProfile"




export const useUserSubscription = (user:UserProfile) => {
    const dispatch = useAppDispatch()

    const { userId, userFullname } = user?.personalData
    const { 
        friends: userFriends, 
        followingList: userFollowingList, 
        friendRequests: userFriendRequests, 
        followers: userFollowers 
    } = user?.contacts ?? {}
    
    const myData = useAppSelector(state => state.userData.user)
    const { userId:myId } = myData?.personalData
    const { 
        friends: myFriends, 
        followingList: myFollowingList, 
        friendRequests: myFriendRequests, 
        followers: myFollowers 
    } = myData.contacts ?? {}


    const refreshUsersData = useCallback(() => {
        dispatch(fetchUserFullData(myId))
        dispatch(fetchSelectedUserData(userId))
    }, [user, myData])


  
    const unfollowFromUser = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        await message.loading('Unfollowing from user...')
        const myNewFollowingListArray = myFollowingList.filter(id => id !== userId)

        if (myId) {
            const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string)
            
            await updateDoc(myRef, {
                "contacts.followingList": myNewFollowingListArray
            })
        }
        
        if (userFriendRequests.includes(myId)) {
            const userNewFriendRequestsArray = userFriendRequests.filter(id => id !== myId)

            if (userId) {
                const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string)
                await updateDoc(userRef, {
                   " contacts.friendRequests": userNewFriendRequestsArray
                })
            }
        }
        refreshUsersData()
        await message.success(`You've unfollowed from ${userFullname}'s updates!`)
    }, [user, myData])



    
    
    
    const deleteFriendRequest = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        await message.loading('Deleting the request...')

        const myNewFriendRequestsArray = myFriendRequests.filter(id => id !== userId)
        const myNewFollowersArray = [...new Set([...myFollowers, userId])]
        
        if (myId) {
            const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string)

            await updateDoc(myRef, {
                "contacts.friendRequests": myNewFriendRequestsArray,
                "contacts.followers": myNewFollowersArray,
            })
        }
        refreshUsersData()
        await message.success(`The request has been deleted! Now ${userFullname} is your follower`)
    }, [user, myData])
    
    



    const acceptFriendRequest = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        await message.loading('Accepting the request...')
        const time = Date.now()

        const userNewFollowingListArray = userFollowingList.filter(id => id !== myId)
        const myNewFriendRequestsArray = myFriendRequests.filter(id => id !== userId)
        
        const myNewFriend = {
            id: userId,
            time,
        }

        const userNewFriend = {
            id: myId,
            time,
        }
        const myNewFriendsArray = [...myFriends, myNewFriend]
        const userNewFriendsArray = [...userFriends, userNewFriend]


        if (myId && userId) {
            const myRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', myId as string) 
            const userRef:DocumentReference<DocumentData, DocumentData> = doc(db, 'users', userId as string) 
            
            await updateDoc(myRef, {
                "contacts.friends": myNewFriendsArray,
                "contacts.friendRequests": myNewFriendRequestsArray
            })
            await updateDoc(userRef, {
                "contacts.followingList": userNewFollowingListArray,
                "contacts.friends": userNewFriendsArray
            })
        }
        refreshUsersData()
        await message.success('Congrats! You and Anna are friends now!')
    }, [user, myData])


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
        unfollowFromUser,
        acceptFriendRequest,
        deleteFriendRequest,
        // deleteFollower
    }
}