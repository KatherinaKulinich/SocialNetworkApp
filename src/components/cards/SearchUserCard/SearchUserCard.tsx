import { CardContent, Flex, Text, UserCard, UserInfo, UserName } from "./SearchUserCard.styled"
import { MdDoubleArrow, MdOutlinePermContactCalendar, MdLocationOn } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { Avatar } from "@components/Avatar/Avatar";
import { getSelectedUserData, fetchSelectedUserData } from "rdx/slices/usersSlice";
import { useAppDispatch } from "hooks/hooks";
import { useCallback } from "react";



interface SearchUserCardProps {
    userId: string;
    link: string;
    userAvatar: string;
    userFullName: string;
    userAge: number;
    userLocation: string;
    userInterests: string[];
}

export const SearchUserCard:React.FC<SearchUserCardProps> = (
    {link, userAvatar, userFullName, userAge, userLocation, userInterests, userId}) => {

    const dispatch = useAppDispatch();
    
    const getUserProfile = useCallback(() => {
        dispatch(fetchSelectedUserData(userId))
    }, [userId])

    
    return (
        <UserCard to={link} onClick={getUserProfile}>
            <CardContent>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size="50px"
                />
                <UserInfo>
                    <UserName>
                        {userFullName}
                    </UserName>
                    <Flex>
                        <Icon 
                            icon={<MdOutlinePermContactCalendar/>} 
                            iconSize="15px" 
                            iconColor={theme.colors.mediumGray}
                        /> 
                        <Text>
                            {userAge} y.o.
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