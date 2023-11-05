import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/hooks";
import { theme } from "@styles/Theme";
import { PersonalInfo, Name, ActionsContainer, Card, Text } from './UserCard.styled'
import { UserFullData } from "types/UserFullDataType";
import { Avatar } from "@components/Avatar/Avatar";
import { fetchFriends, fetchSelectedUser } from "rdx/slices/friendsSlice";


interface UserCardProps {
    children: React.ReactNode,
    user: UserFullData,
}



export const UserCard:React.FC<UserCardProps> = ({children, user}) => {
    const { userLocation, userAvatar, userFullname, userBirthday, userId } = user;

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSaveUserData = useCallback(() => {
        dispatch(fetchSelectedUser(userId))
        dispatch(fetchFriends(user))
        navigate(`/users/${userFullname}/profile`)
    }, [dispatch, userId])

    
    return (
        <Card onClick={onSaveUserData}>
            <Avatar 
                photo={userAvatar} 
                border={theme.colors.regular} 
                size="70px"
            />
            <PersonalInfo>
                <Name>
                    {userFullname}
                </Name>
                <Text>
                    {`${userBirthday.age} y.o`}
                </Text>
                <Text>
                    {userLocation}
                </Text>
            </PersonalInfo>
            <ActionsContainer>
                {children}
            </ActionsContainer>
        </Card>
    )
}

