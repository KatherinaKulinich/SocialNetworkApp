import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { theme } from "@styles/Theme";
import { PersonalInfo, Name, ActionsContainer, Card, Text } from './UserCard.styled'
import { UserFullData } from "types/UserFullDataType";
import { Avatar } from "@components/Avatar/Avatar";
import { fetchFriends} from "rdx/slices/friendsSlice";
// import { useUserData } from "hooks/useUserData";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";


interface UserCardProps {
    children: React.ReactNode,
    user: UserFullData,
}



export const UserCard:React.FC<UserCardProps> = ({children, user}) => {
    const { userLocation, userAvatar, userFullname, userBirthday, userId } = user;
    const userData = useAppSelector(state => state.userData.user)
    const{userId:myId} = userData

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSaveUserData = useCallback(() => {
        dispatch(fetchSelectedUserData(userId))
        dispatch(fetchFriends(user))

        if (userId !== myId) {
            navigate(`/users/${userFullname}/profile`)
            return
        }
        navigate(`/myProfile`)
    }, [dispatch, userId, user])

    
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

