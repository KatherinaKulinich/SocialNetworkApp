import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "../hooks"
import { FaRegClock  } from 'react-icons/Fa'
import { RiUserUnfollowFill, RiUserAddFill, RiUserStarFill } from "react-icons/Ri"





export const useCheckUserStatus = () => {
    const [buttonText, setButtonText] = useState<string>('')
    const [buttonIcon, setButtonIcon] = useState<any>()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const [isFollower, setIsFollower] = useState(false)
    const [isRequest, setIsRequest] = useState(false)
    const [isFriend, setIsFriend] = useState(false)


    const user = useAppSelector(state => state.users.selectedUser)
    const { contacts: userContacts } = user ?? {}
    const { userId } = user?.personalData ?? {}
    
    const { 
        friends: userFriends, 
        followingList: userFollowingList, 
        friendRequests: userFriendRequests, 
        followers:userFollowers 
    } = userContacts ?? {};

    const myData = useAppSelector(state => state.userData.user)
    const { contacts: myContacts } = myData;
    const { userId:myId } = myData.personalData;
    const { 
        friends: myFriends, 
        followingList:myFollowingList, 
        friendRequests: myFriendRequests, 
        followers: myFollowers 
    } = myContacts ?? {};



    const isFriendshipWithUser = () => {
        let isFriend:boolean = false;
        userFriends.map(user => {
            if (user.id === myId) {
                return isFriend = true;
            }
        })
        myFriends.map(user => {
            if (user.id === userId) {
                return isFriend = true;
            }
        })
        return isFriend
    }




    const checkUser = useCallback(() => {
        setButtonText('')
        setIsFollower(false)
        setIsFriend(false)
        setIsRequest(false)
        setIsButtonDisabled(false)

        if (userFriends && myFriends) {
            if (isFriendshipWithUser()) {
                setButtonText('remove from friends')
                setButtonIcon(RiUserUnfollowFill)
                setIsFriend(true)
            } else if (myFollowingList.includes(userId)) {
                setIsButtonDisabled(true)

                if (userFriendRequests.includes(myId)) {
                    setButtonText("you've sent a request")
                    setButtonIcon(FaRegClock )
                    setIsRequest(true)
                    return
                }
                setButtonText("you follow user")
                setButtonIcon(RiUserStarFill)
                setIsFollower(true)
            } else if (userFollowingList.includes(myId)) {
                setIsButtonDisabled(true)

                if (myFriendRequests.includes(userId)) {
                    setButtonText("the user's sent a request")
                    setButtonIcon(FaRegClock )
                    setIsRequest(true)
                    return
                }
                setButtonText("the user follows you")
                setButtonIcon(RiUserStarFill)
                setIsFollower(true)
            } else {
                setButtonText("add to friends")
                setButtonIcon(RiUserAddFill)
                setIsFriend(false)
            }
        }
    }, [user, myData, isFriend, isFollower, isRequest])


    useEffect(() => {
        if (user && myData) {
            checkUser()
        }
    }, [user, myData])



    return {
        buttonText,
        isFriend,
        isFollower,
        isRequest, 
        buttonIcon, 
        isButtonDisabled
    }
}