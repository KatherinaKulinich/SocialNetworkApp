import { CardContent, Flex, Text, UserCard, UserInfo, UserName } from "./SearchUserCard.styled"
import { MdDoubleArrow, MdOutlinePermContactCalendar, MdLocationOn } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { Avatar } from "@components/Avatar/Avatar";



interface SearchUserCardProps {
    link: string;
    userAvatar: string;
    userFullName: string;
    userAge: string;
    userLocation: string;
}

export const SearchUserCard:React.FC<SearchUserCardProps> = (
    {link, userAvatar, userFullName, userAge, userLocation}) => {

    return (
        <UserCard to={link}>
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
                </UserInfo>
            </CardContent>
            <Icon 
                icon={<MdDoubleArrow/>} 
                iconSize="40px" 
                iconColor={theme.colors.regular}
            /> 
            
        </UserCard>
    )
}