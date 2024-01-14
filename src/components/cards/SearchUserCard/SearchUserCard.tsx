import { CardContent, Flex, Text, UserCard, UserInfo, UserName } from "./SearchUserCard.styled"
import { MdDoubleArrow, MdOutlinePermContactCalendar, MdLocationOn } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { Avatar } from "@components/Avatar/Avatar";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useCallback } from "react";
import { fetchSelectedUserData } from "rdx/slices/usersSlice";
import { UserProfile } from "types/UserProfile";
import { getUserAge } from "utils/getUserAge";
import { fetchFriends, getFriendsData } from "rdx/slices/friendsSlice";
import { useNavigate } from "react-router-dom";



interface SearchUserCardProps {
    user: UserProfile,
}



export const SearchUserCard:React.FC<SearchUserCardProps> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userFullname, userId } = user?.personalData || {}
    const { userAvatar, userBirthday, userLocation, userInterests } = user?.profileData ?? {}
    const { friends } = user.contacts ?? {}
    const friendsIdsArray = friends?.map(user => user.id) || []
    const friendsData = useAppSelector(state => state.friends.friendsData)

    const getUserProfile = useCallback(async () => {
        if (userId && friends) {
            await dispatch(fetchSelectedUserData(userId))
            await dispatch(fetchFriends(friendsIdsArray, 'friends'))
            navigate(`/users/${userFullname}/profile`)
        }
    }, [dispatch, userId, friends, friendsData])

    
    return (
        <UserCard onClick={getUserProfile}>
            <CardContent>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size="50px"
                />
                <UserInfo>
                    <UserName>
                        {userFullname}
                    </UserName>
                    <Flex>
                        <Icon 
                            icon={<MdOutlinePermContactCalendar/>} 
                            iconSize="15px" 
                            iconColor={theme.colors.mediumGray}
                        /> 
                        <Text>
                            {`${getUserAge(userBirthday?.year, userBirthday?.month, userBirthday?.day)} y.o.`}
                        </Text>
                    </Flex>
                    <Flex>
                        <Icon 
                            icon={<MdLocationOn/>} 
                            iconSize="15px" 
                            iconColor={theme.colors.mediumGray}
                        /> 
                        <Text>
                            {userLocation}
                        </Text>
                    </Flex>
                    <Text>
                        {userInterests.join(', ')}
                    </Text>
                </UserInfo>
            </CardContent>
            <Icon 
                icon={<MdDoubleArrow/>} 
                iconSize="50px" 
                iconColor={theme.colors.regular}
            /> 
            
        </UserCard>
    )
}