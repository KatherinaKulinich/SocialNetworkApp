import { Avatar } from "@components/Avatar/Avatar";
import { theme } from "@styles/Theme";
import { ActionLink, ActionsContainer,Card, Name, PersonalInfo, Text } from "./FriendCard.styled";

interface FriendCardProps {
    photo: string;
    fullName: string;
    age: number;
    location: string;
}

export const FriendCard:React.FC<FriendCardProps> = (
    {photo, fullName, age, location}) => {

    return (
        <Card>
            <Avatar 
                photo={photo} 
                border={theme.colors.regular} 
                size="70px"
            />
            <PersonalInfo>
                <Name>
                    {fullName}
                </Name>
                <Text>
                    {`${age} y.o`}
                </Text>
                <Text>
                    {location}
                </Text>
            </PersonalInfo>
            <ActionsContainer>
                <ActionLink to={'/myChats/chat'}>
                    Chat
                </ActionLink>
                <ActionLink to={'/myFriends/profile'}>
                    Profile
                </ActionLink>
            </ActionsContainer>
        </Card>
    )
}