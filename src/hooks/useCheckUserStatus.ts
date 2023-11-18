import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "./hooks"
import { FaRegClock  } from 'react-icons/Fa'
import { IconType } from "react-icons"
import { RiUserUnfollowFill, RiUserAddFill, RiUserStarFill } from "react-icons/Ri"


export const useCheckUserStatus = () => {
    const user = useAppSelector(state => state.users.selectedUser)
    const {friends: userFriends, followingList: userFollowingList, friendRequests: userFriendRequests, userId} = user;

    const myData = useAppSelector(state => state.userData.user)
    const {friends: myFriends, followingList:myFollowingList, friendRequests: myFriendRequests, userId: myId} = myData;


    const [buttonText, setButtonText] = useState<string>('')
    const [buttonIcon, setButtonIcon] = useState<React.ReactNode>()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const [isFollower, setIsFollower] = useState(false)
    const [isRequest, setIsRequest] = useState(false)
    const [isFriend, setIsFriend] = useState(false)




    const checkUser = useCallback(() => {
        setButtonText('')
        setIsFollower(false)
        setIsFriend(false)
        setIsRequest(false)
        setIsButtonDisabled(false)

        
        if (userFriends && myFriends) {
            if (userFriends.includes(myId) && myFriends.includes(userId)) {
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