import { Avatar } from "@components/Avatar/Avatar";
import { theme } from "@styles/Theme";
import { ActionLink, ActionsContainer,Card, Name, PersonalInfo, Text } from "./FriendCard.styled";
import { UserFullData } from "types/UserFullDataType";
import { useAppDispatch } from "hooks/hooks";
import { getSelectedUserData } from "rdx/slices/usersSlice";
import { useCallback } from "react";

interface FriendCardProps {
    user: UserFullData,
}

export const FriendCard:React.FC<FriendCardProps> = ({user}) => {
    const { userLocation, userAvatar, fullname, userBirthday } = user;

    const dispatch = useAppDispatch()

    const onSaveUserData = useCallback(() => {
        dispatch(getSelectedUserData(user))
        console.log(user);
        
    }, [dispatch])

    return (
        <Card>
            <Avatar 
                photo={userAvatar} 
                border={theme.colors.regular} 
                size="70px"
            />
            <PersonalInfo>
                <Name>
                    {fullname}
                </Name>
                <Text>
                    {`${userBirthday.age} y.o`}
                </Text>
                <Text>
                    {userLocation}
                </Text>
            </PersonalInfo>
            <ActionsContainer>
                <ActionLink to={`/myChats/${fullname}/chat`}>
                    Chat
                </ActionLink>
                <ActionLink 
                    to={`/myFriends/${fullname}/profile`} 
                    onClick={onSaveUserData}
                >
                    Profile
                </ActionLink>
            </ActionsContainer>
        </Card>
    )
}