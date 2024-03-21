import FriendshipImage from '@images/friendship.svg'
import { FeedFriendship } from "types/Feed"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { Card, CardHeader, UserDataContainer, CardUserName, CardText, CardImage } from "./FeedCards.styled"
import { useNavigateToUserPage } from 'hooks/contacts/useNavigateToUserPage'

interface FeedFriendshipCardProps {
    feedFriendshipItem:FeedFriendship,
}

export const FeedFriendshipCard:React.FC<FeedFriendshipCardProps> = ({feedFriendshipItem}) => {
    const { user, friend } = feedFriendshipItem
    const { goToUserPage } = useNavigateToUserPage(user)


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