import { FeedFriendship } from "types/Feed"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { Card, CardHeader, UserDataContainer, CardUserName, CardText, CardImage } from "./FeedCards.styled"
import FriendshipImage from '@images/friendship.svg'
import { useAppDispatch } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { fetchSelectedUserData } from "rdx/slices/usersSlice"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { message } from "antd"

interface FeedFriendshipCardProps {
    feedFriendshipItem:FeedFriendship,
}

export const FeedFriendshipCard:React.FC<FeedFriendshipCardProps> = ({feedFriendshipItem}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const { user, friend } = feedFriendshipItem
    const { userId, userFullname } = user.personalData
    const { friends } = user.contacts
    const ids = friends?.map(user => user.id) || []

    const goToUserPage = useCallback(() => {
        message.loading('Loading the page...', 1)
        dispatch(fetchSelectedUserData(userId))
        dispatch(fetchFriends(ids, 'friends'))
        setTimeout(navigate, 1000, `/users/${userFullname}/profile`)
    }, [dispatch, navigate])

    

    return (
        <Card>
            <CardHeader>
                <UserDataContainer onClick={goToUserPage}>
                    <Avatar 
                        photo={user?.profileData?.userAvatar} 
                        border={theme.colors.regularDark} 
                        size={'25px'}
                    />
                    <CardUserName>
                        {user?.personalData?.userFullname}
                    </CardUserName>
                </UserDataContainer>
                <CardText>
                    and
                </CardText>
                <UserDataContainer>
                    <Avatar 
                        photo={friend?.avatar} 
                        border={theme.colors.regularDark} 
                        size={'25px'}
                    />
                    <CardUserName>
                        {friend.name}
                    </CardUserName>
                </UserDataContainer>
                <CardText>
                    recently became friends
                </CardText>
            </CardHeader>
            <CardImage src={FriendshipImage}/>
        </Card>
    )
}