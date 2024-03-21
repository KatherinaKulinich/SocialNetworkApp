import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { theme } from "@styles/Theme";
import { PersonalInfo, Name, ActionsContainer, Card, Text } from './UserCard.styled'
import { Avatar } from "@components/Avatar/Avatar";
import { fetchFriends} from "rdx/slices/friendsSlice";
import { UserProfile } from "types/UserProfile";
import { getUserAge } from "utils/getUserAge";
import { useNavigateToUserPage } from "hooks/contacts/useNavigateToUserPage";


interface UserCardProps {
    children: React.ReactNode,
    user: UserProfile,
}



export const UserCard:React.FC<UserCardProps> = ({children, user}) => {
    const { goToUserPage } = useNavigateToUserPage(user)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const myData = useAppSelector(state => state.userData.user)
    const{ userId:myId } = myData?.personalData
    const { friends:myFriends} = myData?.contacts
    const myFriendsIds = myFriends.map(user => user.id)

    const { userFullname, userId } = user?.personalData;
    const { userLocation, userAvatar, userBirthday } = user?.profileData;
    const { year, month, day } = userBirthday
    const age = `${getUserAge(year, month, day)} y.o`;



    const onSaveUserData = useCallback(async () => {
        if (userId !== myId) {
            goToUserPage()
            return
        }
        await dispatch(fetchFriends(myFriendsIds, 'friends'))
        navigate(`/myProfile`)
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
                    {userFullname}
                </Name>
                <Text>
                    {age}
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

