import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { DocumentData, DocumentReference, doc, updateDoc } from "firebase/firestore"
import { db } from "firebase"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useUserData } from "./useUserData"
import { message } from "antd"
import { fetchUserFullData } from "rdx/slices/userDataSlice"




export const useFollowUser = () => {

    const { userId, friends:  userFriends} = useAppSelector(state => state.users.selectedUser)
    const { friends: myFriends} = useUserData()
    const dispatch = useAppDispatch()
    const { userId: myId } = useAuth()

    // useEffect(() => {
    //     if (myId !== null && myId !== undefined ) {
    //         dispatch(fetchUserFullData(myId))
    //     }
    // }, [])

    const [isFriend, setIsFriend] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [myRef, setMyRef] = useState<DocumentReference<DocumentData, DocumentData>>()
    const [userRef, setUserRef] = useState<DocumentReference<DocumentData, DocumentData>>()


    const getRef = useCallback(async () => {
        if (myId) {
            const ref = doc(db, 'users', myId)

            if (ref !== undefined) {
                await setMyRef(ref)
            }
        }
        if (userId) {
            const ref = doc(db, 'users', userId)

            if (ref !== undefined) {
                await setUserRef(ref)
            }
        }
    }, [userId, myId])

    useEffect(() => {
        getRef()
    }, [])



    //adding
    const addFriend = useCallback(
        async (ref:DocumentReference<DocumentData, DocumentData>, id:string, friendsArray:string[]) => {

        console.log(friendsArray);
        const newFriendsArray:string[] = [...friendsArray, id]
        console.log(newFriendsArray);
    
        await updateDoc(ref, {
            friends: newFriendsArray
        })
    },[])


    const addFriendToMe = useCallback(() => {
        if (myRef !== undefined && myFriends !== undefined) {
            console.log(userId)
            addFriend(myRef, userId, myFriends)
        }
    }, [myRef, userId, myFriends])


    const addMeToFriend = useCallback(() => {
        if (userRef !== undefined && userFriends !== undefined && myId !== null) {
            addFriend(userRef, myId, userFriends)
        }
    },[userRef, myId, userFriends])


    const becomeFriendsWithUser = useCallback(async () => {
 
        if (userRef && myRef) {
            await message.loading('Adding to friends...')
            await addFriendToMe()
            await addMeToFriend() 
            await message.success('Added!')
        }
        
    }, [myRef, userRef])


    //removing
    const removeFriend = useCallback(
        async (ref:DocumentReference<DocumentData, DocumentData>, id:string, friendsArray:string[]) => {

        const newFriendsArray = friendsArray.filter((friendId) => {
            return friendId !== id
        })

        await updateDoc(ref, {
            friends: newFriendsArray
        })
    }, [])


    const removeFriendFromMe = useCallback(() => {
        if (myRef !== undefined && myFriends !== undefined) {
            
            removeFriend(myRef, userId, myFriends)
        }
    }, [myRef, userId, myFriends])


    const removeMeFromFriend = useCallback(() => {
        if (userRef !== undefined && userFriends !== undefined && myId !== null) {
            removeFriend(userRef, myId, userFriends)
        }
    }, [userRef, myId, userFriends])


    const stopBeingFriendsWithUser = useCallback(async() => {
        if (userRef && myRef) {
            await message.loading('Removing from friends...')
            await removeFriendFromMe()
            await removeMeFromFriend()
            await message.success('Removed!')
        }
    }, [myRef, userRef])


    //checking user for friendship

    const checkUser = useCallback((friendId: string) => {
        if (myId) {
            if (myFriends?.includes(friendId) && userFriends?.includes(myId)) {
                setIsFriend(true)
                return
            }
            setIsFriend(false)
        }
    }, [myFriends, isFriend, userFriends, myId])


    useEffect(() => {
        checkUser(userId)
    }, [userId])






    //main 

    const onFriends = useCallback(async () => {

        if (myRef && userRef) {
            if (isFriend === true) {
                await stopBeingFriendsWithUser()
                await setIsFriend(false)

                return
            }
            await becomeFriendsWithUser()
            await setIsFriend(true)
        }

    

    }, [isFriend, myRef, userRef])





    return {
        isFriend,
        onFriends
    }
}