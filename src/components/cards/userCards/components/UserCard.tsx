
import { useAppDispatch } from "hooks/hooks";
import { getSelectedUserData } from "rdx/slices/usersSlice";
import { useCallback } from "react";
import { PersonalInfo, Name, ActionsContainer, Card, Text } from './UserCard.styled'
import { UserFullData } from "types/UserFullDataType";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@components/Avatar/Avatar";
import { theme } from "@styles/Theme";


interface UserCardProps {
    children: React.ReactNode,
    user: UserFullData,
    path: 'myFriends' | 'users'
}



export const UserCard:React.FC<UserCardProps> = ({children, user, path}) => {
    const { userLocation, userAvatar, fullname, userBirthday } = user;

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSaveUserData = useCallback(() => {
        dispatch(getSelectedUserData(user))
        navigate(`${path}/${fullname}/profile`)
    }, [dispatch])

    
    return (
        <Card onClick={onSaveUserData}>
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
                {children}
            </ActionsContainer>
        </Card>
    )
}

