import { FeedFriendship } from "types/Feed"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { Card, CardHeader, UserDataContainer, CardUserName, CardText, CardImage } from "./FeedCards.styled"
import FriendshipImage from '@images/friendship.svg'

interface FeedFriendshipCardProps {
    feedFriendshipItem:FeedFriendship
}

export const FeedFriendshipCard:React.FC<FeedFriendshipCardProps> = ({feedFriendshipItem}) => {
    const { user, friend } = feedFriendshipItem

    return (
        <Card>
            <CardHeader>
                <UserDataContainer>
                    <Avatar 
                        photo={user?.profileData?.userAvatar} 
                        border={`1px solid ${theme.colors.regularDark}`} 
                        size={"20px"}
                    />
                    <CardUserName>
                        {user?.personalData?.userFullname}
                    </CardUserName>
                </UserDataContainer>
                <CardText>
                    and
                </CardText>
                <CardUserName>
                    {friend.name}
                </CardUserName>
                <CardText>
                    recently became friends
                </CardText>
            </CardHeader>
            <CardImage src={FriendshipImage}/>
        </Card>
    )
}