import { CardContent, Flex, Text, UserCard, UserInfo, UserName } from "./SearchUserCard.styled"
import { MdDoubleArrow, MdOutlinePermContactCalendar, MdLocationOn } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { Avatar } from "@components/Avatar/Avatar";
import { getSelectedUserData, fetchSelectedUserData } from "rdx/slices/usersSlice";
import { useAppDispatch } from "hooks/hooks";
import { useCallback } from "react";
import { UserFullData } from "types/UserFullDataType";



interface SearchUserCardProps {
    user: UserFullData,
}

export const SearchUserCard:React.FC<SearchUserCardProps> = ({user}) => {
    const { userAvatar, fullname, userBirthday, userLocation, userInterests } = user;

    const dispatch = useAppDispatch();
    
    const getUserProfile = useCallback(() => {
        dispatch(getSelectedUserData(user))
    }, [dispatch])

    
    return (
        <UserCard 
            to={`/users/${fullname}/profile`} 
            onClick={getUserProfile}
        >
            <CardContent>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size="50px"
                />
                <UserInfo>
                    <UserName>
                        {fullname}
                    </UserName>
                    <Flex>
                        <Icon 
                            icon={<MdOutlinePermContactCalendar/>} 
                            iconSize="15px" 
                            iconColor={theme.colors.mediumGray}
                        /> 
                        <Text>
                            {userBirthday.age} y.o.
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